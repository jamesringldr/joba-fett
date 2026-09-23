# JobHuntr — Agent Context

Resume-tailoring sequence. Job description + master profile in → ATS-ready, humanized resume out.

## Running the sequence (direct / terminal)

**Follow [RUN.md](./RUN.md)** — the authoritative driver. Don't improvise the flow.

- **Invoke:** `/newjob` (or just ask to start a new tailor sequence).
- **Paths:** repo-root-relative — `Applications/` + `MasterProfile/master_profile.md` live at the
  root (`{{vault_root}} = .`). The old `docs/obsidian/JobHuntr` routing has been removed.
- **Entrypoint:** `prompt-library/tailor-resume-seq/00-bootstrap.md`.
- **Intake:** bootstrap takes company + title + `company_url` + `job_posting_url` + JD + a manual
  **Candidate Persona** block. It fetches the JD (stub + ⚠️ notice if the URL extracts poorly),
  records best-effort seniority/salary in `Job Meta.json`, and saves the persona to
  `Candidate Persona.md` — the voice contract for Steps 3–6, excluded from the HR-Critic gate.
- **Order:** 01 job-intel → 02 gap → 03 rewrite → 04 ats → **05 HR-CRITIC gate** → 06 humanize
  → 07 final. One step at a time; wait for approval between steps.

## HR-Critic gate (mandatory · isolated · looping)

After Step 4 (ATS pass), run HR-Critic (`prompt-library/hr-critic/00-hr-critic-standalone.md`) as
a **subagent / fresh Task** — an isolated cold read that receives ONLY `Audited Resume.md` +
`Job Description.md`. Never pass it the gap analysis, enrichment, rewrite rationale, or prior
session context. Loop on `HR-CRITIQUE-SCORECARD.json → final_recommendation`: `MAYBE`/`NO` feeds
the backlog back to the previous step and re-runs in a new isolated context; only `YES`/
`STRONG_YES` graduates to Humanization. Cap at 3 loops, then escalate. Full contract: RUN.md §3.

## Harness

Tracked in Maiztro as mission `jobhuntr` (operation `jobafett`). See `.maiztro`.
