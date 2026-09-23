# Humanize Audit — Salina Regional Health Center / Healthcare Program Manager

## LLM Fingerprint Audit Summary
- Total flags found: 23
- Flags resolved: 21
- Remaining intentional exceptions: 2 (see notes)

## Flags & Changes Log

| Location | Original Text | Flag Type | Revised Text |
|---|---|---|---|
| Summary | "Healthcare IT program manager with 10+ years delivering hospital and health-system technology across EHR, clinical applications, enterprise applications, and IT infrastructure." | Tricolon/list-stack opener, formal LLM cadence | "Healthcare IT program manager with 10+ years inside hospital and health-system technology." |
| Summary | "manage multiple concurrent projects against large active backlogs" | Power-verb generic | "juggle multiple concurrent projects against large active backlogs" |
| Summary | "have stood up Agile practice in environments that previously had none" | Mild LLM register | "stood up Agile practice in shops that previously had none" |
| Summary | "Strong stakeholder management and executive communication track record with hospital and behavioral-health C-suites, boards, and clinical leadership." | "Proven track record" cousin; resume-deck phrasing | "Comfortable in the room with hospital and behavioral-health C-suites, boards, and clinical leadership." |
| Summary | "I drive outcomes with limited resources, instrument programs with RAID/four-box/OKR reporting, and translate clinical and operational priorities into delivery that holds up to executive scrutiny." | "Drive outcomes" + balanced tricolon | "I tend to do my best work in resource-constrained environments, instrument programs with RAID, four-box, and OKR reporting, and turn clinical and operational priorities into delivery that holds up under executive scrutiny." |
| Core Competencies (all categories) | Pipe-delimited (`|`) keyword strings | Visual LLM tell (overly tidy) | Switched to comma-delimited prose lists |
| Avirodha bullet 1 | "covering EHR implementations… and cybersecurity initiatives for hospital and provider-organization clients. Operate under HIPAA and SOC 2 constraints, using Agile, hybrid Waterfall+Agile, and DevOps delivery as the work demands." | Em dash + "as the work demands" closing flourish | Split into shorter sentences with concrete framing ("depending on what the client can support") |
| Avirodha bullet 2 | "Lead end-to-end application development engagements: designed the cloud architecture for, and built, a GCP-native bidding automation web application for a client end-to-end from architecture through deployment" | Colon-list, "end-to-end" twice, comma-clause em-dash feel | "Designed the GCP cloud architecture for a client bidding-automation web application and then built it: React front end, REST APIs, Git source control, CI/CD pipeline. Owned the full SDLC from requirements through stabilization." |
| Avirodha bullet 3 | "an on-premises to Google Cloud Platform (GCP) cloud migration for a client — owned architecture decisions, vendor coordination, and delivery through stabilization." | Em-dash clause connector | Period + new sentence |
| Avirodha bullet 4 | "Run complex, multi-threaded client programs from strategy through delivery, juggling multiple concurrent projects in fast-paced, resource-constrained environments." | "Complex, multi-threaded… fast-paced" stack | "Run multi-threaded client programs from strategy into delivery, usually several at once, in environments where the resourcing is tight." |
| Avirodha bullet 5 | "Lifted on-time delivery by 22% and cut budget overruns by 18% in year one." | Suspiciously precise metric pair | Softened to "~22%" and "roughly 18%" |
| Avirodha bullet 6 | "Act as the primary C-suite liaison, translating clinical, business, and operational strategy into executable technical roadmaps and driving cross-functional stakeholder engagement across executive, technical, and clinical audiences." | Classic LLM ribbon sentence | Split into two sentences, dropped "driving cross-functional stakeholder engagement" filler |
| Cornerstones bullet 1 | "Served as the agency's lead technology executive" | Resume-cliché "Served as" | "Lead technology executive for the agency" |
| Cornerstones bullet 2 | em-dash usage "every company technology initiative — covering intake…" | Em dash as clause connector | Period + new sentence |
| Cornerstones bullet 3 | "Led company-wide technology programs across 20+ business units and 400+ employees spanning infrastructure…" | Comma-spanning long clause | "Ran" + cleaner punctuation |
| Cornerstones bullet 4 | "Drove an Agile transformation in a previously waterfall- and ad-hoc-driven environment: embedded Agile and DevOps delivery practices and built the KPI, RAID, and analytics reporting where none had existed, so senior leadership had real-time visibility into IT program performance for the first time." | "Drove" flagged power verb, colon-list, tidy closing | "Led an Agile transformation…" / split sentences / dropped colon |
| Cornerstones bullet 6 | "fell 35%" | Suspiciously round metric | "fell ~35%" |
| Cornerstones bullet 7 | "vendor selection, contract negotiation, implementation oversight, ongoing performance management, and renewal" | Five-item parallel list opening with "end-to-end" | Kept items but recast as ": selection, contract negotiation…"; removed second "end-to-end" |
| GEHA bullet 1 | "Served as team lead" | "Served as" cliché | "Team lead" |
| GEHA bullet 3 | "Managed an enterprise on-premises to Microsoft Azure infrastructure migration for a national health benefits organization" | Self-referential filler ("for a national health benefits organization" when GEHA header already says so) | Replaced with "for the health plan" |
| Netsmart bullet 1 | "Owned every phase of EHR implementation — requirements gathering… post-go-live stabilization — across multiple concurrent projects in a high-volume PM environment." | Em-dash sandwich + tidy "every phase" framing | Rewrote into two sentences, dropped em dashes |
| Netsmart bullet 3 | "Partnered cross-functionally with clinical, application development, EHR product, and infrastructure teams to deliver implementations, integrations, and upgrades across diverse hospital and behavioral-health-center environments." | "Cross-functionally" adverb-stack, "diverse… environments" | "Partnered with clinical, application development, EHR product, and infrastructure teams… across very different hospital and behavioral-health-center environments." |
| Netsmart bullet 4 | "This is where I built the senior leadership presentation cadence I have used in every role since." | Loop-closing tidy summary | "That's the senior-leadership presentation cadence I still use today." (kept the voice; tightened) |
| Projects section | Many em-dashes after project titles (e.g. "Fractional VP of Technology (2023):") | Colon punctuation kept (legitimate); em dashes inside descriptions removed | All clause-connector em dashes replaced |
| Projects — Vanyshr | "Hands-on application development reinforcing a current data-protection through-line aligned with regulated-industry programs." | Marketing-deck cadence | "Keeps me hands-on with application development and reinforces the data-protection through-line in my regulated-industry work." |

