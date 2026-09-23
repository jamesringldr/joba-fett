# /newjob — start a new resume-tailoring sequence

Start a new tailoring run by following **`RUN.md`** in this repo (repo-root paths). Run
`prompt-library/tailor-resume-seq/00-bootstrap.md` as the session system prompt.

Collect the intake below. If I typed details after `/newjob`, use them; otherwise ask me
**one question at a time**:

- `company`
- `job_title`
- `company_url`
- `job_posting_url`
- `jd` — the posting URL to fetch, or pasted JD text
- **Candidate Persona** — the voice/tone block (I provide this manually)

Then:
1. Create the workspace under `Applications/Companies/{{company}}/…`.
2. Fetch the JD → `Job Description.md`. If the URL extracts poorly, create it as a **stub** and
   print `⚠️ JD not cleanly extracted from URL — … paste the JD into it before Step 1.`
3. Write `Job Meta.json` (urls + best-effort seniority/salary, `null` if absent).
4. Save my persona verbatim to `Candidate Persona.md` (the voice contract for Steps 3–6).
5. Print the `Workspace ready` block and **stop for my go-ahead** before Step 1.

Do not pass `Candidate Persona.md` or any build context into the HR-Critic gate (Step 4→5) — it
reads cold. Full flow, including the gate's isolation + loop, is in `RUN.md`.
