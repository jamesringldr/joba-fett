# JobHuntr Roadmap

Forward-looking initiatives. Each item below is sized to a discrete kickoff: schema deltas, where code lands, and the open questions to resolve before building.

---

## 1. Score-This-Job + Gmail Tracker

Two related capabilities that hang off the existing job pipeline: an LLM-assigned fit score that ranks queued/working jobs against the master profile, and a Gmail-driven status auto-progression loop.

### 1a. Score-This-Job skill

**Goal:** After `job-recon` populates a job's structured fields, produce a 0–100 fit score + 2-line rationale, persisted to the DB and surfaced as a badge on every job card and detail view.

**Pattern reference:** Mirror the existing `salary-research` subagent flow — same shape (skill calls a fresh subagent, subagent reads context + writes a single structured result back to the DB), different prompt.

**Backend schema (new migration):**

```sql
-- backend/migrations/{{date}}_add_job_fit_score.sql
ALTER TABLE jobs
  ADD COLUMN fit_score        smallint,           -- 0..100, null = not yet scored
  ADD COLUMN fit_rationale    text,                -- 2–3 sentence model rationale
  ADD COLUMN fit_scored_at    timestamptz,
  ADD COLUMN fit_model        text;                -- e.g. "claude-opus-4-7"
```

Add a check constraint `fit_score BETWEEN 0 AND 100`.

**Skill to create:** `~/.claude/skills/score-this-job/` (or wherever `job-recon` lives). Inputs: `JOBHUNTER_JOB_ID` env var. Reads the job's structured fields + `master_profile.md`, invokes a `job-scorer` subagent, writes score + rationale back via the same DB helper `job-recon` uses.

**Subagent to create:** `job-scorer` — fresh context, no workspace, returns a single JSON `{score, rationale, weights}` payload. Scoring rubric (initial cut, tune later):
- 35 pts — required skills coverage vs master profile
- 25 pts — domain/industry fit
- 15 pts — seniority alignment
- 15 pts — work mode + location compatibility
- 10 pts — comp band vs target

**Frontend (badge):**
- Component: new `<FitScoreBadge score={n} />` in `frontend/src/components/` (color-graded: red <50, amber 50–74, green ≥75; grey "—" when null).
- Render sites: job list rows, job detail header, dashboard "queued" widget.
- Hover/click → popover showing `fit_rationale`.

**Open questions to resolve at kickoff:**
1. Persona-aware scoring? Workflow.md describes multiple personas (PM, COO, Web Dev, etc.) — does the score key off the persona tagged on the job, or always against the consolidated master profile?
2. Re-score trigger: on every `job-recon` rerun? Manual button? Both?
3. Do we want the weights stored per-job (auditability) or just the final score?

### 1b. Gmail tracker

**Goal:** Poll the Gmail account tied to each application, detect inbound replies from the company, classify them (interview / reject / offer / follow-up / noise), and **suggest** (not auto-apply) a stage transition.

**Backend additions:**
- New module `backend/app/gmail_tracker.py` — OAuth via `google-auth-oauthlib`, incremental polling using `historyId` watermark per account.
- New table:

```sql
-- backend/migrations/{{date}}_add_gmail_tracking.sql
CREATE TABLE gmail_events (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id          uuid REFERENCES jobs(id) ON DELETE CASCADE,
  company_id      uuid REFERENCES companies(id),
  gmail_msg_id    text NOT NULL UNIQUE,
  thread_id       text,
  from_addr       text,
  subject         text,
  received_at     timestamptz,
  classification  text,        -- 'interview' | 'reject' | 'offer' | 'followup' | 'noise'
  confidence      numeric(3,2),
  suggested_stage text,        -- maps to existing stage enum
  applied         boolean DEFAULT false,
  raw_snippet     text,
  created_at      timestamptz DEFAULT now()
);

CREATE INDEX ON gmail_events (job_id, received_at DESC);
```

- Add `gmail_account_email`, `gmail_refresh_token_enc`, `gmail_history_id` columns on a `gmail_accounts` table (or extend a `settings` table — TBD at kickoff).

**Matching logic (in order):**
1. Reply-to / thread of an email we previously sent for this job (highest confidence).
2. Sender domain → company canonical domain.
3. Subject/body LLM classification with the company name as anchor.

**Frontend:**
- New "Inbox signals" panel on the job detail view: chronological list of `gmail_events` for that job with the suggested transition + accept/dismiss buttons.
- Dashboard notification badge on jobs with unreviewed events.

**Open questions:**
1. Single Gmail account or per-job aliases (Workflow.md mentions "company based tagged email address")? Aliases give clean signal — worth designing around from day one.
2. Auto-apply confidence threshold, if any (e.g. >0.95 + explicit reject keyword → auto-move)? Default to manual-only for v1.
3. Polling cadence + where it runs — VPS systemd unit alongside the existing one, or Supabase edge function cron?

---

