# HR-Critic: Workflow Integration & Architecture

## System Architecture

The JobHuntr application-building workflow is divided into **two distinct phases**:

### Phase 1: Development (Sequential, Context-Aware)
**Steps 0-3:** The `/tailor-resume-seq` sequence builds the resume with progressive context enrichment.

```
Step 0: Bootstrap
   │ (Initialize workspace, save JD, confirm paths)
   │
Step 1: Job Intelligence
   │ (Research company/role, extract keywords, identify gaps)
   │
Step 2: Gap Analysis
   │ (Assess fit, enrich profile notes conversationally)
   │
Step 3: Resume Rewrite
   │ (Tailor to role using master profile + intel + enrichment)
   │ OUTPUT: Resume PreDraft.md
   │
```

**Characteristic:** These steps are **sequential and context-dependent**. Each step references prior outputs. The candidate sees their own enrichment notes, gap analysis reasoning, and editing rationale.

---

### Phase 2: Quality Assurance & Optimization (Parallel, Context-Isolated)

After Step 3, the resume enters a **quality assurance phase** where multiple evaluation lenses are applied. HR-Critic is the **first quality gate**, evaluated in isolation.

```
                ┌─── HR-CRITIC (OPTIONAL) ───┐
                │ (Cold, context-free eval)   │
                │ INPUT: Resume + JD Only     │
                │ OUTPUT: Critique Report +   │
                │         Scorecard           │
                │                             │
Resume PreDraft.md                            │
   │                    ┌──────────────────────┘
   │                    │ (PASS / iterate / reassess)
   │                    ↓
   └──→ Step 4: ATS Pass
            │ (Optimize for parsing + keywords)
            │ OUTPUT: Audited Resume.md
            │
            ↓
         Step 5: Humanization
            │ (Remove LLM fingerprints, preserve ATS)
            │ OUTPUT: Humanized Resume.md
            │
            ↓
         Step 6: Final Output
            │ (Clean markdown + PDF)
            │ OUTPUT: Resume - {{Company}}.md/pdf
            │         (ready to submit)
```

**Characteristic:** HR-Critic is **parallel and context-isolated**. It sees only the resume and JD, intentionally blind to enrichment notes, gap analysis, or editing choices. This isolation is a feature, not a bug—it replicates how a hiring manager evaluates a cold application.

---

## Design Rationale: Why HR-Critic is Separate

### The Problem It Solves

During Steps 0-3, the candidate and Claude build context together:
- Gap analysis highlights what the candidate wants the hiring manager to know
- Enrichment notes frame experiences in favorable light
- Rewrite decisions are made with knowledge of why the candidate took certain paths

**This is excellent for developing a strong resume.** But it creates a blind spot: **Does the resume actually read as compelling to a hiring manager who sees it cold?**

A hiring manager doesn't know:
- That you struggled with imposter syndrome on a project (hence the careful framing)
- That you intentionally downplayed a role because it wasn't relevant
- That you chose to highlight collaboration over technical depth because the JD emphasized teamwork

A hiring manager only sees **the words on the page**.

### Why Separation Matters

HR-Critic is isolated from the development context because hiring managers are isolated from it. By evaluating the resume without seeing prior reasoning:

1. **HR-Critic catches gaps that narrative framing hid.** If a bullet feels weak despite your best intentions, HR-Critic will surface it before submission.

2. **HR-Critic audits for authenticity.** It detects when resume language diverges from real professional experience (AI clichés, template uniformity, hidden keyword stuffing).

3. **HR-Critic gives you a hiring manager's first impression.** Not your second-best interpretation of the resume, but how it actually reads to a stranger.

4. **HR-Critic is optional, iterative.** You can run it multiple times on different versions, treating it as a feedback loop **before** technical optimization passes.

---

## Decision Gate: After HR-Critic

After receiving HR-Critic's evaluation, the candidate makes a decision:

### Path A: Recommendation is STRONG YES / YES
```
HR-Critic Scorecard:
  ✓ ATS Match 85%+
  ✓ STAR Narrative 3.8+/5
  ✓ Behavioral competencies 3.5+/5
  ✓ Integrity PASS

→ Resume is strong from hiring manager lens
→ Proceed to Step 4 (ATS Pass) with confidence
```

