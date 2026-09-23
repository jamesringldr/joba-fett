# HR-Critic Framework: Complete Index

## Quick Links

| Document | Purpose | Read When |
|---|---|---|
| **00-hr-critic-standalone.md** | The agent framework itself | You're implementing HR-Critic; contains 5-module evaluation logic |
| **README.md** | Complete documentation | You want deep understanding of what HR-Critic does and why |
| **INVOKE.md** | Quick copy-paste guide | You're ready to run HR-Critic on your resume |
| **WORKFLOW-INTEGRATION.md** | Architecture & flow | You want to understand how HR-Critic fits into tailor-resume-seq |
| **INDEX.md** | This file | You're navigating the framework |

---

## The HR-Critic Framework at a Glance

**What:** An independent hiring manager evaluation of a resume against a job description.

**When:** After Step 3 (Resume Rewrite) in `/tailor-resume-seq`, before Step 4 (ATS Pass).

**Inputs:** 
- Resume text (typically `Resume PreDraft.md`)
- Job description text

**Outputs:**
- `HR-CRITIQUE-REPORT.md` — Human-readable findings + actionable improvements
- `HR-CRITIQUE-SCORECARD.json` — Structured scoring for tracking

**Key insight:** HR-Critic intentionally ignores all prior context (enrichment notes, gap analysis, editing rationale). It evaluates the resume as a hiring manager would—cold, with no background knowledge.

---

## Five-Module Evaluation

### Module 1: Structural Parsing Audit
Checks layout complexity, standard headings, contact placement, date formats, chronology.  
**Risk flags:** [PARSE RISK], [HEADING RISK], [DATE RISK], [CONTACT RISK]

### Module 2: Semantic Job Matching
Extracts must-haves/preferred/nice-to-haves from JD.  
Calculates ATS-style match score (0-100%).  
Checks years of experience, education fit, recency weighting.  
**Output:** ATS Match Score + interpretation band (0-39% to 90-100%)

### Module 3: STAR Narrative & Competency Audit
Evaluates work bullets on STAR framework (Situation, Task, Action, Result).  
Maps bullets to four behavioral competencies:
- Systems Thinking (technical depth)
- Operational Ownership (accountability & outcomes)
- Product Mindset (business/user focus)
- Collaboration (cross-functional effectiveness)

**Output:** STAR scorecard (0-4 per bullet) + competency ratings (1-5 scale)

### Module 4: Integrity & Red Flag Scan
Traditional red flags: typos, career gaps, job hopping, education integrity.  
Modern AI markers: metric clichés, hidden text stuffing, template uniformity, jargon bloat.  
Authenticity check: generic vs. specific professional detail.

**Risk flags:** [GRAMMAR RED FLAG], [JOB HOPPING WARNING], [METRIC CLICHE], [TEMPLATE UNIFORMITY], [AUTHENTICITY CONCERN]

### Module 5: Synthesis & Recommendation
Aggregates all four modules into a single hiring manager scorecard.  
Issues final recommendation: **STRONG YES / YES / MAYBE / NO**  
Provides prioritized optimization backlog (high → medium → low impact).  
Confidence level assessment: HIGH / MODERATE / LOW

---

## Decision Tree

```
After HR-Critic evaluation, choose:

STRONG YES / YES
  └─ Resume is strong from hiring manager lens
     └─ Proceed to Step 4 (ATS Pass)

MAYBE
  └─ Actionable gaps identified
     └─ Apply HIGH PRIORITY fixes to Resume PreDraft.md
        └─ Re-run HR-Critic
           └─ Iterate until recommendation improves

NO
  └─ Fundamental issues detected
     └─ Either:
        a) Major rework (loop back to Step 3)
        b) Reassess role fit
        c) Escalate to human review
```

---

## How to Use HR-Critic

### Quickest Path (2 minutes)

1. Read **INVOKE.md** (copy-paste section)
2. Paste template into Claude Code
3. Paste your `Resume PreDraft.md` + JD
4. Let it run
5. Read **HR-CRITIQUE-REPORT.md** Executive Summary
6. Follow decision tree

### Standard Path (10 minutes)

