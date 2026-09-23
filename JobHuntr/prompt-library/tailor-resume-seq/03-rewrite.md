---
name: tailor-resume-03-rewrite
type: workflow-step
target_model: claude-code
tags: [resume, hiring, writing, tailoring]
purpose: Produce a tailored resume draft using master profile, brief, gap analysis, and enriched notes.
inputs: [master_profile, Job Recon, Gap Analysis, Profile Enrichment]
outputs: Resume PreDraft.md in agent_outputs_dir
created: 2026-05-13
last_audited: 
last_audit_score: 
related:
  - prompt-library/tailor-resume-seq/02-gap-analysis.md
  - prompt-library/tailor-resume-seq/04-ats-pass.md
notes: |
  Step 3 of 6. Iterates with user until "approved" — same file is updated rather than versioned.
---

You now have four inputs:
1. My master resume: [reference `MasterProfile/master_profile.md`]
2. Job Intelligence Brief: `{{agent_outputs_dir}}/Job Recon.md`
3. Gap Analysis: `{{agent_outputs_dir}}/Gap Analysis.md`
4. Enriched profile notes from our conversation: `{{agent_outputs_dir}}/Profile Enrichment.md`

Act as an expert resume writer. Rewrite my resume tailored specifically for this role.

**Rules:**
- Mirror the exact language and phrasing from the JD where truthful and natural
- Lead with impact and quantify achievements wherever possible
- Inject ATS keywords from the brief naturally, never in a stuffed or repetitive way
- Use the gap analysis to decide what to elevate, clarify, or down-rank
- Reorder sections and bullets to prioritize what this specific role values most
- Rewrite the summary or objective to speak directly to this company's mission and this role's core themes
- Adjust bullet emphasis: elevate bullets that match the must-have skills and de-emphasize or cut bullets that do not serve this application
- Do NOT fabricate experience. Only use what I have provided directly or through the enriched notes

**Output format:**
- Write the full resume in clean markdown as `{{agent_outputs_dir}}/Resume PreDraft.md`
- After the resume, add a `## Rewrite Notes` section explaining your key decisions and why

Then present the draft to me and ask:
- "Are there any sections you'd like to adjust?"
- "Does this summary feel authentic to how you'd describe yourself?"
- "Any bullets that feel off or that you'd like to strengthen?"

Iterate based on my feedback until I say "approved." Each time you revise the draft, update the same file in `{{agent_outputs_dir}}` rather than creating a new hardcoded filename.