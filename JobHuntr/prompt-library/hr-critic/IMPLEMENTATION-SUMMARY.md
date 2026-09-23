# HR-Critic Implementation Summary

**Date:** 2026-07-07  
**Status:** ✅ Complete and Ready for Use

---

## What Was Created

A comprehensive **HR-Critic framework** — a standalone agent that evaluates resumes from a hiring manager's perspective, positioned as an optional quality gate between Step 3 (Resume Rewrite) and Step 4 (ATS Pass) in the JobHuntr application-building workflow.

### Files Created

```
prompt-library/hr-critic/
├── 00-hr-critic-standalone.md      (19 KB) Main agent framework with 5-module evaluation logic
├── README.md                       (9 KB)  Complete documentation of HR-Critic
├── INVOKE.md                       (7 KB)  Quick copy-paste invocation guide
├── WORKFLOW-INTEGRATION.md         (13 KB) Architecture and system design
├── INDEX.md                        (12 KB) Navigation guide and quick reference
└── IMPLEMENTATION-SUMMARY.md       (this file) Summary of what was built
```

### Integration Points

**Updated:** `prompt-library/tailor-resume-seq/README.md`
- Added HR-Critic to workflow sequence (between Step 3 & 4)
- Documented decision tree after HR-Critic evaluation
- Linked to HR-Critic documentation

---

## What HR-Critic Does

HR-Critic is a **five-module evaluation engine** that grades a resume on:

### Module 1: Structural Parsing Audit
Verifies the resume can be successfully parsed by modern ATS systems.
- Flags: [PARSE RISK], [HEADING RISK], [DATE RISK], [CONTACT RISK]

### Module 2: Semantic Job Matching Engine
Calculates an ATS-style match score (0-100%) by comparing resume content against must-haves, preferred, and nice-to-have qualifications from the JD.
- Weighted formula: Must-Haves (50%) + Preferred (30%) + Nice-to-Haves (20%)
- Recency weighting for technical skills
- Education and years-of-experience verification

### Module 3: STAR Narrative & Competency Audit
Evaluates work experience bullets using STAR framework (Situation, Task, Action, Result).
Maps bullets to four behavioral competencies:
- Systems Thinking (technical depth)
- Operational Ownership (accountability)
- Product Mindset (business/user focus)
- Collaboration (cross-functional effectiveness)
- Outputs: STAR scores (0-4 per bullet), competency ratings (1-5 scale)

### Module 4: Integrity & Red Flag Scan
Detects red flags:
- **Traditional:** Typos, grammar, unexplained gaps, education integrity
- **Modern AI markers:** Quantitative clichés, hidden text stuffing, template uniformity, jargon bloat
- **Authenticity:** Generic vs. specific professional language

### Module 5: Synthesis & Recommendation
Aggregates all findings into a hiring manager scorecard.
- Issues final recommendation: **STRONG YES / YES / MAYBE / NO**
- Provides prioritized optimization backlog (high → medium → low)
- Confidence level assessment

---

## Key Design Principles

### 1. **Cold, Context-Free Evaluation**
HR-Critic intentionally sees **only** the resume and job description. It does not see:
- Gap analysis notes
- Profile enrichment
- Rewrite decisions or rationale
- Any prior feedback or iterations

This isolation is intentional—hiring managers are isolated from development context.

### 2. **Hiring Manager Lens**
Replicates how senior hiring managers actually evaluate resumes:
- Non-linear eye-scanning for pattern breaks
- Behavioral storytelling vs. task lists
- Quantified outcomes vs. vague responsibilities
- Structured competency evaluation (BARS model)

### 3. **Dual-Gatekeeper Pipeline**
Two distinct evaluation lenses:
1. **ATS gatekeeper** (Module 2): Can the resume pass automated filters?
2. **Hiring manager gatekeeper** (Modules 3-5): Does it tell a compelling story of impact?

### 4. **Actionable Feedback**
Every finding comes with context and suggested fixes, not generic criticism.

### 5. **Integrity Auditing**
Detects modern AI manipulation markers (quantitative clichés, hidden text, template uniformity) and flags them explicitly.

---

## How to Use HR-Critic

### Quickest Path (2-3 minutes)

1. After Step 3 (Resume Rewrite) approval, read `INVOKE.md`
2. Copy-paste the invocation template into Claude Code
3. Paste your `Resume PreDraft.md` and job description
4. Let it run
5. Read the Executive Summary of `HR-CRITIQUE-REPORT.md`
6. Follow the decision tree

### Standard Path (10-15 minutes)

1. Read `README.md` to understand what you're about to run
2. Follow `INVOKE.md` to invoke the agent
3. Review `HR-CRITIQUE-REPORT.md` sections in order:
   - Executive Summary → Decision
   - Module 2 (ATS Match) → Understand match percentage
   - Module 3 (STAR + Competencies) → Assess narrative quality
   - Module 4 (Red Flags) → Identify blockers
   - Module 5 (Backlog) → Plan improvements