1. Read **README.md** (understand what you're about to run)
2. Follow **INVOKE.md** to invoke the agent
3. Review **HR-CRITIQUE-REPORT.md** sections:
   - Executive Summary
   - Module 2 (ATS Match)
   - Module 3 (STAR scores & competencies)
   - Module 4 (Red flags)
   - Module 5 (Actionable backlog)
4. Act on HIGH PRIORITY items if needed
5. Decide: Proceed to Step 4, or iterate?

### Deep Understanding Path (30 minutes)

1. Read **WORKFLOW-INTEGRATION.md** (understand architecture)
2. Read **README.md** (understand each module)
3. Read **00-hr-critic-standalone.md** (understand evaluation logic)
4. Run HR-Critic on a resume
5. Correlate report sections back to the agent logic

---

## Key Scores Explained

### ATS Match Score (0-100%)

What it means: Will your resume pass automated filtering?

| Score | Interpretation | Callback Rate |
|---|---|---|
| 90-100% | Excellent Alignment | 21% |
| 75-89% | Strong Alignment | 19% |
| 60-74% | Decent Compatibility | 11% |
| 40-59% | Weak Compatibility | 6% |
| 0-39% | Poor Alignment | 3% |

**Action:** Score <80%? High-priority gap to close before submitting.

### STAR Narrative Score (0-5)

What it means: How well do your work bullets demonstrate impact and ownership?

| Score | Interpretation | Action |
|---|---|---|
| 4-5 | Outstanding | Ready for submission |
| 3.5-3.9 | Solid | Good fit |
| 3-3.4 | Meets Expectations | Acceptable, could improve |
| 2-2.9 | Below Expectations | Needs work; bullets are passive |
| 0-1.9 | Poor Fit | Major rewrite needed |

**Action:** Score <3.5? Rewrite weak bullets using STAR structure (Situation → Task → Action → Result).

### Behavioral Competency Scores (1-5 each)

What they mean: Do your work examples signal these four hiring manager priorities?

- **Systems Thinking:** Do you demonstrate architectural thinking, trade-off analysis, and technical depth?
- **Operational Ownership:** Do you show personal accountability, drive outcomes, handle ambiguity?
- **Product Mindset:** Do you connect technical output to business/user outcomes and strategic trade-offs?
- **Collaboration:** Do you work effectively cross-functionally, resolve conflict, build coalitions?

**Action:** Any competency <3? Add or strengthen bullets that signal that competency.

### Integrity Status

- **PASS:** No red flags detected. Resume is honest, specific, authentic.
- **CONCERNS:** Minor issues (1-2 typos, slight template uniformity) that should be fixed.
- **CRITICAL:** Dealbreaker issues (grammar errors, AI clichés, missing required education) that disqualify.

**Action:** Any status other than PASS? Address before submitting.

---

## Red Flags Explained

### Critical (Deal-Killers)
- Missing required education/certification
- Typos or grammar errors (even one is red flag)
- Education integrity issues (degree incomplete but listed as complete)

### High Priority
- Multiple typos (pattern of carelessness)
- Excessive metric clichés (all bullets claim "30% improvement")
- Hidden text stuffing (AI manipulation attempt)
- Unexplained 6+ month employment gaps

### Medium Priority
- Job hopping pattern (3+ jobs in 5 years, <18 month average tenure)
- Jargon bloat (proprietary acronyms without spelling out)
- Template uniformity (all bullets identical structure)
- Inconsistent contact information

### Low Priority
- Authenticity concerns (generic language vs. specific details)
- Minor career gap (<3 months)

---

## Common Scenarios & Actions

### Scenario A: ATS Match 92%, STAR 4.2/5, Integrity PASS
**HR-Critic says:** STRONG YES  
**Your action:** Go to Step 4 (ATS Pass) with confidence

### Scenario B: ATS Match 78%, STAR 3.0/5, Integrity PASS
**HR-Critic says:** MAYBE  
**Your action:** 
1. Find bullets with weak STAR scores (missing Result)
2. Rewrite 2-3 weak bullets with quantified outcomes
3. Re-run HR-Critic
4. Check if ATS + STAR improve; if so, proceed to Step 4

### Scenario C: ATS Match 62%, STAR 2.5/5, [GRAMMAR RED FLAG]
**HR-Critic says:** MAYBE with concerns  
**Your action:**
1. Fix all typos (critical)
2. Identify 3 weakest STAR bullets
3. Rewrite with ownership language (action verbs like "Spearheaded," "Championed")
4. Add missing required keywords naturally
5. Re-run HR-Critic

### Scenario D: ATS Match 45%, STAR 1.8/5, [TEMPLATE UNIFORMITY], multiple [METRIC CLICHE]
**HR-Critic says:** NO  
**Your action:**
- Either: Major rework of Resume PreDraft.md (loop back to Step 3)
- Or: Reassess if this role is good fit for your background
- Or: Escalate for human review to discuss viability

---

## Interpreting the Report

### Executive Summary (Read First)
```
Recommendation: [STRONG YES / YES / MAYBE / NO]
Confidence Level: [HIGH / MODERATE / LOW]
Critical Actions Before Resubmission: [Top 1-3 items]
```
**Decision:** Should you proceed or iterate?

### Module Sections (Read in Order)

1. **Module 1: Structural & Parsing Audit**
   - **If you see any [RISK] flags:** Fix layout/formatting/dates immediately.

2. **Module 2: Semantic Job Matching**
   - **Look for:** Overall ATS Match Score
   - **If <80%:** Identify missing must-haves in the scorecard; add naturally to resume.

3. **Module 3: STAR Narrative & Competency Audit**
   - **Look for:** STAR scores per bullet + Competency ratings
   - **If STAR <3.5:** Flag which bullets are weak; plan rewrites.
   - **If any competency <3:** Add bullets that signal that competency.

4. **Module 4: Integrity & Red Flags**
   - **If you see [CRITICAL] flags:** Fix immediately (typos, missing education, gaps).
   - **If you see [HIGH] flags:** Address before submitting.
   - **If you see [MEDIUM] flags:** Polish if time allows.

5. **Module 5: Actionable Optimization Backlog**
   - **Read in priority order:** HIGH → MEDIUM → LOW
   - **For each item:** Apply fix to Resume PreDraft.md
   - **After fixes:** Optionally re-run HR-Critic to validate improvement

---

## FAQ

**Q: Can I skip HR-Critic and go straight to Step 4?**  
A: Yes, it's optional. But HR-Critic catches hiring manager blind spots that ATS optimization alone won't fix. Recommended to run at least once.

**Q: Should I run HR-Critic multiple times?**  
A: Yes! Use it as an iteration loop. Fix high-priority items, re-run, track improvement via scorecard.

**Q: What if HR-Critic's feedback contradicts my enrichment notes?**  
A: That's the point. HR-Critic sees your resume cold, like a hiring manager. If something that seemed important in your enrichment notes doesn't show up in the resume text, HR-Critic will flag it.

**Q: Does a high HR-Critic score guarantee an interview?**  
A: No. HR-Critic measures fit and quality. Hiring also involves luck, timing, recruiter priorities, and other candidates. But high scores improve your odds significantly.

**Q: Can I share my HR-CRITIQUE-REPORT with the hiring team?**  
A: No. This is for your internal evaluation only. It's a working file, not part of your submission.

**Q: What does "Cold, context-free evaluation" mean?**  
A: HR-Critic intentionally doesn't see your gap analysis, enrichment notes, or rewrite rationale. It evaluates the resume exactly as a hiring manager would—seeing only the resume text and the job description. This blindness is intentional.

---

## Files in This Directory

```
hr-critic/
├── INDEX.md                        ← You are here
├── 00-hr-critic-standalone.md      ← The agent framework (5 modules)
├── README.md                       ← Detailed documentation
├── INVOKE.md                       ← Quick copy-paste guide
└── WORKFLOW-INTEGRATION.md         ← Architecture & system design
```

---

## Related Documents

| Document | Location | Purpose |
|---|---|---|
| Main workflow README | `../tailor-resume-seq/README.md` | Shows how HR-Critic fits into Steps 0-6 |
| ATS Pass (Step 4) | `../tailor-resume-seq/04-ats-pass.md` | Next step after HR-Critic |
| Resume Rewrite (Step 3) | `../tailor-resume-seq/03-rewrite.md` | Produces Resume PreDraft.md (input to HR-Critic) |

---

## Summary

**HR-Critic is a structured quality gate that evaluates resumes from a hiring manager's perspective.** It operates in five sequential modules (Parsing → Semantic Matching → STAR Narrative → Integrity → Synthesis), produces actionable feedback, and helps candidates iterate before final submission.

**Start here:** Read this file, then **INVOKE.md** to run the agent.

**Go deeper:** Read **README.md** for detailed module documentation or **WORKFLOW-INTEGRATION.md** for system architecture.

**Implement:** Follow **00-hr-critic-standalone.md** if you're extending or customizing the framework.

---

## Version Information

- **HR-Critic Framework:** v1
- **Based on:** "Algorithmic Sifting and Executive Heuristics" research
- **Last updated:** 2026-07-07
- **Status:** Ready for production use

---

## Questions or Feedback?

See **README.md** for detailed explanations of each evaluation module, scoring methodology, and design philosophy.
