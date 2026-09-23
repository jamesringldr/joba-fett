# HR-Critic: Quick Invocation Guide

## Usage

After completing **Step 3 (Resume Rewrite)** in the tailor-resume sequence, you can optionally invoke HR-Critic to get an independent hiring manager evaluation before proceeding to Step 4 (ATS Pass).

---

## One-Minute Setup

1. **Have ready:**
   - The resume file from Step 3: `Resume PreDraft.md`
   - The original job description (copy-pasted into your workspace)

2. **Copy-paste this into Claude Code:**

```markdown
I'd like an independent hiring manager critique on this resume application.

Use the HR-Critic framework from: {{project_root}}/prompt-library/hr-critic/00-hr-critic-standalone.md

**Resume to evaluate:**
[paste content of {{job_dir}}/agent_outputs/Resume PreDraft.md here]

**Target Job Description:**
[paste original job description here]

Please generate:
1. HR-CRITIQUE-REPORT.md (human-readable findings + actionable backlog)
2. HR-CRITIQUE-SCORECARD.json (structured scoring data)

Both should be saved to: {{job_dir}}/agent_outputs/
```

3. **Let it run.** HR-Critic will execute all five evaluation modules and generate both files.

---

## Reading the Output

### HR-CRITIQUE-REPORT.md

Look for these sections in order:

1. **EXECUTIVE SUMMARY** — Your hiring recommendation and confidence level
   - **STRONG YES / YES?** → Go to Step 4 immediately
   - **MAYBE?** → Check "Priority Actions" and fix high-impact issues
   - **NO?** → Reassess role fit

2. **MODULE 1: Structural & Parsing Audit** — Layout/formatting risks
   - If you see [PARSE RISK], [HEADING RISK], or [DATE RISK]: Fix these before submitting

3. **MODULE 2: Semantic Job Matching** — Your ATS match score
   - 80%+ = Excellent (likely to pass ATS)
   - 60-79% = Decent (mixed chance)
   - <60% = Weak (unlikely to clear filters)

4. **MODULE 3: STAR Narrative & Competency Audit** — Storytelling quality
   - Check "Overall Narrative Strength" score (out of 5)
   - Review the four competency scores (Systems Thinking, Operational Ownership, Product Mindset, Collaboration)
   - 3.5+ = Strong; <3 = Weak, needs rewrites

5. **MODULE 4: Integrity & Red Flags** — Grammar, gaps, AI markers
   - Any [GRAMMAR RED FLAG]? Fix immediately.
   - Any [METRIC CLICHE] or [TEMPLATE UNIFORMITY]? Rewrite with specific details.

6. **MODULE 5: Actionable Optimization Backlog** — Ranked improvements
   - **HIGH PRIORITY** = Address before resubmission
   - **MEDIUM PRIORITY** = Polish if time
   - **LOW PRIORITY** = Nice-to-have enhancements

---

### HR-CRITIQUE-SCORECARD.json

Use this for tracking. Key fields:

```json
{
  "ats_match_percent": [0-100],           // Your ATS pass likelihood
  "star_narrative_score": [0-5],          // Overall storytelling quality
  "systems_thinking": [0-5],              // Technical depth signals
  "operational_ownership": [0-5],         // Accountability & outcome-driving
  "product_mindset": [0-5],               // Business/user focus
  "collaboration": [0-5],                 // Cross-functional effectiveness
  "integrity_status": "PASS|CONCERNS|CRITICAL", // Grammar/red flag status
  "final_recommendation": "STRONG_YES|YES|MAYBE|NO",
  "confidence_level": "HIGH|MODERATE|LOW"
}
```

---

## Decision Tree After HR-Critic