4. Apply high-priority fixes if needed
5. Proceed to Step 4 or iterate

### Deep Understanding (30+ minutes)

1. Read `WORKFLOW-INTEGRATION.md` (system architecture)
2. Read `README.md` (detailed module documentation)
3. Read `00-hr-critic-standalone.md` (evaluation logic)
4. Run HR-Critic and correlate report sections back to the agent logic

---

## Integration with Tailor-Resume Sequence

```
Step 0 (Bootstrap)
    ↓
Step 1 (Job Intelligence)
    ↓
Step 2 (Gap Analysis + Enrichment)
    ↓
Step 3 (Resume Rewrite) → Resume PreDraft.md
    ↓
[OPTIONAL] HR-CRITIC (Cold evaluation)
    │
    ├─ STRONG YES/YES → Proceed to Step 4
    ├─ MAYBE → Fix high-priority items, re-run HR-Critic
    └─ NO → Reassess fit or escalate
    ↓
Step 4 (ATS Pass) → Audited Resume.md
    ↓
Step 5 (Humanization) → Humanized Resume.md
    ↓
Step 6 (Final Output) → .md + .pdf
```

**Why separate from the sequence?**
- Steps 0-3 build context progressively (gap analysis, enrichment notes, rationale)
- HR-Critic needs to be blind to that context—like a hiring manager reviewing a cold application
- HR-Critic acts as a quality gate before technical optimization (Steps 4-6)
- Feedback is most impactful when applied to Resume PreDraft, before ATS optimization

---

## Output Files Generated

### HR-CRITIQUE-REPORT.md
A comprehensive markdown report (4-6 pages) containing:
- Executive summary with hiring recommendation
- All five module findings
- Red flag details with severity levels
- Prioritized actionable optimization backlog
- Holistic hiring manager notes

**Where saved:** `{{job_dir}}/agent_outputs/HR-CRITIQUE-REPORT.md`

### HR-CRITIQUE-SCORECARD.json
Structured scoring data for tracking and iteration:
```json
{
  "ats_match_percent": 0-100,
  "star_narrative_score": 0-5,
  "systems_thinking": 0-5,
  "operational_ownership": 0-5,
  "product_mindset": 0-5,
  "collaboration": 0-5,
  "integrity_status": "PASS|CONCERNS|CRITICAL",
  "final_recommendation": "STRONG_YES|YES|MAYBE|NO",
  "confidence_level": "HIGH|MODERATE|LOW",
  "priority_actions": [...]
}
```

**Where saved:** `{{job_dir}}/agent_outputs/HR-CRITIQUE-SCORECARD.json`

---

## Scoring Reference

### ATS Match Score (0-100%)

| Score | Interpretation | Callback Rate |
|---|---|---|
| 90-100% | Excellent Alignment | 21% |
| 75-89% | Strong Alignment | 19% |
| 60-74% | Decent Compatibility | 11% |
| 40-59% | Weak Compatibility | 6% |
| 0-39% | Poor Alignment | 3% |

**Action:** <80% = High-priority gap to address.

### STAR Narrative Score (0-5)

| Score | Meaning | Action |
|---|---|---|
| 4-5 | Outstanding | Ready for submission |
| 3.5-3.9 | Solid | Good fit |
| 3-3.4 | Meets Expectations | Acceptable |
| 2-2.9 | Below Expectations | Needs strengthening |
| 0-1.9 | Poor | Major rewrite needed |

**Action:** <3.5 = Rewrite weak bullets with STAR structure.

### Behavioral Competencies (1-5 each)

| Score | Meaning |
|---|---|
| 4-5 | Strong signals in resume |
| 3-3.9 | Adequate signals |
| 2-2.9 | Weak signals; needs more evidence |
| 0-1 | No signals detected |

**Action:** <3 = Add or strengthen bullets demonstrating that competency.

---

## Decision Tree

### Recommendation: STRONG YES / YES
✅ **Action:** Proceed to Step 4 (ATS Pass) with confidence.

**Why:** Resume scores well on hiring manager heuristics (STAR narrative strong, competencies clear, no red flags, ATS match solid).

### Recommendation: MAYBE
⚠️ **Action:** Apply HIGH PRIORITY fixes, then re-run HR-Critic.

**Why:** Actionable gaps exist (weak STAR score, missing competency signals, or minor red flags).

**Example high-priority fixes:**
- Strengthen 2-3 passive bullets with quantified results
- Add missing required keyword naturally
- Fix 1-2 typos

After fixes, re-run HR-Critic to validate improvement.

### Recommendation: NO
❌ **Action:** Reassess role fit or escalate for human review.

**Why:** Fundamental issues exist that are not easily fixed (low ATS match, passive narrative, critical red flags, integrity concerns).

**Options:**
1. Major rework of Resume PreDraft.md (loop back to Step 3)
2. Reassess if this role is a good fit for your background
3. Escalate to human review to discuss viability

---

## Example Outcomes

