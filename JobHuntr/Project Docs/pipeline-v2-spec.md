> **What this is:** The sharpened Joba-Fett pipeline spec — the machine around the resume engine. Defines every lane, stage, gate, and contract Cursor builds from. · **Created:** 2026-09-23 · **Status:** draft for review

# Joba-Fett Pipeline v2 Spec

## 0. What v2 is

The v1 engine works: the 7-step resume tailor sequence (`prompt-library/tailor-resume-seq/`, driven by `RUN.md`) with the HR-Critic gate produces strong resumes. v2 does not rewrite that engine. v2 builds the **machine around it**: discovery, queueing, per-job configuration, the scout/direct fork, bundling, applying, follow-up, and the parallel recruiter lane — with explicit agent/bot/skill contracts and human gates at every irreversible step.

**Source of truth for the flow:** James's whiteboard (2026-09-23) + the agents/bots/skills list + the Q&A that followed. Where this spec and the whiteboard disagree, this spec wins — it incorporates the clarifications.

## 1. Architecture: Agents vs Bots vs Skills

Three distinct execution classes. Do not blur them.

| Class | Role | Runs | Examples |
|---|---|---|---|
| **Agents** | Build and review artifacts. In-session, high-context, produce files. | On demand, in the build thread (Cursor / Claude Code) | JD Dissector, ATS Auditor, Huminizor/Anti-AI, HR Simulator, Resume Builder, Cover Letter Creator, LinkedIn Auditor, Outreach Critic |
| **Bots** | Autonomous external work. Scheduled or triggered, narrow scope, retryable. | Unattended (cron / queue workers) | Rover, Connection Scout, Applier, Account Forge, Recruiter Recruit |
| **Skills** | Human sign-off checkpoints. Nothing irreversible happens without one. | James approves in chat / UI | Resume Sign off, Cover Letter Sign Off, Outreach Sign Off, Apply Sign Off |

Rules:
- A bot never sends anything to a human (email, message, application) without the relevant skill's sign-off having been recorded.
- An agent never carries state between gate loops. Every HR Simulator pass and every Outreach Critic pass is a **fresh, net-new review** — no prior critiques, no fix rationale, no session memory. (This is already the RUN.md §3 contract; v2 extends it to outreach.)
- Bots are idempotent and retryable: re-running a bot on the same job record must not duplicate work (dedupe keys in §6).

## 2. The flow