### Path B: Recommendation is MAYBE
```
HR-Critic Scorecard:
  ⚠ ATS Match 75% (borderline)
  ⚠ STAR Narrative 3.2/5 (bullets need impact)
  ⚠ Product Mindset 2.5/5 (missing business focus)
  ✓ Integrity PASS

→ Actionable gaps identified
→ Apply HIGH PRIORITY fixes to Resume PreDraft.md
→ Re-run HR-Critic on updated version
→ Iterate until recommendation improves
```

### Path C: Recommendation is NO
```
HR-Critic Scorecard:
  ✗ ATS Match 58% (will likely filter out)
  ✗ STAR Narrative 2.1/5 (very passive)
  ✗ Multiple [GRAMMAR RED FLAG]
  ✗ Missing critical must-haves

→ Resume has fundamental issues
→ Options:
   a) Escalate to human review (is role fit viable?)
   b) Loop back to Step 3 (major rewrite)
   c) Reassess if this is the right application to pursue
```

---

## Interaction with Subsequent Steps

### Step 4 (ATS Pass) Relationship

**Before HR-Critic:**
- ATS Pass receives Resume PreDraft.md directly from Step 3
- ATS Pass optimizes for parsing + keywords, but may not catch narrative weaknesses
- Risk: A resume that passes ATS filters might still fail hiring manager review

**With HR-Critic:**
- ATS Pass receives a resume that has already passed hiring manager scrutiny
- ATS Pass focuses purely on technical optimization (keyword placement, date formats, parse risks)
- Benefit: Resume is strong on both dimensions (hiring manager + ATS) before final submission

---

### Step 5 (Humanization) Relationship

**Before HR-Critic:**
- Humanization strips LLM fingerprints from an untested draft
- Risk: What if the stripped version loses critical hiring manager signals?

**With HR-Critic:**
- Humanization receives validated behavioral competency signals and narrative structure
- Humanization knows exactly what signals to preserve while removing AI fingerprints
- Benefit: Humanization is informed by what hiring managers care about, not guessing

---

## Technical Integration

### File Structure

```
{{job_dir}}/
├── agent_outputs/
│   ├── Job Recon.md                    (Step 1)
│   ├── Gap Analysis.md                 (Step 2)
│   ├── Profile Enrichment.md           (Step 2)
│   ├── Resume PreDraft.md              (Step 3)
│   ├── [HR-CRITIQUE-REPORT.md]         (HR-Critic, optional)
│   ├── [HR-CRITIQUE-SCORECARD.json]    (HR-Critic, optional)
│   ├── Audited Resume.md               (Step 4)
│   ├── ATS Audit.md                    (Step 4)
│   ├── Humanized Resume.md             (Step 5)
│   └── Humanize Audit.md               (Step 5)
└── final_files/
    ├── James Oehring Resume - {{Company}}.md  (Step 6)
    └── James Oehring Resume - {{Company}}.pdf (Step 6)
```

**Key point:** HR-Critic outputs are in `agent_outputs/`, same directory as all intermediate artifacts. They are **not** part of the final submission—they're working files for the candidate's evaluation.

---

### State Management

| Step | Input Files | Action | Output Files | Candidate Sees | Next Step |
|---|---|---|---|---|---|
| 3 | master_profile, Job Recon, Gap Analysis, Enrichment | Write resume | Resume PreDraft.md | Asks for approval | Proceed or HR-Critic? |
| **HR-Critic** | **Resume PreDraft, JD** | **Evaluate cold** | **HR-CRITIQUE-REPORT, SCORECARD** | **Hire recommendation + gaps** | **Loop or Step 4?** |
| 4 | Resume PreDraft.md, Job Recon | Optimize ATS | Audited Resume.md, ATS Audit.md | Asks for approval | Step 5 |
| 5 | Audited Resume, ATS Audit, Enrichment | Humanize | Humanized Resume.md | Asks for approval | Step 6 |
| 6 | Humanized Resume | Render PDF | .md + .pdf in final_files | Ready to submit | DONE |

---

## Detailed Workflow Diagram