### Strong YES Resume
```
ATS Match: 92% (Excellent Alignment)
STAR Narrative: 4.3/5 (Outstanding)
Systems Thinking: 4.2/5
Operational Ownership: 4.5/5
Product Mindset: 4.0/5
Collaboration: 4.1/5
Integrity: PASS
Recommendation: STRONG YES
Confidence: HIGH

Hiring Manager Notes: "This resume clearly demonstrates strong technical depth 
and operational ownership. Work examples show execution at scale. Behavioral 
signals indicate someone who drives outcomes cross-functionally. Recommend 
immediate phone screen."
```

### Maybe Resume
```
ATS Match: 78% (Strong Alignment—borderline)
STAR Narrative: 3.2/5 (Needs work)
Systems Thinking: 3.5/5
Operational Ownership: 3.8/5
Product Mindset: 2.4/5 (Weak)
Collaboration: 3.1/5
Integrity: PASS
Recommendation: MAYBE
Confidence: MODERATE

High-Priority Fixes:
1. Strengthen "Product Mindset" bullets with business/user outcome examples
2. Add metrics to 2 weak bullets (currently read as responsibilities)
3. Inject missing keyword "Data Analysis" naturally into Skills section

Expected impact: ATS 78% → 84%, STAR 3.2 → 3.7, Product Mindset 2.4 → 3.2
```

### No Resume
```
ATS Match: 58% (Weak Compatibility)
STAR Narrative: 2.1/5 (Poor)
[GRAMMAR RED FLAG] (3 typos detected)
[JOB HOPPING WARNING] (4 roles in 4 years, <12mo average tenure)
Missing critical must-haves: "Python," "SQL"
Integrity: CONCERNS
Recommendation: NO
Confidence: HIGH

Blockers:
- Resume will likely not clear ATS filters (match <60%)
- Multiple grammar errors suggest carelessness
- Narrative is passive/generic (no impact quantification)
- Missing two critical required skills
```

---

## Best Practices

1. **Run HR-Critic early** — After Step 3, not just before submission
2. **Iterate multiple times** — Use scorecard to track improvement across versions
3. **Focus on high-impact items** — Prioritized backlog ranks by expected improvement
4. **Measure improvement** — Compare scorecards between iterations
5. **Keep it honest** — Don't fabricate or force keywords; HR-Critic detects inauthenticity
6. **Treat red flags seriously** — Even one typo is flagged; fix all before submitting

---

## FAQ

**Q: Is HR-Critic mandatory?**  
A: No, it's optional. But recommended after Step 3 for quality assurance.

**Q: What if I disagree with HR-Critic's feedback?**  
A: HR-Critic replicates hiring manager heuristics, not actual hiring decisions. You have final say. But it's worth considering if something you think is strong reads weak to a cold reader.

**Q: Can I run HR-Critic multiple times?**  
A: Yes! Fix issues, re-run, track improvement via scorecard. Use it as an iteration loop.

**Q: Does HR-Critic guarantee an interview?**  
A: No. High scores improve odds, but hiring is multifactorial. HR-Critic measures fit and quality, not guarantees outcomes.

**Q: Why is HR-Critic blind to my enrichment notes?**  
A: Because hiring managers are. Your enrichment notes help you develop the resume, but hiring managers only see the final text. HR-Critic simulates that perspective.

**Q: Should I share the HR-Critic report with the hiring team?**  
A: No. This is your internal evaluation file. Only submit the final resume (Step 6 output).

---

## Next Steps

1. **Review the files:**
   - Start with `INDEX.md` for navigation
   - Read `README.md` for deep understanding
   - Use `INVOKE.md` when ready to run

2. **Run HR-Critic:**
   - After Step 3 (Resume Rewrite) is approved
   - Use the template in `INVOKE.md`
   - Save outputs to `{{job_dir}}/agent_outputs/`

3. **Act on feedback:**
   - Review `HR-CRITIQUE-REPORT.md`
   - Apply HIGH PRIORITY fixes if needed
   - Re-run HR-Critic if you make changes
   - Proceed to Step 4 when satisfied

4. **Continue the workflow:**
   - Step 4 (ATS Pass) on Audited Resume
   - Step 5 (Humanization) on Optimized Resume
   - Step 6 (Final Output) for submission-ready files

---

## Contact & Support

See documentation in:
- `README.md` — Detailed module documentation
- `WORKFLOW-INTEGRATION.md` — Architecture questions
- `INVOKE.md` — How to run the agent
- `INDEX.md` — Quick reference

---

## Version & Credits

**HR-Critic Framework:** v1.0  
**Created:** 2026-07-07  
**Based on:** Research: "Algorithmic Sifting and Executive Heuristics: A Comprehensive Architectural Framework for Automated Resume Critique and Calibration"

**Key research insights incorporated:**
- ATS parsing mechanics and scoring formulas
- Hiring manager eye-tracking and heuristics
- STAR narrative framework
- Behavioral competency models (BARS)
- Red flag auditing (traditional + modern AI)
- Integrity and authenticity assessment

**Status:** Production-ready. Integrated with JobHuntr tailor-resume-seq workflow.
