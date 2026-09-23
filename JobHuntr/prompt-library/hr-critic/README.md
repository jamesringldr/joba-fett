# HR-Critic: Independent Hiring Manager Evaluation

**Purpose:** Standalone agent that evaluates a resume from a cold, hiring-manager perspective—without seeing the development context, enrichment notes, or application logic.

**Trigger:** **Mandatory gate after Step 4 (ATS Pass)**, before Humanization — it evaluates the ATS-audited resume and the sequence cannot graduate until it returns STRONG YES / YES. (It is no longer an optional post-rewrite check; the driver `RUN.md` §3 owns the position, isolation contract, and loop.)

**Scope:** This agent runs in **isolation** — a fresh subagent (Claude Code) or a new chat (Cursor), never the thread that built the resume. It's invoked with only two inputs:
1. The resume — `Audited Resume.md` (the post-ATS output of Step 4)
2. The job description

> The five-module framework below is input-agnostic and unchanged; only its position in the
> sequence (now post-ATS, mandatory, looping) and its isolation requirement changed. The
> `PreDraft.md` references in the older invocation examples below are superseded by
> `Audited Resume.md` per RUN.md.

**Why separate?** The tailor-resume sequence builds context progressively (gap analysis, enrichment notes, rewrite rationale). An external evaluator should see none of that. HR-Critic evaluates the resume exactly as a hiring manager would: cold, with no background knowledge of how or why it was written.

---

## Quick Start

### 1. After Step 3 (Rewrite) is approved, invoke HR-Critic:

```
/Claude Code:

I need an independent hiring manager critique on this resume application.
Use the HR-Critic framework.

Resume: [paste content of {{job_dir}}/agent_outputs/Resume PreDraft.md]

Job Description: [paste the original job description from the application]
```

### 2. HR-Critic will generate two files in the same `agent_outputs` directory:
- **HR-CRITIQUE-REPORT.md** — Human-readable findings + actionable improvements
- **HR-CRITIQUE-SCORECARD.json** — Structured scoring data

### 3. Review the critique and decide:
- **STRONG YES / YES** → Proceed directly to Step 4 (ATS Pass)
- **MAYBE** → Use optimization backlog suggestions to revise Resume PreDraft.md, then re-run HR-Critic
- **NO** → Consider substantial rework or role fit reassessment

---

## The Five Evaluation Modules

HR-Critic executes a sequential five-module evaluation:

### Module 1: Structural & Parsing Audit
Checks layout complexity, standard headings, contact info placement, date formats, chronology.  
**Output:** Parse risk flags or PASS.

### Module 2: Semantic Job Matching Engine
Extracts must-haves, preferred, and nice-to-haves from the JD.  
Calculates ATS-style match score using weighted formula.  
Checks years of experience, education fit, recency weighting.  
**Output:** ATS Match Score (0-100%) + interpretation.

### Module 3: STAR Narrative & Competency Audit
Evaluates each work experience bullet on STAR framework (Situation, Task, Action, Result).  
Maps bullets to four core competencies: Systems Thinking, Operational Ownership, Product Mindset, Collaboration.  
Identifies passive language, quantifiable results, leadership signals.  
**Output:** STAR scorecard + behavioral competency ratings (1-5 scale).

### Module 4: Integrity & Red Flag Scan
Checks for grammar/typos, career gaps, job hopping, education integrity.  
Scans for modern AI manipulation markers: metric clichés, hidden keyword stuffing, template uniformity, jargon bloat.  
Evaluates authenticity vs. generic template language.  
**Output:** Red flag summary + integrity assessment.

### Module 5: Synthesis & Hiring Recommendation
Aggregates all four modules into a single hiring manager scorecard.  
Issues final recommendation: STRONG YES / YES / MAYBE / NO.  
Provides prioritized optimization backlog (high → low impact fixes).  
Confidence level assessment.  
**Output:** Executive summary + actionable backlog.

---

## Expected Outputs

### HR-CRITIQUE-REPORT.md
A 4-6 page markdown report containing:
- Executive summary + hiring recommendation
- Structural audit findings
- Semantic match score + scorecard
- STAR narrative audit table + competency scores
- Integrity & red flag section
- Prioritized optimization backlog
- Holistic hiring manager notes

### HR-CRITIQUE-SCORECARD.json
Structured scoring data:
```json
{
  "metadata": {...},
  "scores": {
    "ats_match_percent": 0-100,
    "star_narrative_score": 0-5,
    "systems_thinking": 0-5,
    "operational_ownership": 0-5,
    "product_mindset": 0-5,
    "collaboration": 0-5,
    "integrity_status": "PASS|CONCERNS|CRITICAL"
  },
  "final_recommendation": "STRONG_YES|YES|MAYBE|NO",
  "confidence_level": "HIGH|MODERATE|LOW",
  "priority_actions": [...]
}
```

---