### Remaining intentional exceptions
1. The em dashes between **company name and descriptor** in headings (e.g. "Netsmart Technologies — Enterprise Healthcare IT / EHR Vendor") are typographic, not LLM tell-style clause connectors. Standard resume convention; kept.
2. One em dash retained between "Master of Social Work (MSW), 2013" line spacing and "Bachelor of Science…" is not actually a dash; education block uses standard punctuation only.

## Voice Consistency Check
The candidate's voice in `Profile Enrichment.md` reads as practical, slightly understated, comfortable with hard numbers but not boastful, and willing to say things like "I tend to do my best work in…" or "That's the cadence I still use today." The humanization pass leaned into that. Summary opens declaratively rather than with adjective stacks. Bullets vary in length and rhythm now — some short ("Team lead for…"), some longer paragraph-style (Avirodha bullet 1, Netsmart bullet 1). Metrics softened with ~ where appropriate; the 22%/18%/35% precision pattern was the strongest residual LLM tell and is now mixed precision/approximate. The fractional VP and Cornerstones substance is preserved verbatim where it carries the candidate's lived experience.

## Human Plausibility Score
**8.5 / 10.** This reads like a senior IC who knows his story cold and writes resumes himself. The only residual risks: (a) the Core Competencies block, by nature, is a keyword pantry — even reformatted as comma-prose it still skews structured, and (b) the consulting/Avirodha bullet 1 retains some density because every clause is carrying an ATS keyword. A trained recruiter would not flag this as AI-generated; an AI-detection tool would likely return ambiguous.

## ATS Keyword Sanity Check
Verified against the `## ATS Keywords` section of `Job Recon.md`. Confirmed preserved in the Humanized Resume:

- **Project Management** — present (Core Competencies, Netsmart heading, multiple bullets)
- **Program Manager** — present (headline, Netsmart heading, summary)
- **Healthcare IT** — present (summary, Core Competencies, Avirodha bullet 1)
- **PMP** — *intentionally absent* per hard constraint (candidate holds CSM/CSPO only); addressed implicitly via program-management depth
- **Agile** — present (multiple)
- **Scrum** — present (Methodologies, Certifications, GEHA title)
- **SAFe** — *not present*; candidate has no SAFe experience, not added
- **Waterfall** — present (summary, Methodologies)
- **EHR** — present (headline, summary, Netsmart, Core Competencies, multiple bullets)
- **Epic, Cerner, Meditech** — *intentionally absent* per hard constraint (no fabrication; Netsmart is the truthful EHR product)
- **Infrastructure** — present (headline, Core Competencies, Avirodha, GEHA, Netsmart)
- **Enterprise Applications** — present (Core Competencies, Cornerstones, Qualifications-relevant bullets)
- **Clinical Systems** — covered via "clinical applications" / "clinical application delivery" (synonym; same ATS root)
- **Stakeholder Management** — present (Core Competencies; summary uses "stakeholders" / "C-suite")
- **Risk Mitigation** — covered via "risk management" and "RAID-based risk frameworks" / GEHA "litigation-risk-reduction"
- **Project Kickoff** — *not literal*; covered via "gate reviews" + "milestone gating" + program lifecycle ownership
- **Status Reporting** — covered via "four-box executive summaries," "burn-downs," "timeline reviews," "executive reporting of backlog burndown and program health"
- **Executive Communication** — present (summary, Avirodha, Netsmart, Core Competencies)
- **Project Portfolio** — present ("$100M+ program portfolio," "client portfolio," "technology portfolio")
- **Cross-functional** — present (Core Competencies, Netsmart, Avirodha)
- **Agile Transformation** — present (summary, Cornerstones, GEHA, Core Competencies)
- **Process Improvement** — covered via SDLC SOP design, helpdesk workflow redesign, PMO project reporting redesign

No facts distorted. No fabricated experience added. PMP and Epic/Cerner/Meditech omitted per explicit hard constraint, not by oversight.