```
┌─ DISCOVERY (Rover, scheduled) ─────────────────────────────────────┐
│ Sweeps: LinkedIn, Indeed, ZipRecruiter, A16z, VC job boards,       │
│ Target Companies list, Newly Funded → writes INTERNAL JOB BOARD    │
└──────────────────────────────┬─────────────────────────────────────┘
                               │ James hand-selects
┌─ JOB QUEUE ──────────────────▼─────────────────────────────────────┐
│ Each entry carries per-job config:                                 │
│   aggression  1|2|3  (1=Direct only · 2=+Scout existing conns ·     │
│                       3=+connect new people, max follow-ups)        │
│   industry    free text                                            │
│   persona     executive | manager | builder                         │
│   personal_connections  [{name, link, relationship}]                │
└──────────────────────────────┬─────────────────────────────────────┘
                    ┌──────────┴──────────┐
                    ▼                     ▼
            ┌─ SCOUT PATH ─┐      ┌─ DIRECT PATH ────────┐
            │ (aggr ≥ 2)   │      │ (always)             │
            │              │      │                      │
            │ Connection   │      │ Resume Build loop:   │
            │ Scout → find │      │ tailor → ATS →       │
            │ connections/ │      │ humanize → HR Sim    │
            │ people to    │      │ (company-side review,│
            │ connect with │      │ fresh each pass,     │
            │ → outreach   │      │ loop till pass,      │
            │ message →    │      │ cap 3 → escalate)    │
            │ Outreach     │      │ → Resume Sign off    │
            │ Critic →     │      │                      │
            │ Outreach     │      └──────────┬───────────┘
            │ Sign Off     │                 │
            └──────┬───────┘                 ▼
                   │              ┌─ COVER LETTER ───────┐
                   │              │ Creator → Cover      │
                   │              │ Letter Sign Off      │
                   │              └──────────┬───────────┘
                   └──────────┐   ┌──────────┘
                              ▼   ▼
                    ┌─ BUNDLE ──────────────────────────┐
                    │ resume + cover letter + any       │
                    │ connection messages               │
                    └──────────────┬────────────────────┘
                                   ▼
                    ┌─ APPLIER ─────────────────────────┐
                    │ Apply Sign Off (James) → applies  │
                    │ via his email → Account Forge     │
                    │ creates accounts where required   │
                    │ → APPLIED MESSAGE (log)           │
                    └──────────────┬────────────────────┘
                                   ▼
                    ┌─ FOLLOW UP ───────────────────────┐
                    │ time-based (per aggression) +     │
                    │ Gmail-reply-driven (roadmap 1b)   │
                    │ → draft nudge → sign off → send   │
                    └───────────────────────────────────┘

┌─ LANE 2: RECRUITER RECRUIT (parallel, not job-specific) ────────────┐
│ Bot finds recruiters / headhunting agencies / hiring managers →    │
│ intro outreach ("get on their radar") → sign off → send →          │
│ follow-up loop. Warm intros that surface roles → new Job Queue     │
│ entries tagged source=recruiter, aggression=3.                     │
└────────────────────────────────────────────────────────────────────┘

┌─ SATELLITE: LINKEDIN AUDITOR (deferred) ───────────────────────────┐
│ One-time profile audit AFTER full background + personas are       │
│ finalized. Audit report → James applies changes manually.         │
│ Editor bot deferred to a later round.                             │
└────────────────────────────────────────────────────────────────────┘
```

