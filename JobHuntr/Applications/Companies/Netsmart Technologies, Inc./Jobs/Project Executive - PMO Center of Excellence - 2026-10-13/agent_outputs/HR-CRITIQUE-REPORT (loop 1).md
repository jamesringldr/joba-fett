# HR Manager Critique: James Oehring → Project Executive – PMO Center of Excellence (Netsmart, R015863)

**Evaluation Date:** 2026-10-13
_Loop 1 of 3 · isolated cold read (inputs: Audited Resume.md as of the PMP-initiated revision + Job Description.md only)_

---

## EXECUTIVE SUMMARY

As submitted, this application would not clear screening. The JD says PMP certification is "required", and the resume admits it is only "initiated". The scheduling and PMO evidence the role depends on is mostly a skills list, with few outcome-bearing bullets. The strongest evidence is one metric-backed framework at ringldr and Netsmart schedule work that is now 8+ years old. The Vanyshr section reads as a different career.

**Recommendation:** NO (as submitted; fixable to MAYBE)
**Confidence Level:** MODERATE
**Critical Actions Before Resubmission:**
1. Resolve the PMP gap. Either hold the cert or remove the "initiated; committed to acquiring" language, which advertises a missed hard requirement. Add an exam date if it is scheduled.
2. Replace keyword-only claims (EVM, schedule audits, MS Project/P6/Smartsheet/PSA, training) with dated, quantified bullets in the roles where they happened.
3. Clear up the timeline and attribution problems: concurrent roles, and 22%/18% metrics that appear to be borrowed across employers. Cut or compress Vanyshr.

---

## MODULE 1: Structural & Parsing Audit

Layout is single-column markdown with pipe-delimited skills. It parses cleanly. Contact details are in the top block (email, phone, location, LinkedIn).

- **[HEADING RISK] (low):** "Professional Experience" is used instead of the canonical "Work Experience". Most ATS parsers accept it. Switch anyway for zero risk.
- **[DATE RISK]:** Date formats are inconsistent. Vanyshr uses "2024 – Present" (year only). The other roles use "Month YYYY". Netsmart uses "June 2014 – June 2018". Standardize on Month YYYY.
- **[CHRONOLOGY RISK]:** Ordering is by start date, not end date. ringldr (2018–Present) sits above Cornerstones (2019–2022), which sits above GEHA (2018–2019), and all three start in or after June 2018. GEHA and ringldr both start June 2018, the month Netsmart ends. A parser will read overlapping tenures. Overlap is not explained anywhere.
- **[CONTACT RISK] (none):** Contact info is present and consistent.

Parsing audit: PASS with 3 minor risks (heading, date, chronology).

---

## MODULE 2: Semantic Job Matching

**JD segmentation**

- Must-Haves: 10 bullets under "Required".
- Preferred: 5 bullets under "Preferred".
- Nice-to-Haves: none labeled. I treated the 6 "What Success Looks Like" outcomes as the nice-to-have tier.

**Requirement mapping (partial credit shown)**

| # | Must-Have | Status | Evidence / Note |
|---|---|---|---|
| 1 | Bachelor's in Business/PM/Eng/IS/related | MISS (0) | BS in Psychology/Sociology and an MSW. Neither is a listed or obviously related field. A recruiter may waive it; an ATS will not. |
| 2 | PMP certification (required) | MISS (0) | "initiated; committed to acquiring immediately". This is not a PMP. |
| 3 | 10+ yrs managing detailed master schedules | PARTIAL (0.5) | Dates span 12 years. Schedule-specific work is documented only at Netsmart (2014–2018, 4 yrs). Cornerstones was IT leadership. GEHA was migration/Agile delivery. ringldr is advisory. |
| 4 | Deep expertise in scheduling methodology, controls, portfolio planning | MATCH (1) | Keyword-level in Skills and Summary. Thin narrative proof. |
| 5 | Developing and governing scheduling standards | MATCH (1) | Netsmart master schedules; ringldr templates. |
| 6 | PMI, EVM, % complete, critical path, resource forecasting, dependencies, schedule risk analysis | PARTIAL (0.5) | EVM, % complete, critical path appear only in Skills. "Dependencies, risks, resource constraints, critical path" appears in one Netsmart bullet. Schedule risk analysis is absent. |
| 7 | Proven PMO governance/audit/CoE leadership | PARTIAL (0.5) | ringldr framework and "governance" claims. No bullet describes conducting audits or standing up a CoE. |
| 8 | Partnering with execs to improve forecasting/visibility | MATCH (1) | ringldr (C-suite, forecasting accuracy). Vague on outcome. |
| 9 | Analytical, communication, facilitation, training, stakeholder mgmt | MATCH (1) | "PM Training & Coaching" is in Skills and Summary. No bullet shows training delivered. |
| 10 | Tools: Smartsheet, MS Project, P6, PSA | MATCH (1) | Listed in Skills only. No role ties any tool to an outcome. |

