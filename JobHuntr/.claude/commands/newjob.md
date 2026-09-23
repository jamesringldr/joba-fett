---
description: Start a new resume-tailoring sequence (bootstrap) per RUN.md
argument-hint: [company] [title] — or leave blank to be prompted
---

Start a new resume-tailoring sequence by following **`RUN.md`** (repo-root paths). Run
`prompt-library/tailor-resume-seq/00-bootstrap.md` as the session system prompt.

Intake — use anything I passed as arguments (`$ARGUMENTS`), and ask **one question at a time** for
the rest:
- `company`, `job_title`, `company_url`, `job_posting_url`
- `jd` — the posting URL to fetch, or pasted JD text
- **Candidate Persona** — the voice/tone block (I provide this manually)

Then:
1. Create the workspace under `Applications/Companies/{{company}}/…`.
2. Fetch the JD → `Job Description.md`. If the URL extracts poorly, still create it as a **stub**
   and print `⚠️ JD not cleanly extracted from URL — … paste the JD into it before Step 1.`
3. Write `Job Meta.json` (urls + best-effort seniority/salary, `null` if absent).
4. Save my persona verbatim to `Candidate Persona.md` — the voice contract for Steps 3–6.
5. Print the `Workspace ready` block and **stop for my go-ahead** before Step 1.

The HR-Critic gate fires automatically after Step 4 as an **isolated** cold read — dispatch it as a
subagent with only `Audited Resume.md` + `Job Description.md`; never the persona or build context.
Full contract in `RUN.md` §3.
