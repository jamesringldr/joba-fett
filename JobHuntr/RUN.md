# RUN — Tailor a Resume (direct terminal / Cursor)

This is the **entrypoint** for running the resume-tailoring sequence directly — in Cursor or in a
terminal (Claude Code) — against **this repo as-is**. It is the shared driver both surfaces
follow; the per-step logic still lives in the existing prompt files under
`prompt-library/`, which this doc reuses without modification.

> **Everything lives in this repo.** All paths are repo-root-relative — `Applications/`,
> `MasterProfile/`, `prompt-library/`. `00-bootstrap` sets `{{vault_root}} = .`; the old
> `docs/obsidian/JobHuntr` vault routing has been removed.

---

## 0. Paths (repo-root)

The canonical paths for every step:

```
{{vault_root}}        = .            # the repo root — where the real data lives
{{company_dir}}       = Applications/Companies/{{company_folder_name}}
{{job_dir}}           = {{company_dir}}/Jobs/{{job_folder_name}}
{{agent_outputs_dir}} = {{job_dir}}/agent_outputs
{{final_files_dir}}   = {{job_dir}}/final_files
master profile        = MasterProfile/master_profile.md
candidate persona     = {{agent_outputs_dir}}/Candidate Persona.md   # voice contract, Steps 3-6
job meta              = {{agent_outputs_dir}}/Job Meta.json          # urls + seniority + salary
```

Everything else in the step prompts is used verbatim.

---

## 1. Entrypoint — start a new application

**Fastest:** run **`/newjob`** (Cursor or Claude Code) — it drives everything below. You can pass
details inline (`/newjob Acme "Staff PM"`) or let it prompt you one field at a time.

Under the hood it loads `prompt-library/tailor-resume-seq/00-bootstrap.md` as the session system
prompt, then gives it the job. Equivalent one-liner if invoking by hand:

```
Follow RUN.md path mode ({{vault_root}} = .), then run 00-bootstrap for:
company = "<Company>", job_title = "<Title>",
company_url = "<url>", job_posting_url = "<url>",
jd = <posting URL, or paste JD text>,
candidate persona = <paste the persona / voice block>
```

Bootstrap resolves the variables, creates the workspace under `Applications/Companies/…`, fetches
the JD to `{{agent_outputs_dir}}/Job Description.md`, writes `Job Meta.json` (urls + best-effort
seniority/salary), saves your persona to `Candidate Persona.md`, and prints the `Workspace ready`
block.

**Intake notes:**
- Seniority + salary are extracted from the JD best-effort (`null` if absent — never invented).
- If the posting URL extracts poorly, bootstrap still creates `Job Description.md` as a **stub**
  and prints a ⚠️ notice — paste the JD in before Step 1.
- The **Candidate Persona** is the session's voice contract: every tailored artifact in Steps 3–6
  is written in that tone. It is **build-side context and is excluded from the HR-Critic gate**
  (see §3).

---

## 2. The canonical sequence

Run in this order, **one step at a time, waiting for approval between steps** (the prompts
enforce this). The driver order below is authoritative — it supersedes the numeric prefixes on
the filenames (the `05-`/`06-` files are **not** renamed; keep the plumbing).

| Order | Prompt file | Produces |
|---|---|---|
| 1 | `tailor-resume-seq/01-job-intel-brief.md` | `Job Recon.md` + `Job Recon Fields.json` |
| 2 | `tailor-resume-seq/02-gap-analysis.md` | `Gap Analysis.md` + `Profile Enrichment.md` |
| 3 | `tailor-resume-seq/03-rewrite.md` | `Resume PreDraft.md` |
| 4 | `tailor-resume-seq/04-ats-pass.md` | `Audited Resume.md` + `ATS Audit.md` |
| **5 — GATE** | `hr-critic/00-hr-critic-standalone.md` | `HR-CRITIQUE-REPORT.md` + `HR-CRITIQUE-SCORECARD.json` |
| 6 | `tailor-resume-seq/05-humanization.md` | `Humanized Resume.md` + `Humanize Audit.md` |
| 7 | `tailor-resume-seq/06-final-output.md` | `James Oehring Resume - {{company_name}}.md` + `.pdf` |

---

## 3. Step 5 — the HR-Critic gate (mandatory, isolated, looping)

HR-Critic is **not optional** and it is **not** run in the same thread that built the resume. It
is a cold hiring-manager evaluation that must not see how the resume was developed.

### Isolation contract
The critic receives **only** two inputs, and nothing else from `agent_outputs/`:
1. `{{agent_outputs_dir}}/Audited Resume.md`  (the post-ATS resume from Step 4)
2. `{{agent_outputs_dir}}/Job Description.md`

It must **not** be given `Candidate Persona.md`, `Gap Analysis.md`, `Profile Enrichment.md`,
`Resume PreDraft.md`, the rewrite rationale, or any conversation history from steps 1–4.

### How to run it in isolation
- **Terminal (Claude Code):** dispatch it as a **subagent** (a fresh Task) whose entire context
  is the HR-Critic framework (`hr-critic/00-hr-critic-standalone.md`) plus the two input files
  above — pasted in, not referenced by session memory. The subagent returns the report +
  scorecard written to `{{agent_outputs_dir}}/`.
- **Cursor:** open a **new chat / composer** (fresh context — do not continue the thread that
  wrote the resume). Paste the HR-Critic framework + the two inputs. Save both outputs to
  `{{agent_outputs_dir}}/`.

### The loop (key off `HR-CRITIQUE-SCORECARD.json → final_recommendation`)
```
run HR-Critic (isolated)  ->  read final_recommendation
├─ STRONG_YES | YES  ->  GRADUATE to Step 6 (Humanization)
├─ MAYBE             ->  take the HIGH PRIORITY optimization backlog and hand it back to
│                        Step 4 (ATS pass); re-emit Audited Resume.md; re-run HR-Critic in a
│                        NEW isolated context. Loop.
└─ NO                ->  loop deeper: hand critical/narrative + missing must-have items back to
                         Step 3 (Rewrite); then Step 4 -> HR-Critic again. Loop.

loop cap: after 3 failed loops without a YES, STOP and escalate to human (James).
```

Rules for the loop:
- Every re-run of HR-Critic is a **fresh isolated context** — never let it carry over its own
  prior critique or the fix rationale. Each pass is a cold read.
- The step receiving feedback edits **only** the resume artifact it owns, then re-emits it; it
  does not argue with the critique.
- Only `STRONG_YES` / `YES` graduates. `MAYBE` never graduates.

---

## 4. After the gate

On graduation, continue Step 6 (Humanization) → Step 7 (Final Output) as normal. Final
deliverables land in `{{final_files_dir}}`.

---

## Quick reference

```
# start
00-bootstrap  (vault_root = .)      -> Workspace ready
# build
01 job-intel  02 gap  03 rewrite  04 ats  -> Audited Resume.md
# gate (isolated, loops)
05 HR-CRITIC  -> YES? graduate : feed backlog to prev step, re-run
# finish
06 humanize   07 final             -> .md + .pdf in final_files/
```