| # | Preferred | Status | Evidence / Note |
|---|---|---|---|
| P1 | PMO/program/scheduling/controls leadership | MATCH (1) | Netsmart, ringldr. |
| P2 | Implementing/optimizing PSA and resource mgmt | PARTIAL (0.5) | PSA is in Skills only. |
| P3 | Evaluating/implementing PM technology and reporting solutions | MISS (0) | No evidence. |
| P4 | AI-enabled workflow automation / digital transformation | MATCH (1) | Vanyshr RPA and AI integration. Credible, but it is a startup product, not PMO automation. |
| P5 | Advanced executive dashboards | PARTIAL (0.5) | Power BI/Tableau and "Executive Reporting" in Skills. No dashboard shown. |

| # | Success outcome (nice-to-have tier) | Status |
|---|---|---|
| S1 | Standardized scheduling and templates adopted | PARTIAL (0.5) |
| S2 | Improved forecast accuracy | MATCH (1) |
| S3 | PMO compliance via audits | MISS (0) |
| S4 | Leadership visibility / health reporting | PARTIAL (0.5) |
| S5 | Scalable planning and tech recommendations | MISS (0) |
| S6 | Predictability / utilization / efficiency | MATCH (1) |

**Semantic Match Scorecard**

| Requirement Tier | Required | Match Count | Match % | Weighted Score |
|---|---|---|---|---|
| Must-Haves | 10 | 6.5 | 65% | 32.5 |
| Preferred | 5 | 3.0 | 60% | 18.0 |
| Nice-to-Haves | 6 | 3.0 | 50% | 10.0 |

Raw score: 60.5%.

**Recency adjustment:** The deepest scheduling evidence (Netsmart, 2014–2018) is 8+ years old, which carries 0.25x weight. Current-role evidence (ringldr, Vanyshr) is either advisory or non-PMO. The adjustment is about -5 points.

**Overall ATS Match Score: ~55%**
**Interpretation:** Weak Compatibility (40–59%, about 6% callback rate). The JD's two hard gates (PMP, degree field) are both missed or arguable, which alone can auto-reject.

**Years of experience:** Nominally met (12 yrs). Demonstrated schedule-centric years are about 4–6, which undershoots "10+ years managing detailed master schedules".
**Education:** Field mismatch (flag).

---

## MODULE 3: STAR Narrative & Competency Audit

| Bullet | S | T | A | R | STAR | Passive? | Competency | Feedback |
|---|---|---|---|---|---|---|---|---|
| Vanyshr: "Founded and lead development of Vanyshr…" | 1 | 1 | 0 | 0 | 2 | No | Product Mindset | No users, traction, or outcome. [IMPACT MISSING] |
| Vanyshr: "Built AI-enabled workflow automation: RPA submits opt-out…" | 0 | 1 | 1 | 0 | 2 | No | Systems Thinking | "At scale" is unquantified. [IMPACT MISSING] |
| Vanyshr: "Designed and deployed multi-layer SAST audit…" | 0 | 1 | 1 | 0 | 2 | No | Systems Thinking | Tool-name heavy. Irrelevant to a PMO hire. [IMPACT MISSING] |
| Vanyshr: "Shipped the platform end to end on React, TypeScript, Supabase…" | 0 | 1 | 1 | 0 | 2 | No | Operational Ownership | Tech-stack list, no result. [IMPACT MISSING] |
| ringldr: "Engineered an internal project-health framework: +22% on-time, −18% overruns…" | 1 | 1 | 1 | 1 | 4 | No | Operational Ownership | Best bullet on the page. Missing baseline, portfolio size, and whose projects. |
| ringldr: "Translate business strategy into technical roadmaps for C-suite…" | 0 | 1 | 1 | 0 | 2 | No | Collaboration | Present-tense generic. [IMPACT MISSING] |
| ringldr: "Advise PMO leadership on governance, forecasting accuracy…" | 0 | 1 | 0 | 0 | 1 | Near | Collaboration | Reads as "assisted" in substance. No client, no result. [IMPACT MISSING] |
| Cornerstones: "Developed the Technology Applications program from scratch…" | 1 | 1 | 1 | 0 | 3 | No | Operational Ownership | No size, timeline, or result. |
| Cornerstones: "Built the first IT organization for 600+ employee nonprofit…" | 1 | 1 | 1 | 0 | 3 | No | Operational Ownership | Strong scope. No outcome measure. |
| Cornerstones: "Pioneered a VOC program…" | 0 | 1 | 1 | 0 | 2 | No | Product Mindset | No result. [IMPACT MISSING] |
| Cornerstones: "Embedded Agile/DevOps; $245K+ annual vendor savings" | 0 | 1 | 1 | 1 | 3 | No | Operational Ownership | Only dollar outcome. Unexplained how. |
| GEHA: "Managed on-prem to cloud migration, stabilizing hundreds of VDI…" | 1 | 1 | 1 | 0 | 3 | No | Systems Thinking | No result. [IMPACT MISSING] |
| GEHA: "Led Agile delivery of customer experience initiative (2M+ members)" | 0 | 1 | 1 | 0 | 2 | No | Collaboration | Scale only. [IMPACT MISSING] |
| Netsmart: "Managed 150+ EHR implementation projects…" | 0 | 1 | 1 | 0 | 2 | No | Operational Ownership | Volume claim only. On-time rate, budget, duration? [IMPACT MISSING] |
| Netsmart: "Built and governed master project schedules…" | 0 | 1 | 1 | 0 | 2 | No | Systems Thinking | Directly on-target, but no result. [IMPACT MISSING] |
| Netsmart: "Delivered the State of Alabama Reporting Module…" | 1 | 1 | 1 | 0 | 3 | No | Collaboration | No outcome. [IMPACT MISSING] |
| Netsmart: "Led a 3,000+ hour EHR platform implementation…" | 0 | 1 | 1 | 0 | 2 | No | Operational Ownership | Size only. 3,000 hours is small beside "150+ projects"; the pairing reads oddly. |

