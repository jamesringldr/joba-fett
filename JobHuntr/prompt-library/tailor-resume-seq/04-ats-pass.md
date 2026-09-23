---
name: tailor-resume-04-ats-pass
type: workflow-step
target_model: claude-code
tags: [resume, hiring, ats, optimization]
purpose: ATS parse simulation, keyword gap analysis, scoring estimation, and optimization pass on the tailored draft.
inputs: [Resume PreDraft, Job Recon]
outputs: Audited Resume.md + ATS Audit.md in agent_outputs_dir
created: 2026-05-13
last_audited: 
last_audit_score: 
related:
  - prompt-library/tailor-resume-seq/03-rewrite.md
  - prompt-library/tailor-resume-seq/05-humanization.md
notes: |
  Step 4 of 6. Five-phase pass — parse sim, keyword gap, scoring sim, optimization, final report.
---

We've completed the resume rewrite. Before generating the final PDF, run a dedicated
ATS Optimization pass on `{{agent_outputs_dir}}/Resume PreDraft.md`.

You are now acting as an ATS systems expert who knows how modern applicant tracking
systems parse, score, and filter resumes.

---

**PHASE 1 — ATS PARSE SIMULATION**

Simulate how an ATS would read the current resume draft:

1. Strip all formatting mentally — pretend the ATS sees plain text only
2. Identify anything that would cause parse failures or data loss:
   - Dates in non-standard formats (ATSes expect MM/YYYY or Month YYYY)
   - Job titles that are too creative or non-standard
   - Acronyms used without spelling out the full term at least once
   - Bullet points that start with weak or passive openers an ATS might 
     weight lower ("Helped with...", "Involved in...", "Responsible for...")
   - Any section headers that deviate from standard labels ATS systems 
     expect (e.g. "My Journey" instead of "Work Experience")
   - Skills buried in bullet prose that should be surfaced to a dedicated 
     Skills section for keyword extraction
3. Flag every issue found with [⚠️ ATS RISK: ...]

---

**PHASE 2 — KEYWORD GAP ANALYSIS**

Cross-reference `{{agent_outputs_dir}}/Resume PreDraft.md` against the ATS Keywords list
in `{{agent_outputs_dir}}/Job Recon.md`:

1. Build a keyword match table:

| Keyword from JD | Present in Resume? | Location | Exact Match or Variant? |
|---|---|---|---|

2. For any keyword that is MISSING or only appears as a weak variant:
   - Suggest exactly where and how to inject it naturally
   - If it cannot be injected truthfully, flag it as a gap — do not force it

3. Check keyword DENSITY — flag any keyword that appears so many times 
   it could trigger spam filters (generally 3+ times is risky for a single term)

---

**PHASE 3 — SCORING SIMULATION**

Estimate how this resume would score against this specific JD using 
common ATS scoring logic:

- **Keyword match score** (estimated % of JD keywords present)
- **Title alignment** (does the resume title/summary mirror the JD title?)
- **Skills section completeness** (are skills listed explicitly, not just implied?)
- **Recency weighting** (are the most relevant experiences recent and prominent?)
- **Education match** (does it meet stated requirements?)

Give me an estimated ATS score out of 100 with a breakdown, and a target 
score to hit (typically 80+ is considered competitive for most ATS systems).

---

**PHASE 4 — OPTIMIZATION PASS**

Make all recommended changes directly to the resume and save the optimized draft as
`{{agent_outputs_dir}}/Audited Resume.md`:

- Fix all parse risk flags
- Inject missing keywords naturally
- Strengthen weak bullet openers with strong action verbs
- Ensure Skills section is explicit and comprehensive
- Standardize all dates and formatting
- Confirm the resume title/headline directly mirrors the JD job title

Do NOT change the substance or voice of the resume — only optimize 
for ATS readability and keyword matching.

---

**PHASE 5 — FINAL ATS REPORT**

Output a clean report at `{{agent_outputs_dir}}/ATS Audit.md` containing:

  ## ATS Audit Summary
  - Pre-optimization estimated score: X/100
  - Post-optimization estimated score: X/100

  ## Issues Fixed
  [list of everything changed and why]

  ## Keyword Coverage
  [final keyword match table]

  ## Remaining Gaps
  [any keywords or requirements that couldn't be addressed honestly]

  ## Recommendations for Future Profile Building
  [skills or experiences worth developing to strengthen future applications 
  to similar roles]

---

When complete, tell me which two files you wrote in `{{agent_outputs_dir}}`, present the summary, and ask:
"Does the optimized version still feel authentic? Any changes you'd like 
to revert or adjust before we move to final output?"

Wait for my approval, then we proceed to Step 5.