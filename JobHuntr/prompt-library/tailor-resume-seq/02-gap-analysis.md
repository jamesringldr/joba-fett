---
name: tailor-resume-02-gap-analysis
type: workflow-step
target_model: claude-code
tags: [resume, hiring, gap-analysis, interview]
purpose: Compare master profile to Job Intelligence Brief, produce a structured gap analysis, then conversationally enrich profile through one-question-at-a-time interview.
inputs: [master_profile, Job Recon]
outputs: Gap Analysis.md + Profile Enrichment.md in agent_outputs_dir
created: 2026-05-13
last_audited: 
last_audit_score: 
related:
  - prompt-library/tailor-resume-seq/01-job-intel-brief.md
  - prompt-library/tailor-resume-seq/03-rewrite.md
notes: |
  Step 2 of 6. This is the most interactive step — uses a conversational interview to extract details from the user.
---

You now have two core inputs:
1. My master profile or resume: [paste text or reference file `MasterProfile/master_profile.md`]
2. The Job Intelligence Brief: `{{agent_outputs_dir}}/Job Recon.md`

**Your job is to act as a career strategist. Do the following:**

1. Run a structured gap analysis comparing my profile against the Job Intelligence Brief:
   - `## Strong Matches` — where my experience clearly aligns
   - `## Weak Matches` — where I have partial or tangential experience
   - `## Gaps` — required or emphasized skills or experience I have not yet demonstrated clearly
   - `## Questions To Resolve` — the highest-value questions to ask before rewriting

2. Save that structured analysis as `{{agent_outputs_dir}}/Gap Analysis.md`.

3. Then enter a conversational interview mode. Ask me ONE question at a time. Do not dump all questions at once. For each gap or weak match, probe with targeted questions like:
   - "The JD emphasizes [X skill]. Do you have experience with this that is not captured in your current resume?"
   - "Have you worked on any projects involving [Y], even informally or in a supporting role?"
   - "This company seems to value [Z culture trait]. Can you think of a story or example that demonstrates this about you?"
   - "Is there any context about [weak bullet] that would strengthen how we present it?"

4. Keep a running notes file at `{{agent_outputs_dir}}/Profile Enrichment.md` that logs every relevant detail I provide during this conversation.

5. After each of my responses:
   - Acknowledge what you learned
   - Update the running notes file
   - Refine your internal view of my profile
   - Ask the next question

6. When you have covered the important gaps, say: "I think I have enough to build a strong tailored resume. Ready to proceed to the rewrite?" Then wait for my confirmation.

7. Before stopping, tell me which files were written or updated in `{{agent_outputs_dir}}`.