Average: about 2.35/4, or 2.9/5. Leadership signals are present (Founded, Pioneered, Built, Led, Embedded), but only 2 of 17 bullets carry a quantified result tied to PMO work.

**Behavioral Competency Summary**

| Competency | Signals Found | Rating (1-5) | Evidence |
|---|---|---|---|
| Systems Thinking | 6 | 3 | VDI/cloud migration, SAST pipeline, master schedules with dependencies |
| Operational Ownership | 7 | 3.5 | Built IT org from zero, 22%/18% framework, $245K savings |
| Product Mindset | 3 | 2.5 | VOC program, Vanyshr. No user or business metrics. |
| Collaboration | 4 | 3 | C-suite advisory, state/federal stakeholders. No conflict or coalition stories. |

**Overall Narrative Strength: 3.0/5**

---

## MODULE 4: Integrity & Red Flags

| Flag Category | Issues Found | Severity | Detail |
|---|---|---|---|
| Grammar/Typos | 0 hard typos; 1 phrasing issue | LOW | "Returning candidate with deep platform and delivery knowledge" is self-referential and does not belong in a resume. It is an application-meta note, not experience. |
| Career Gaps | 0 | n/a | June 2014 to present is continuous. |
| Job Hopping | 0 | n/a | 5 roles, average tenure over 2 yrs. Not flagged. |
| Overlapping / unexplained concurrent roles | 3 | MEDIUM | ringldr (June 2018–Present) overlaps GEHA, Cornerstones, and Vanyshr. Not explained. The hiring manager must decide what the candidate actually did full-time. |
| Cert/Education Integrity | 1 | CRITICAL | **[CERT GAP]** PMP is required and absent. "Initiated; committed to acquiring immediately" is honest but is not a credential. No degree falsification: both degrees are stated as completed. |
| Education field | 1 | MEDIUM | Degrees (Psychology/Sociology, MSW) are not in the JD's field list. |
| AI Manipulation Markers | 2 | MEDIUM | **[METRIC CLICHE]**: 22% and 18% appear in both the Summary and ringldr bullet. The Summary places them next to "four years at Netsmart", which implies Netsmart as the source. Attribution is ambiguous. **[TEMPLATE UNIFORMITY]**: Skills mirror JD wording almost verbatim (e.g., "Master Project Templates", "Forecasting Accuracy", "Schedule Audits & Compliance (Project Audits)"), with no matching bullets. Reads as keyword-matched. |
| Title mismatch | 1 | MEDIUM | The headline title "Project Executive – PMO Center of Excellence" is the target job title, not any held title. Titles held were Project/Program Manager, Director of Technology, etc. |
| Hidden text / Metadata | 0 | n/a | Not detectable from the submitted text. |
| Authenticity | 1 | MEDIUM | Netsmart, ringldr and Cornerstones bullets carry specifics (Alabama module, 600+ employees, $245K). The Skills-to-bullets mismatch and the self-written "returning candidate" line weaken it. |