Notes:
- The Scout path is skipped at aggression 1. At aggression 2 it messages only existing/personal connections. At aggression 3 it also connects with new people and runs the full follow-up cadence.
- Cover letter is built on **both** paths, always **after** the resume passes the HR Simulator gate (the resume is the bundle's anchor artifact).
- The Direct path's resume loop reuses `prompt-library/tailor-resume-seq/` and `RUN.md` **without modification**. v2 orchestrates; it does not rewrite prompts.

## 3. Stage contracts

### 3.1 Discovery (Rover)

- **Input:** board configs (search queries per persona, target-company list, newly-funded feed).
- **Output:** one record per discovered role on the internal board, `status=new`.
- **Dedupe:** `dedupe_hash = normalize(company + title + location)`; never re-add a hash already on the board, in the queue, or in Applications/.
- **Cadence:** scheduled (daily to start); manual trigger always available.
- **v1 scope:** Rover may be semi-manual (assisted sweep, human-confirmed writes). Self-healing selector layer is roadmap §2 — not v2.

### 3.2 Internal board → Job Queue (human selection)

- James reviews `status=new` records, marks `queued` or `dismissed`.
- Queuing creates the job workspace under `Applications/Companies/…` (existing pattern) **and** the job record (§6) with its per-job config.
- `dismissed` records stay on the board (never re-surfaced); auto-dismiss `new` records older than 30 days.

### 3.3 Scout path

1. **Connection Scout** (bot): for the target company, returns (a) existing 1st-degree connections, (b) 2nd-degree / people to connect with, ranked by relevance to the hiring loop. Writes `agent_outputs/Connection Scout.md`.
2. **Outreach message** (agent, Resume Builder's sibling): drafts a short intro/referral ask per connection, in the candidate-persona voice. At aggression 2, existing connections only; at aggression 3, includes connection requests to new people.
3. **Outreach Critic** (agent, isolated, fresh context): cold-reads the message for tone, clarity of ask, and desperation signals. Advisory only — writes `agent_outputs/Outreach Critique.md`.
4. **Outreach Sign Off** (skill): James approves per message (or batch-approves at aggression 3 with per-message veto).
5. Sending is a bot action post-sign-off. Replies feed the follow-up engine.

### 3.4 Direct path (resume loop)

Unchanged from v1: `00-bootstrap` → `01` job-intel → `02` gap → `03` rewrite → `04` ATS → `05` HR Simulator gate → `06` humanize → `07` final. Then:

6. **Resume Sign off** (skill): James approves the final resume. Rejection returns to step `03` with his notes — not to the HR Simulator (the simulator already passed; this is taste, not screening).

### 3.5 Cover letter

- **Cover Letter Creator** (agent): built from the *passed* resume + JD + candidate persona. One page, no resume repetition.
- **Cover Letter Sign Off** (skill): James approves. Rejection → revise with notes.

### 3.6 Bundle

Assembly step (script, not agent): collects the signed resume, signed cover letter, and any signed connection messages into `final_files/` + a `bundle.json` manifest (what was sent, when, to whom, sign-off IDs). The bundle is the unit the Applier submits.

### 3.7 Applier + Account Forge

1. **Apply Sign Off** (skill): James approves the bundle for submission. This is the last human checkpoint.
2. **Applier** (bot): submits via James's email per the posting's mechanism. Logs every attempt to the applied log.
3. **Account Forge** (bot, orchestrated by Applier): where the posting requires an account (Workday, Greenhouse, Lever, iCIMS…), creates it and completes the application. Credentials go to the vault; never into the repo or logs. Separate bot so account creation and application submission retry independently.
4. **Applied Message**: the canonical "this application is submitted" record (§6). Both paths converge here.

### 3.8 Follow up

Two triggers, one engine:
- **Time-based:** per aggression — L1: +7d, L2: +5d, L3: +3d after Applied (tunable). Drafts a nudge → sign off → send.
- **Reply-driven:** the roadmap's Gmail tracker (initiative 1b) classifies inbound mail (interview / reject / offer / follow-up / noise) and proposes the next action; James confirms.
- Every follow-up is logged on the job record. No more than the aggression-configured max.

## 4. Gate summary (the irreversible-action rule)

| Gate (skill) | Guards | Approver |
|---|---|---|
| Resume Sign off | resume enters the bundle | James |
| Cover Letter Sign Off | cover letter enters the bundle | James |
| Outreach Sign Off | any message sent to a human | James |
| Apply Sign Off | any application submitted / account created | James |

No bot sends, submits, or creates accounts without the corresponding sign-off recorded on the job record.

## 5. Agent registry (v2)

| Agent | Input | Output | Isolation |
|---|---|---|---|
| JD Dissector | JD | structured role requirements | — |
| Resume Builder | JD + master profile + persona | tailored resume | — |
| ATS Auditor | resume | ATS audit + fixed resume | — |
| Huminizor/Anti-AI | resume | humanized resume | — |
| HR Simulator | resume + JD **only** | pass/fail + critiques | **fresh context every pass** |
| Cover Letter Creator | passed resume + JD + persona | cover letter | — |
| LinkedIn Auditor | LinkedIn profile + personas | audit report | — (deferred run) |
| Outreach Critic | outreach message (+ JD context) | tone/ask critique | **fresh context every pass** |

HR Simulator is positioned as **the target company's screener**, not the applier's advocate. It never sees the persona, gap analysis, or build rationale — same isolation contract as RUN.md §3.

## 6. Data model (v2, repo-first)

No database in v2; the repo is the store. One JSON record per job travels the pipeline via a `stage` field. (DB migration comes with the GUI build.)

```jsonc
// Applications/Companies/{{company}}/Jobs/{{job}}/job-record.json
{
  "id": "uuid",
  "stage": "discovered|queued|scouting|resume_build|cover_letter|bundled|applying|applied|following_up|closed",
  "source": "rover|manual|recruiter",
  "source_board": "linkedin|indeed|ziprecruiter|a16z|vc|target_list|newly_funded",
  "dedupe_hash": "...",
  "config": {
    "aggression": 1,                 // 1|2|3
    "industry": "...",
    "persona": "executive|manager|builder",
    "personal_connections": [{"name": "...", "link": "...", "relationship": "..."}]
  },
  "gates": {
    "resume_signoff":   {"by": "james", "at": "...", "artifact_sha": "..."},
    "cover_signoff":    {"by": "james", "at": "...", "artifact_sha": "..."},
    "outreach_signoff": {"by": "james", "at": "...", "message_ids": ["..."]},
    "apply_signoff":    {"by": "james", "at": "...", "bundle_sha": "..."}
  },
  "hr_simulator_passes": [{"at": "...", "verdict": "YES", "scorecard": "HR-CRITIQUE-SCORECARD.json"}],
  "bundle": {"manifest": "final_files/bundle.json", "at": "..."},
  "application": {"submitted_at": "...", "via": "email|portal", "account_created": true},
  "follow_ups": [{"at": "...", "type": "time|reply", "status": "sent"}],
  "created_at": "...", "updated_at": "..."
}
```

- `Discovery/` (new, repo root): staging area for Rover output — one JSON per discovered role, `status: new|queued|dismissed`. Mirrors the Applications folder pattern so a record can graduate into a full job workspace.
- `Applications/Agencies/` (new): Lane 2 home — `Agencies/{{agency}}/Agency.md`, recruiters, outreach log (per roadmap §3 vault layout).
- Existing `Applications/Companies/…` layout is unchanged.

## 7. Build order for Cursor

1. **Phase 0 — Discovery:** `Discovery/` staging + Rover v1 (assisted sweep OK) + select-to-queue flow (CLI: list new → pick → creates job record + workspace). Dedupe from day one.
2. **Phase 1 — Orchestrator + Direct path:** stage machine over `job-record.json`; wire existing `prompt-library` sequence; HR Simulator gate per §5; Resume Sign off.
3. **Phase 2 — Cover letter + Bundle:** Cover Letter Creator, sign-off, `bundle.json` assembly.
4. **Phase 3 — Scout path:** Connection Scout, outreach drafting, Outreach Critic, Outreach Sign Off.
5. **Phase 4 — Applier + Account Forge:** Apply Sign Off, submission, account creation, applied log.
6. **Phase 5 — Follow-up:** time-based engine; Gmail tracker hookup (roadmap initiative 1b).
7. **Phase 6 — Lane 2:** Recruiter Recruit + `Applications/Agencies/`.
8. **Deferred:** LinkedIn Auditor (after background + personas finalized), self-healing ingest (roadmap §2), GUI.

Each phase ships with the sign-off skill it introduces. No phase sends or submits anything without its gate.

## 8. Grok-bot research briefs (queued, for handoff)

- **R1 — VC/startup board landscape:** which boards (A16z, YC, Sequoia, etc.) expose structured listings (API/RSS/sitemap); Rover integration notes.
- **R2 — ATS criteria 2026:** what actually moves the needle (keyword matching vs. formatting vs. file type); tune the ATS Auditor rubric.
- **R3 — Apply/account automation posture:** Workday / Greenhouse / Lever / iCIMS — programmatic apply feasibility and ToS stance for personal use; Account Forge design input.

## 9. Open items (tunable defaults proposed)

- Follow-up timing: L1 +7d, L2 +5d, L3 +3d — James tunes after first live run.
- Internal board auto-dismiss: 30 days proposed.
- HR Simulator loop cap: 3 (existing RUN.md rule, kept).
- Scout-path cold read depth: lightweight rubric for v2 (tone / ask clarity / desperation signals); promote to full critic if messages underperform.