## Integration with Tailor-Resume Sequence

The tailor-resume sequence flow with HR-Critic inserted:

```
Step 0: Bootstrap
   ↓
Step 1: Job Intelligence Brief
   ↓
Step 2: Gap Analysis
   ↓
Step 3: Resume Rewrite → Resume PreDraft.md
   ↓
[Optional] HR-CRITIC (independent, isolated context)
   ↓ (if critique is favorable or improved)
Step 4: ATS Pass → Audited Resume.md
   ↓
Step 5: Humanization → Humanized Resume.md
   ↓
Step 6: Final Output → .md + .pdf in final_files_dir
```

**Decision tree after HR-Critic:**
- Critique recommendation is **STRONG YES/YES**? → Proceed to Step 4.
- Critique recommendation is **MAYBE**? → Apply high-priority fixes from optimization backlog to Resume PreDraft.md, re-run HR-Critic.
- Critique recommendation is **NO**? → Reassess role fit, consider major rewrites, or escalate for human review.

---

## Key Design Principles

1. **Cold evaluation:** HR-Critic sees only the resume and JD. It does not see:
   - Gap analysis notes
   - Profile enrichment
   - Rewrite rationale
   - Prior feedback or iterations
   - Any context about how the resume was developed

2. **Hiring manager lens:** The evaluation replicates how senior hiring managers actually assess resumes—pattern breaks, behavioral storytelling, quantified outcomes, team fit signals.

3. **Dual-gatekeeper model:** 
   - First gate (Module 2): ATS match score—can the resume pass automated filtering?
   - Second gate (Modules 3-5): Hiring manager heuristics—does the resume tell a compelling story of impact and fit?

4. **Actionable feedback:** Every finding comes with a suggested fix. Candidates aren't told "this is weak"—they're told "change X to Y because [reason]."

5. **Integrity auditing:** Modern AI manipulation is detected and flagged (quantitative clichés, hidden text, template uniformity, jargon bloat).

---

## Philosophical Foundation

This agent is based on deep research into **how hiring managers actually evaluate resumes**:

- **Algorithmic Sifting**: Modern ATS systems use weighted keyword matching, years-of-experience parsing, and education verification.
- **Executive Heuristics**: Hiring managers use non-linear eye-tracking, pattern break detection, and behavioral competency models.
- **STAR Framework**: Effective resumes structure bullets as mini-case studies (Situation → Task → Action → Result), not passive task lists.
- **Red Flag Auditing**: Both traditional red flags (typos, gaps, clichés) and modern AI markers (metric clichés, template uniformity, hidden keyword stuffing).
- **Behavioral Anchoring**: Core competencies (Systems Thinking, Operational Ownership, Product Mindset, Collaboration) are used in calibrated hiring manager roundups to assess fit.

HR-Critic turns these subjective heuristics into structured, programmatic evaluation.

---

## Example Recommendation Outcomes

### STRONG YES
> ATS match 92%, STAR narrative 4.3/5, all competencies 4+, zero red flags.  
> "This resume clearly demonstrates strong technical depth and operational ownership. Behavioral signals show someone who drives outcomes cross-functionally. Recommend immediate phone screen."

### YES
> ATS match 85%, STAR narrative 3.8/5, mixed competencies (Ops Owner 4, Product Mindset 2.5).  
> "Solid alignment on required skills and experience. Work examples show execution capability but lack strategic/product perspective. Recommend screening call to explore product thinking depth."

### MAYBE
> ATS match 72%, STAR narrative 2.9/5, weak behavioral signals.  
> "Covers most required qualifications but passive narrative voice, weak quantified results. High-priority fixes: strengthen 4 bullets with specific metrics, clarify team leadership scope. Resubmit after revisions."

### NO
> ATS match 55%, STAR narrative 1.8/5, grammar errors, job-hopping pattern.  
> "Missing critical must-have skills (Python, SQL). Resume reads generic. Multiple typos + unexplained 18-month employment gap. Not recommended for this role."

---

## Notes for Implementation

- HR-Critic should be **offered to the candidate** after Step 3 is approved, but it's optional.
- It's designed to catch issues **before** the technical ATS pass (Step 4), so feedback is most valuable when applied to Resume PreDraft.md.
- Multiple iterations of HR-Critic on different versions of the same resume are encouraged.
- HR-Critic does not modify the resume—it only evaluates and recommends. Candidates choose whether to act on suggestions.
- The optimization backlog is prioritized by expected ATS impact; candidates can choose to address high-priority items before re-running.

---

## For Future Expansion

Potential enhancements (not in v1):
- Industry-specific competency models (tech vs. consulting vs. operations)
- Competitor comparison mode (how does this resume compare to typical profiles for this role?)
- Interview preparation bridge (map resume bullets to likely behavioral interview questions)
- Real-time ATS simulation against specific company systems (Greenhouse, Lever, Workday)