**Overall Integrity Assessment: CONCERNS**

---

## MODULE 5: Actionable Optimization Backlog

**HIGH PRIORITY (Address before resubmission):**
1. **PMP missing** → Obtain it, or at minimum list an exam date and "PMP candidate, exam scheduled [Month YYYY]". Delete "committed to acquiring immediately". → Expected ATS impact: ~55% → ~65% and removes the knockout.
2. **Keyword-only core competencies** → Add dated bullets proving EVM, % complete, schedule risk analysis, and schedule audits. Example: "Audited [N] in-flight EHR schedules against [standard], finding [X]% with critical-path gaps; corrective actions improved on-time delivery from [A]% to [B]%." → ~+8 points.
3. **Attribute the 22%/18% metrics correctly** → State the employer or client, portfolio size (number of projects, dollar value), baseline, and time period. Remove them from the Summary if they did not come from Netsmart. Current: "Built PMO governance frameworks that lifted on-time delivery 22% and cut budget overruns 18%…" Suggested: "At ringldr, built a project-health framework for [client/portfolio of N projects] that raised on-time delivery 22% and cut overruns 18% within 12 months."
4. **Tool claims with no proof** → Tie MS Project, Primavera P6, Smartsheet and PSA to specific roles and outcomes. If P6 or PSA were never used in production, remove them.
5. **Weak Netsmart bullets (the most relevant role)** → Current: "Managed 150+ enterprise EHR implementation projects…" Suggested: "Managed 150+ EHR implementations (~$[X]M portfolio) using standardized master schedules with critical-path and resource-constraint modeling; delivered [Y]% on time, reduced average go-live slip from [A] to [B] weeks."
6. **Concurrent roles / chronology** → Show ringldr as part-time or advisory with an explicit date range, or end it where the overlap ends. Standardize dates to Month YYYY. List roles in reverse-chronological order by end date.
7. **Delete "Returning candidate with deep platform and delivery knowledge."** → Replace with a one-line scope statement for the role. Use the cover note for rehire context.

**MEDIUM PRIORITY (Polish if time allows):**
8. **Vanyshr** → Compress to 2 bullets that emphasize AI workflow automation (a Preferred item) with a measurable result (requests processed, hours saved). Remove SAST/CI-CD tool lists, which signal engineer, not PMO executive.
9. **Degree gap** → Add a line that bridges it, such as a PM or business education certificate, or the "related field" argument via years of IT project management practice.
10. **Executive dashboards** → Add one bullet naming a dashboard built, the audience, and the decision it informed (Power BI/Tableau).
11. **Training/coaching** → Add a bullet with a number: "Trained [N] PMs on scheduling standards; [metric] improvement in schedule quality or audit scores."
12. **Headline title** → Use a title actually held. Put target-role positioning in the Summary.
13. **Rename heading** → "Professional Experience" to "Work Experience".

**LOW PRIORITY (Nice-to-have enhancements):**
14. **Authenticity** → Add one specific detail per role: team size, tooling stack, a named client or program, a quote or outcome from the executive.
15. **Cornerstones, GEHA, Netsmart #4** → Add outcome measures to the scope-only bullets (e.g., 3,000+ hours: on time/under budget?).

---

## HIRING MANAGER NOTES

On paper, James has a plausible story: 12 years in healthcare IT delivery, an EHR-vendor background that matches this employer, and a record of building structure from zero (the Cornerstones IT organization, the ringldr framework). That story is undercut by the resume's own structure. The JD is a scheduling/controls role requiring PMP, earned value, schedule audits, and CoE leadership. The resume lists those words in Skills but gives them almost no narrative proof. The one strongly quantified governance result sits in a self-owned advisory firm with no client, scale, or baseline, and the same figures appear in the Summary beside Netsmart. The most relevant direct experience (Netsmart schedules) is 8+ years old and described in volume terms ("150+ projects", "3,000+ hours") rather than outcomes.

PMP is the clearest knockout. Writing "initiated; committed to acquiring immediately" under a role that says "required" highlights the gap. The degree field is a second, softer mismatch. The Vanyshr section is impressive as entrepreneurial and technical work but pulls the reader toward "founder-engineer" and away from "enterprise scheduling executive". The overlapping dates (ringldr alongside three other roles, all starting June 2018) invite questions about how much real PMO work was full-time.

I would not advance this resume as written. If he holds or schedules the PMP, rebuilds the Netsmart section with outcomes, supports the claimed tools and audits with specifics, and cleans up the timeline, I would reconsider at MAYBE-to-YES. His prior Netsmart tenure makes a recruiter conversation reasonable, but not on this document.