```
START: Job moves to "working"
│
├─→ Step 0: Bootstrap
│   INPUT: JD text, job title, company name
│   PROCESS: Setup workspace, confirm paths
│   OUTPUT: Confirmed workspace structure
│   CANDIDATE SEES: "Workspace ready"
│   DECISION: Proceed?
│
├─→ Step 1: Job Intelligence
│   INPUT: JD + master profile
│   PROCESS: Research company, extract keywords
│   OUTPUT: Job Recon.md, Job Recon Fields.json
│   CANDIDATE SEES: Role analysis + keyword insights
│   DECISION: Accurate assessment?
│
├─→ Step 2: Gap Analysis
│   INPUT: Job Recon, master profile
│   PROCESS: Conversational enrichment + gap mapping
│   OUTPUT: Gap Analysis.md, Profile Enrichment.md
│   CANDIDATE SEES: What to emphasize, context about experiences
│   DECISION: Ready to rewrite?
│
├─→ Step 3: Resume Rewrite
│   INPUT: Master profile + Job Recon + Gap Analysis + Enrichment
│   PROCESS: Tailor resume using all prior context
│   OUTPUT: Resume PreDraft.md
│   CANDIDATE SEES: Fresh tailored draft
│   DECISION: ┌─→ Approved? → Step 4 (ATS Pass)
│             └─→ Want HR-Critic first? → HR-Critic Gate
│
├─→ [OPTIONAL] HR-CRITIC GATE
│   INPUT: Resume PreDraft.md, JD (ONLY)
│   PROCESS: Cold hiring manager evaluation (5 modules)
│   OUTPUT: HR-CRITIQUE-REPORT.md, HR-CRITIQUE-SCORECARD.json
│   CANDIDATE SEES: Hiring manager perspective + priority actions
│   DECISION: ├─→ STRONG YES / YES? → Step 4 (ATS Pass)
│             ├─→ MAYBE? → Fix high-priority items, re-run HR-Critic
│             └─→ NO? → Reassess role fit or escalate
│
├─→ Step 4: ATS Pass
│   INPUT: Resume PreDraft.md (or updated version), Job Recon
│   PROCESS: Parse simulation + keyword gap + optimization
│   OUTPUT: Audited Resume.md, ATS Audit.md
│   CANDIDATE SEES: Parse risks fixed, keywords optimized, new ATS score
│   DECISION: Authentic feel OK?
│
├─→ Step 5: Humanization
│   INPUT: Audited Resume, ATS Audit, Enrichment
│   PROCESS: Strip LLM fingerprints while preserving signals
│   OUTPUT: Humanized Resume.md, Humanize Audit.md
│   CANDIDATE SEES: Natural-sounding version with ATS intact
│   DECISION: Ready for final output?
│
├─→ Step 6: Final Output
│   INPUT: Humanized Resume.md
│   PROCESS: Render clean markdown + PDF via LaTeX
│   OUTPUT: .md + .pdf in final_files/
│   CANDIDATE SEES: Download-ready files
│   DECISION: Submit application!
│
└─→ END: Application submitted
```

---

## Why This Architecture Matters

### For Candidates

1. **Early feedback from a hiring manager perspective** — before technical optimization
2. **Iterate with confidence** — multiple runs of HR-Critic show improvement
3. **Catch blind spots** — issues that careful editing hides become visible
4. **Understand hiring manager criteria** — HR-Critic explains **why** something is weak
5. **Optional flexibility** — HR-Critic is a gate you can use or skip

### For the Tailor-Resume Workflow

1. **Separates concerns** — Development (Steps 0-3) vs. Evaluation (HR-Critic) vs. Optimization (Steps 4-6)
2. **Improves quality** — Resume passes both hiring manager AND ATS evaluation
3. **Reduces iteration cost** — Fix narrative issues before ATS optimization, not after
4. **Maintains context integrity** — HR-Critic intentionally ignores prior reasoning, just like hiring managers do

---

## Future Enhancements

Potential extensions (not in v1):

- **Industry-specific models** — Tailor competency evaluation to tech vs. consulting vs. operations
- **Competitor analysis** — Compare your resume to typical profiles for this role
- **Interview prep bridge** — Map resume bullets to likely behavioral interview questions
- **Real ATS simulation** — Connect to actual Greenhouse/Lever/Workday scoring engines
- **Feedback aggregation** — Track HR-Critic scores across applications to identify patterns
- **A/B testing** — Compare two versions of Resume PreDraft to see which scores higher

---

## Summary

HR-Critic is a **quality gate positioned strategically between resume development and technical optimization**. It evaluates resumes as hiring managers actually do—cold, without context, using behavioral and narrative heuristics. By running it after Step 3, candidates get hiring manager feedback early, iterate with confidence, and ensure their resume is strong on both dimensions before final submission.

The key insight: **The same resume that impresses a careful editor might underwhelm a hiring manager scanning in seconds.** HR-Critic surfaces that gap before it costs you an interview.