```
┌─ Run HR-Critic ─────────────────────┐
│ (Resume PreDraft.md + JD)           │
└─────────────┬───────────────────────┘
              │
              ├─ Recommendation: STRONG YES / YES
              │  └─> Proceed to Step 4 (ATS Pass)
              │
              ├─ Recommendation: MAYBE
              │  └─> Apply HIGH PRIORITY fixes from optimization backlog
              │      └─> Edit Resume PreDraft.md
              │          └─> Re-run HR-Critic
              │              └─> Check recommendation again
              │
              └─ Recommendation: NO
                 └─> Reassess role fit or plan major rework
                     └─> Escalate for human review (optional)
```

---

## Example Workflow

### Scenario 1: Critique is STRONG YES
```
HR-Critic Result: STRONG YES (ATS 94%, STAR 4.5/5, all competencies 4+, PASS integrity)
→ No action needed
→ Save report to archive
→ Proceed directly to Step 4 (ATS Pass) in the next session
```

### Scenario 2: Critique is MAYBE with actionable gaps
```
HR-Critic Result: MAYBE (ATS 76%, STAR 3.2/5, weak Product Mindset at 2.5)

HIGH PRIORITY ACTIONS:
1. Strengthen 3 bullets with quantified business impact (current bullets lack metrics)
2. Add one bullet demonstrating cross-functional product collaboration
3. Fix 2 typos in Skills section

→ Edit Resume PreDraft.md with these fixes
→ Re-run HR-Critic on the updated version
→ Repeat until recommendation improves to YES / STRONG YES
```

### Scenario 3: Critique is NO with critical gaps
```
HR-Critic Result: NO (ATS 58%, STAR 2.1/5, multiple [GRAMMAR RED FLAG], missing must-have skills)

CRITICAL ISSUES:
- 5 typos + comma splice errors
- Missing "Python" (critical must-have)
- 3+ bullets feel passive/generic

→ Either:
   a) Major rewrite of Resume PreDraft.md (consider loop back to Step 3)
   b) Reassess if this role is a good fit
   c) Escalate for human review
```

---

## Tips for Maximum Value

1. **Run HR-Critic early, iterate often.** Don't wait until final submission.

2. **Focus on HIGH PRIORITY actions first.** These have the biggest impact on ATS score and hiring manager perception.

3. **Interpret the scores holistically:**
   - ATS <80% = Likely filtered out by algorithms
   - STAR narrative <3.5 = Bullets need stronger impact/ownership language
   - Any competency <3 = Missing behavioral signals in that area
   - Any [RED FLAG] = Fix before submitting

4. **Specificity beats generics.** If HR-Critic flags [AUTHENTICITY CONCERN], rewrite that section with specific project names, metrics, team names, technical details.

5. **Re-run after changes.** Use the scorecard to track improvement over iterations.

---

## What HR-Critic Is NOT

- **HR-Critic is not a hiring manager.** It's a simulation of hiring manager heuristics, not an actual hiring decision.
- **HR-Critic does not read context.** It intentionally ignores enrichment notes, gap analysis, or how the resume was developed. This is by design—it evaluates the resume as a cold reader would.
- **HR-Critic does not modify your resume.** It only evaluates and recommends. You decide whether to act on feedback.
- **HR-Critic does not guarantee an interview.** High scores improve your odds, but hiring is complex and multifactorial.

---

## What HR-Critic IS

- A **structured quality gate** that catches hiring manager blind spots before submission
- A **scoring tool** that measures ATS match, narrative quality, behavioral signals, and integrity
- A **prioritized feedback engine** that ranks improvements by impact
- An **auditing layer** for modern AI manipulation markers (clichés, hidden text, template uniformity)
- A **checkpoint** between resume development (Step 3) and technical optimization (Step 4)

---

## Files Generated

After running HR-Critic, check your `{{job_dir}}/agent_outputs/` directory for:

- **HR-CRITIQUE-REPORT.md** — Full evaluation report (4-6 pages)
- **HR-CRITIQUE-SCORECARD.json** — Structured scoring (machine-readable)

Both files are timestamped and archived for future reference.

---

## Questions?

See `prompt-library/hr-critic/README.md` for detailed module documentation, scoring methodology, and design philosophy.
