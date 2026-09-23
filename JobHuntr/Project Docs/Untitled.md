## What already happened (backlog)

When you pasted a URL and clicked Add to backlog:

1. The backend fetched the posting and extracted title, company, description, skills, keywords, etc.
2. A job record was created at stage `backlog` (in-memory in the API store today).
3. The app created placeholder artifacts in the job record (intelligence brief stub, gap analysis stub, etc.) — those live in the app database, not in Obsidian yet.
4. No Obsidian folder was created yet. That waits until `working`.

Telegram intake does the same thing: URL → backlog job.

---

## Stage ladder (app)

backlog → queued → working → review → applying → submitted → …

|Stage|What the app does|What Claude does|
|---|---|---|
|backlog|JD stored on the job record; you triage|Nothing|
|queued|“I’m going to work this one”|Nothing|
|working|Backend creates vault folders + writes `job_description__*.md` from `raw_description`|Resume tailoring pipeline starts here|
|review|You’re reviewing the package before apply|Usually after finalize|

Advance stages from Jobs, Queue (“Move to …”), or Workspace (status menu).

The important hook: when status becomes `working`, `ensure_job_workspace` runs and creates:

docs/obsidian/JobHuntr/Applications/Companies/<Company>/<Title - YYYY-MM-DD>/

agent_outputs/

job_description__<job_slug>__<company_slug>__<date>.md ← written if missing

final_files/

`job_date_tag` is the date the job first entered `working` (from status history).

---

## Your next steps (practical)

### 1. In the JobHunter app

1. Open the job (Jobs list or Workspace).
2. Move backlog → queued when you’re ready to prioritize it.
3. Move queued → working when you’re ready to tailor a resume.

After step 3, confirm the folder exists (example):

ls "docs/obsidian/JobHuntr/Applications/Companies/Jack Henry/Senior Strategic Program Manager - 2026-05-13/agent_outputs/"

You should see the saved JD markdown.

Optional: keep the app open for stage tracking, contacts, notes, and the in-app artifact text areas — but Claude’s real outputs go to `agent_outputs/` and `final_files/`, not automatically into those UI fields.

### 2. In Claude Code (one repo session — main window)

Open Claude Code in the JobHunter repo (so `CLAUDE.md` and `.claude/` load).

You do not need to open six separate Claude windows. Typical pattern:

|Where|What|
|---|---|
|Main Claude Code chat|Bootstrap + skills (interactive steps)|
|Subagents (`ats-auditor`, `resume-humanizer`)|Claude spawns these in fresh context when you delegate — isolation without you managing extra windows|

Suggested flow in the main session:

1. Bootstrap (from `CLAUDE.md`, not a skill): confirm company/title/date, check for existing folder, “resume or start fresh”, get the “Workspace ready” block.  
    _If you already moved to `working` in the app, folders may exist — bootstrap should detect that and offer resume._
    
2. Step 1 — `job-recon` skill: research + `job_intelligence_brief__*.md` → you approve.
    
3. Step 2 — `gap-analysis` skill: gap file + one-question interview → `enriched_profile_notes__*.md` → you approve.
    
4. Step 3 — `resume-rewrite` skill: draft + iterate until you say approved.
    
5. Step 4 — delegate `ats-auditor` with explicit paths, e.g.:
    
    Use the ats-auditor agent with:
    
    - tailored_resume_draft: docs/obsidian/JobHuntr/Applications/Companies/.../agent_outputs/tailored_resume_draft__....md
    
    - job_intelligence_brief: .../job_intelligence_brief__....md
    
    Agent writes optimized resume + audit report and exits. You review in the main chat, then approve before step 5.
    
6. Step 5 — delegate `resume-humanizer` with ATS resume, ATS report, and enriched notes paths. Same pattern.
    
7. Step 6 — `resume-finalize` skill: polished `.md` + `.pdf` in `final_files/`.
    
8. Back in the app: move working → review (or applying) when you’re happy with `final_files/`.