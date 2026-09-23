# Workflow: Tailor Resume

**Purpose:** Take a job description + a master profile/resume and produce a tailored, ATS-optimized, human-sounding resume package (markdown + PDF), with full intermediate artifacts.

**Trigger:** A job moves from `queued` to `working` and a tailored application package is needed.

**Target model:** Claude Code (filesystem-backed, file-writing assumed)

**Workspace conventions** (initialized by step 00):
- `{{vault_root}} = .`
- `{{company_dir}} = {{vault_root}}/Applications/Companies/{{company_folder_name}}`
- `{{job_dir}} = {{company_dir}}/Jobs/{{job_folder_name}}`
- `{{agent_outputs_dir}} = {{job_dir}}/agent_outputs` — all intermediate working files
- `{{final_files_dir}} = {{job_dir}}/final_files` — only polished deliverables

## Sequence

| # | File | Step | What it produces |
|---|---|---|---|
| 0 | `00-bootstrap.md` | Session init + workspace setup | Folders + saved JD + exact workspace confirmation |
| 1 | `01-job-intel-brief.md` | Research the role and company | `Job Recon.md` + `Job Recon Fields.json` → app DB |
| 2 | `02-gap-analysis.md` | Gap analysis + conversational enrichment | `Gap Analysis.md` + `Profile Enrichment.md` |
| 3 | `03-rewrite.md` | Tailored resume draft | `Resume PreDraft.md` |
| 4 | `04-ats-pass.md` | ATS parse sim, keyword check, optimization | `Audited Resume.md` + `ATS Audit.md` |
| **GATE** | **`hr-critic/` — mandatory, isolated** | **Cold hiring-manager evaluation of `Audited Resume.md` + JD; loops back to the previous step until it approves** | **`HR-CRITIQUE-REPORT.md` + `HR-CRITIQUE-SCORECARD.json`** |
| 5 | `05-humanization.md` | Strip LLM fingerprints while preserving ATS coverage | `Humanized Resume.md` + `Humanize Audit.md` |
| 6 | `06-final-output.md` | Clean markdown + PDF via LaTeX | `James Oehring Resume - {{company_name}}.md` + `.pdf` in `final_files_dir` |

## Mandatory Quality Gate: HR-Critic (After Step 4, before Step 5)

**What it is:** An independent, **isolated** hiring-manager evaluation of the ATS-audited resume from a cold perspective—with zero context of the development process, enrichment notes, or editing rationale.

**When it runs:** Automatically after Step 4 (ATS Pass), on `Audited Resume.md`. This is a **mandatory gate, not optional** — the sequence does not graduate to Step 5 (Humanization) until HR-Critic returns STRONG YES or YES. It runs in a **fresh, isolated context** (a subagent in Claude Code, or a new chat in Cursor) that sees only `Audited Resume.md` + the job description — never the gap analysis, enrichment, rewrite rationale, or prior session history. See the driver `RUN.md` (§3) for the isolation contract and loop mechanics. The HR-Critic evaluates:
- ATS match score (will the resume pass automated filters?)
- STAR narrative strength (do bullets demonstrate impact and ownership?)
- Behavioral competencies (Systems Thinking, Operational Ownership, Product Mindset, Collaboration)
- Integrity & red flags (typos, gaps, AI manipulation markers, authenticity)

**Decision tree after HR-Critic (the loop, keyed off `HR-CRITIQUE-SCORECARD.json → final_recommendation`):**
- **STRONG YES / YES** → graduate to Step 5 (Humanization)
- **MAYBE** → feed the HIGH PRIORITY optimization backlog back to **Step 4 (ATS Pass)**, re-emit `Audited Resume.md`, then re-run HR-Critic in a **new isolated context**. Repeat.
- **NO** → loop deeper: hand critical/narrative + missing must-have items back to **Step 3 (Rewrite)**, then Step 4 → HR-Critic again.
- **Loop cap:** after 3 failed loops without a YES, stop and escalate to human review.

**How to invoke:** See `prompt-library/hr-critic/README.md` for detailed instructions. Briefly:
```
Use the HR-Critic framework.

Resume: [paste Resume PreDraft.md]
Job Description: [paste original JD]
```

**Output files** (saved to `{{agent_outputs_dir}}`):
- `HR-CRITIQUE-REPORT.md` — Human-readable findings + actionable backlog
- `HR-CRITIQUE-SCORECARD.json` — Structured scoring data

**Philosophy:** HR-Critic is **intentionally outside** the sequential workflow. It catches hiring manager blind spots before technical optimization passes, giving you visibility into whether the resume actually demonstrates fit from a hiring manager's lens.

---

## Inputs to the workflow as a whole

- Job description (text, URL, or pasted)
- Job title, company name, job date tag (resolved in step 0)
- Master profile / resume (referenced in step 2 onward; canonical repo path is `MasterProfile/master_profile.md`)

## Final deliverables (in `final_files_dir`)

- `James Oehring Resume - {{company_name}}.md`
- `James Oehring Resume - {{company_name}}.pdf`

## Notes

- Step 0 is the standing system prompt for the session; later steps assume its rules and variables are in scope.
- If `{{job_dir}}` already exists and contains files, step 0 must list them and ask whether to resume or start fresh before continuing.
- Each step ends by telling the user which file(s) were written and waiting for approval.
- Step 0 ends with a fixed-shape "Workspace ready" confirmation so every session starts from the same state summary.
- Step 5 must anchor rewrites to `Profile Enrichment.md` and preserve ATS keywords from `ATS Audit.md` rather than humanizing from scratch.
- All intermediate files stay in `agent_outputs_dir` — `final_files_dir` is reserved for polished outputs.
