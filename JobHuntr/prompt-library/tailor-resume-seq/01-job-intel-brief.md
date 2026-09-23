---
name: tailor-resume-01-job-intel-brief
type: workflow-step
target_model: claude-code
tags: [resume, hiring, research, job-analysis]
purpose: Build a structured Job Intelligence Brief by analyzing the JD and researching the company.
inputs: [job_description_file, job_title, company_name, company_website, company_linkedin_url]
outputs: Job Recon.md + Job Recon Fields.json in agent_outputs_dir, then DB sync
created: 2026-05-13
last_audited: 
last_audit_score: 
related:
  - prompt-library/tailor-resume-seq/00-bootstrap.md
  - prompt-library/tailor-resume-seq/02-gap-analysis.md
notes: |
  Step 1 of 6 in the tailor-resume workflow. Depends on bootstrap (00) having initialized the workspace.
---

I'm going to give you a job description and a target company name. Your job is to act as a research analyst and build a "Job Intelligence Brief" for the active application workspace.

**Inputs:**
- Job Description file: `{{agent_outputs_dir}}/Job Description.md`
- Job Title: `{{job_title}}`
- Company name: `{{company_name}}`
- Company website: `{{company_website}}` if available
- Company LinkedIn page: `{{company_linkedin_url}}` if available

If the job description has not been saved yet, write it to the job description file above before continuing.

**Tasks — run these in sequence:**

1. Review the job description markdown file:
   - Role title, level, and location
   - Core responsibilities (bullet list)
   - Required qualifications (hard requirements)
   - Nice-to-have qualifications
   - ATS keywords (tools, skills, methodologies, certifications explicitly named)
   - Tone and language style of the JD

2. Research the company using web search:
   - Mission, values, and culture signals from the company website
   - Recent news from the last 6 months: funding, launches, leadership changes, strategic shifts
   - Glassdoor or comparable candidate signals if available: management style, interview process, red flags, green flags
   - LinkedIn signals: size, growth trajectory, who typically holds this role

3. Synthesize a Job Intelligence Brief as a structured markdown document with these sections:
   - `## Role Snapshot` — title, level, one-sentence summary
   - `## Compensation & Role Logistics` — posted salary range (if any), employment type (direct hire vs contract), work mode, location
   - `## Must-Have Skills` — ranked by frequency or emphasis in the JD
   - `## Nice-to-Have Skills`
   - `## ATS Keywords` — exact phrases to mirror in the resume where truthful
   - `## Culture Signals` — what values or working style this company seems to prize
   - `## Key Themes` — 3-5 strategic themes this role is hiring for
   - `## Red Flags / Watch-Outs` — anything ambiguous or concerning
   - `## Interview Intel` — any available info on the interview process

4. Save the narrative brief as `{{agent_outputs_dir}}/Job Recon.md`.

5. Write `{{agent_outputs_dir}}/Job Recon Fields.json` for DB sync. Required shape:

```json
{
  "required_skills": [],
  "preferred_skills": [],
  "keywords": [],
  "responsibilities": [],
  "qualifications": [],
  "salary_min": null,
  "salary_max": null,
  "job_type": "unknown",
  "work_mode": "unknown"
}
```

- List fields: string arrays (same mapping as before).
- `salary_min` / `salary_max`: posted JD annual USD integers; `null` if not listed.
- `job_type`: `direct_hire` | `contract` | `unknown`.
- `work_mode`: `remote` | `hybrid` | `onsite` | `unknown`.
- Do **not** include `estimated_salary_*` (user-only in the app).

These replace the app's backlog HTML extraction and workspace meta fields when synced.

6. Sync to the database from `{{job_dir}}`:

```bash
curl -sf -X POST "${JOBHUNTER_API_URL:-http://127.0.0.1:8000}/jobs/${JOBHUNTER_JOB_ID}/recon-fields/sync"
```

Or use `job.meta.json` for `job_id` / `api_url` if env vars are unset.

7. Tell me the files you wrote, confirm DB sync succeeded, and summarize the role's most important themes before waiting for approval to continue.