## 2. JobSpy Replication — Self-Healing Multi-Board Ingest

**Goal:** Stand up our own Python ingest layer that scrapes LinkedIn, Indeed, Glassdoor, ZipRecruiter, and Google Jobs into the `jobs` table — using [`python-jobspy`](https://github.com/Bunsly/JobSpy) as a *reference implementation* but reimplementing with a self-healing API as the core design goal. We do **not** vendor jobspy; we read it, take what's useful, and write our own.

**Why reimplement instead of `pip install`:** jobspy ships 30+ releases a year chasing breakage. We need a layer that survives that churn without manual patching.

### Architecture

```
backend/app/ingest/
  jobspy_clone/
    __init__.py
    base.py                # BoardExtractor ABC + selector schema
    selectors/
      linkedin.yaml        # CSS/XPath/JSON-path selectors as data, not code
      indeed.yaml
      glassdoor.yaml
      ziprecruiter.yaml
      google.yaml
    extractors/
      linkedin.py          # thin wrapper that loads linkedin.yaml + per-board quirks
      ...
    healer.py              # the self-healing layer (see below)
    runner.py              # orchestrator: parallel board fan-out, dedupe, persist
    models.py              # canonical JobPosting dataclass → maps to jobs table
```

### Self-healing API — the actual design goal

The brittle part of scraping is selectors changing. Healer responsibilities:

1. **Health probe per board.** Each extractor exposes a `probe()` that runs against a known-stable query ("software engineer", "remote") and asserts: ≥1 result, parsed title non-empty, parsed company non-empty, parsed apply-URL valid. Probes run on a cron and write to `ingest_health(board, status, latency_ms, sample_payload, checked_at)`.

2. **Selector versioning.** Each `*.yaml` carries `version`, `last_validated_at`, and **multiple candidate selectors per field** (primary + fallbacks). The extractor tries primary first; on miss, walks the fallback list. Successful fallback writes a `ingest_selector_drift` row so we know which to promote.

3. **Auto-repair attempt.** When probe fails AND all fallbacks fail, the healer:
   - Fetches the raw page,
   - Sends `{html_excerpt, expected_fields, last_known_payload}` to a subagent (`selector-repair`),
   - Receives a candidate set of new selectors,
   - Writes them as `version: N+1` in the YAML with `status: candidate`,
   - Reruns the probe; if it passes for 3 consecutive runs, the candidate is promoted.

4. **Circuit breaker.** A board that fails N probes in a row is auto-disabled (`enabled: false`) and a notification fires (Telegram). The UI shows a board-health strip on the dashboard.

5. **Rate-limit + proxy hooks.** `base.py` exposes a pluggable transport so we can swap raw requests → residential proxy → stealth browser per board without touching extractor code. LinkedIn will need this eventually; Indeed/Glassdoor too.

### Schema deltas

```sql
-- backend/migrations/{{date}}_add_ingest_layer.sql
CREATE TABLE ingest_boards (
  id            text PRIMARY KEY,        -- 'linkedin', 'indeed', ...
  display_name  text NOT NULL,
  enabled       boolean DEFAULT true,
  notes         text
);

CREATE TABLE ingest_health (
  id            bigserial PRIMARY KEY,
  board_id      text REFERENCES ingest_boards(id),
  status        text,                    -- 'ok' | 'degraded' | 'failed' | 'healed'
  latency_ms    integer,
  results_count integer,
  error         text,
  checked_at    timestamptz DEFAULT now()
);

CREATE TABLE ingest_selector_drift (
  id            bigserial PRIMARY KEY,
  board_id      text,
  field         text,                    -- 'title', 'company', etc.
  selector_used text,
  selector_version integer,
  observed_at   timestamptz DEFAULT now()
);

ALTER TABLE jobs
  ADD COLUMN source_board   text,        -- 'linkedin' | 'indeed' | ... | 'manual'
  ADD COLUMN source_query   text,        -- the search query that surfaced it
  ADD COLUMN dedupe_hash    text;        -- normalized (company, title, location)

CREATE UNIQUE INDEX jobs_dedupe ON jobs(dedupe_hash) WHERE dedupe_hash IS NOT NULL;
```

### Frontend

- Dashboard widget: per-board health pills (green/amber/red + last probe time).
- New "Discovery" view: paginated table of newly-ingested jobs awaiting triage to `queued`.
- Filter on `source_board` + `source_query` so we can evaluate which search profiles are productive.

### Kickoff steps (in order)

1. Read jobspy source, especially `linkedin.py`, `indeed.py`, `glassdoor.py`. Document the request shapes + parse points in `backend/app/ingest/jobspy_clone/NOTES.md`. **Do not copy code** — license is MIT but cleaner to reimplement from notes.
2. Implement `base.py`, `models.py`, and the `JobPosting → jobs` table mapper.
3. Build LinkedIn extractor first (highest-value, hardest — proves the architecture).
4. Implement `healer.py` probe + circuit breaker before adding more boards.
5. Add Indeed, then the rest.
6. Wire the `selector-repair` subagent last.

### Open questions

1. Where does the runner live — VPS systemd timer (consistent with existing infra) or Supabase edge cron?
2. Search profiles: persona-driven (one search bundle per persona) or a single global config with per-search persona tagging on results?
3. Do we want a manual "kill this board for 24h" override in the UI?
4. Compliance: are we OK with LinkedIn's ToS posture for personal use? Worth a written stance in the README before this ships.

---

## 3. Agency Tracker

**Goal:** A first-class concept for **headhunters / recruiting agencies** — tracked separately from companies, with their own contacts, the roles they're representing, and the jobs sourced from them. An agency is a *pipeline source*, not an employer.

### Conceptual model

- **Agency** ≠ **Company**. An agency represents *many* companies, often with the end-employer hidden until late in the process.
- A **Recruiter** is a person at an agency (or sometimes an internal company recruiter — handle both).
- A **Job** can be sourced from an agency *and* have an (eventually-revealed) end company.

### Schema

```sql
-- backend/migrations/{{date}}_add_agency_tracker.sql
CREATE TABLE agencies (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text NOT NULL,
  website         text,
  specialties     text[],              -- e.g. {'fintech','executive','contract'}
  relationship    text,                -- 'warm' | 'cold' | 'introduced' | 'inbound'
  notes           text,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

CREATE TABLE recruiters (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id       uuid REFERENCES agencies(id) ON DELETE SET NULL,  -- null = internal
  company_id      uuid REFERENCES companies(id),                    -- null unless internal
  full_name       text NOT NULL,
  title           text,
  email           text,
  phone           text,
  linkedin_url    text,
  last_contact_at timestamptz,
  next_followup_at timestamptz,
  notes           text,
  created_at      timestamptz DEFAULT now()
);

CREATE TABLE agency_outreach (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_id    uuid REFERENCES recruiters(id) ON DELETE CASCADE,
  direction       text NOT NULL,       -- 'outbound' | 'inbound'
  channel         text,                -- 'email' | 'linkedin' | 'phone' | 'other'
  subject         text,
  body            text,
  occurred_at     timestamptz DEFAULT now(),
  followup_due_at timestamptz
);

ALTER TABLE jobs
  ADD COLUMN agency_id       uuid REFERENCES agencies(id),
  ADD COLUMN recruiter_id    uuid REFERENCES recruiters(id),
  ADD COLUMN is_blind        boolean DEFAULT false;  -- end employer not yet disclosed
```

### Vault layout (mirrors existing company vault pattern)

```
docs/obsidian/JobHuntr/Applications/Agencies/
  {{agency_folder_name}}/
    Agency.md                    # hub
    Recruiters/
      {{recruiter_name}}.md
    Outreach Log.md
    Jobs/                        # symlink-style index back to job folders
```

`Agency.md` should follow the same hub pattern as `Company.md` so the Obsidian graph view shows agency ↔ recruiters ↔ jobs ↔ companies cleanly.

### Frontend

- New top-level "Agencies" view alongside Companies and Jobs.
- Agency detail page:
  - Header: name, specialties, relationship, last contact.
  - Tabs: Recruiters / Jobs / Outreach Log.
- Recruiter detail page with outreach timeline + "log outreach" form + "set follow-up" reminder.
- On the existing **job detail** view: when `agency_id` is set, show an "Sourced via" card linking to the agency + recruiter. If `is_blind=true`, show a "blind submission" indicator.
- Dashboard: "Recruiters to follow up with" widget (recruiters where `next_followup_at <= now()` and no outreach in N days).

### Workflow hooks

- New skill `agency-outreach-draft` — given a recruiter row + a target persona, produces a tailored cold/warm outreach message. Uses master profile + persona config.
- The Gmail tracker (Initiative 1b) should learn to attribute inbound emails to a `recruiter_id` when the sender matches — collapses agency comms into the same inbox-signals view.
- `gap-analysis` should branch slightly when `is_blind=true`: no company intelligence brief possible until the company is revealed; instead, lean harder on the JD itself.

### Open questions

1. Should an agency-sourced job always create a placeholder company row, or only once the end employer is revealed?
2. Do we want recruiter "trust score" / "quality" over time (jobs surfaced, conversion to interview, ghosting frequency)? Probably yes, but defer to v2.
3. CRM-style reminders — built in-app, or push to a calendar via the existing Google Calendar MCP?

---

## Sequencing recommendation

1. **Score-this-job** first — small surface area, immediate value, validates the "subagent writes structured data back" pattern beyond `salary-research`.
2. **Agency tracker** schema + minimal CRUD next — unblocks logging the recruiter relationships you already have, no scraping risk.
3. **Gmail tracker** — depends on stable schema and gives both jobs and agency outreach an inbox loop.
4. **JobSpy clone** last — highest engineering effort, highest maintenance burden; everything above makes more of its output usable.
