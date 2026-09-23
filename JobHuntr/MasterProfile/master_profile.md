# 🗂️ Master Profile — James Oehring
> **Last Updated:** 2026-07-09  
> **Source:** Resume (parsed) + Project README (parsed) + LinkedIn (⚠️ manual enrichment required — see Section 8)

---

## 1. CONTACT & IDENTITY

| Field | Value |
|---|---|
| **Full Name** | James Oehring |
| **Location** | Overland Park, KS (Olathe, KS area) |
| **Email** | james@ringldr.com |
| **Phone** | 816.225.8592 |
| **LinkedIn** | linkedin.com/in/james-oehring |
| **Headline (Resume)** | Certified Scrum Master — Certified Product Owner — Technology Leader — Operations Focused |

---

## 2. PROFESSIONAL SUMMARY (Source Versions)

### Resume Version
> Data-driven enterprise technology leader with over a decade of experience in healthcare and technology sectors, adept at leading complex programs and cross-functional teams. Excels at overseeing technical integration of client accounts and strategic partnerships, driving client satisfaction, retention, and growth. Expertise in stakeholder management, process improvement, and Agile/DevOps methodologies enables seamless, client-centric solution delivery.

### Narrative Themes Extracted
- Enterprise-scale program management ($100M+ portfolio)
- Healthcare/EHR systems expertise (HIPAA, HL7/FHIR)
- Cross-functional team leadership & C-suite communication
- Agile/DevOps transformation and process improvement
- Startup founding experience (technical + operational)
- AI/LLM infrastructure and modern application development
- Multi-agent orchestration, agent self-improvement, and knowledge pipelines
- Enterprise AI CoE design, use-case scoring (ROI / feasibility / risk), ideation-to-production lifecycle
- AI governance, Responsible AI policy, AI TRiSM, and real-time guardrails
- AI FinOps, token economics, and foundation-model vendor negotiation
- Cybersecurity program design and implementation
- Data privacy and consumer protection (current startup focus)

---

## 3. WORK EXPERIENCE

### Stealth AI Startup
**Title:** Chief AI Officer  
**Dates:** September 2025 – Present  
**Location:** Remote  
**Type:** AI Startup (Stealth)

**Summary:** Lead AI architect across two AI-native systems — everything from agent design to go-to-market. Also designed and scaled enterprise AI operating models spanning CoE leadership, citizen development, governance, and FinOps.

**Bullets — Platform & Agent Engineering:**
- Built a multi-agent orchestration system where agents log their own performance and corrections over time and use that history to rewrite their own instructions. The system gets better on its own instead of needing constant hand-tuning.
- Designed agent "personalities" for roles that require real judgment, not just checklists — giving them decision-making frameworks modeled on how an actual domain expert thinks (for example, how a product lead reasons through ambiguity) to get better output on fuzzy, non-routine work.
- Built a knowledge pipeline that pulls in articles, video, and documents, classifies and cleans them up, and hands them to the right agent as working memory. New agents start with current domain knowledge instead of a blank slate.
- On a separate people-data platform, used LLMs for entity resolution — matching partial profiles against confirmed identities to improve accuracy — and built agents that handle consumer opt-out and data-removal requests as a privacy feature.
- Shifted from static, single-prompt LLM apps to agentic harnesses (LangGraph, CrewAI, AutoGen) — multi-agent systems that monitor operational data, flag anomalies, and draft options for human approval, moving from "AI as a chatbot" to "AI as an autonomous workforce."
- Moved beyond naive RAG to GraphRAG — integrating LLMs with knowledge graphs (Neo4j) so agents can reason across complex relational enterprise data, not just flat document search.
- Implemented real-time AI guardrails (NeMo Guardrails, Llama Guard) in the software architecture to intercept inputs/outputs and prevent prompt injection, data exfiltration, and rogue agent behavior before it reaches production users.

**Bullets — Enterprise AI CoE & Operating Model:**
- Designed and scaled an Enterprise AI CoE, moving 15+ Generative AI and predictive ML use cases from ideation/PoC to productionized cloud environments.
- Built a standardized AI lifecycle framework for scoring use cases on ROI, technical feasibility, and risk — not just building models, but deciding which ones deserve production investment.
- Established an "AI Champions" network across non-technical business units, upskilling 200+ employees in prompt engineering and low-code AI tooling, accelerating organic AI adoption by 40%.
- Led AI-era change management — demystifying LLMs for non-technical operators and business leaders without drowning them in technical jargon.
- Partnered with legal and compliance to author the corporate Responsible AI Policy; implemented automated evaluation tools to monitor model bias, hallucination rates, and data leakage.
- Governed data privacy for third-party LLM APIs and internally hosted open-source models (AI TRiSM — Trust, Risk, and Security Management).
- Managed a $5M+ AI/IT portfolio budget, developing CapEx/OpEx business cases that tied AI deployment to tangible operational outcomes.
- Optimized token economics and AI FinOps — routing queries to frontier models (Claude, GPT-4o) vs. smaller fine-tuned open-source models (Llama 3) hosted locally to balance cost vs. performance and protect budgets from volatile token spend.
- Negotiated enterprise SLAs with foundation model providers and projected cloud AI infrastructure costs (Azure OpenAI Service, AWS Bedrock).

**Quantified Wins:**
- 15+ GenAI and predictive ML use cases productionized
- 200+ employees upskilled via AI Champions network
- 40% acceleration in organic AI adoption
- $5M+ AI/IT portfolio managed

---

### Avirodha Consulting Group / ringldr *(Merger)*
**Title:** Founding Operating Partner  
**Dates:** June 2018 – Present  
**Location:** Kansas City, MO area  
**Type:** Consulting / Startup

**Bullets (verbatim from resume):**
- Engineered an internal operations framework for project health tracking, resulting in improved on-time delivery by 22% and reduced budget overruns by 18% in the first year.
- Spearheaded client operational delivery and served as the primary client liaison for C-suite executives, successfully translating business strategy into actionable technical project roadmaps by fostering clear communication and stakeholder engagement.
- Orchestrated complex enterprise integration projects, including EHR implementations and IT operations/process transformations, ensuring HIPAA and SOC2 compliance, by leveraging Agile, DevOps, and Waterfall methodologies across vendor selection and cybersecurity initiatives.

**Current Startup Context (from README):**
- Building **Vanyshr** — a privacy-focused PWA/monorepo platform (React, TypeScript, Supabase, Vite, Turbo)
- Platform helps users discover publicly available personal data and automate opt-out requests from data brokers
- RPA-driven automated opt-out/data removal form submissions at scale
- Designed and deployed multi-layer automated SAST security audit protocol in CI/CD pipeline (Semgrep, CodeQL, TruffleHog, npm audit) with agentic LLM-driven analysis and pre-merge security gates
- Tech stack: React 19, Vite, Supabase, pnpm monorepo, Turbo, MUI, Framer Motion, Gemini AI integration
- Architecture: `apps/app` (main PWA), `apps/landing` (marketing site), `packages/services` (scrapers, auth, email, DB)

---

### Cornerstones of Care
**Title:** Director of Technology  
**Dates:** June 2019 – February 2022  
**Location:** Kansas City, MO  
**Type:** Healthcare Nonprofit (600+ employees, multi-site)

**Bullets (verbatim from resume):**
- Pioneered an organizational Voice of the Customer (VOC) program, driving continuous improvement in IT services and EHR functionality by systematically capturing user feedback and identifying pain points.
- Optimized vendor relationships and financial accountability, achieving annual savings of over $245K+, by strategically enhancing contract optimization, renegotiation, and process efficiencies.
- Catalyzed IT team velocity and organizational alignment by embedding Agile/DevOps practices into delivery workflows, ensuring efficient execution and responsiveness to strategic priorities.
- Spearheaded the transformation of a new IT department within a multi-site healthcare nonprofit, establishing robust team structures, governance, and service delivery frameworks to support 600+ employees.
- Streamlined Help Desk operations, reducing average issue resolution times by 35% and significantly improving internal user satisfaction scores.
- Fortified organizational defense posture against cyber threats, achieving a 50% reduction in phishing test click-through rates within 12 months, by designing and deploying a comprehensive cybersecurity awareness and education program.

**Quantified Wins:**
- $245K+ annual vendor savings
- 35% reduction in help desk resolution times
- ~70% reduction in phishing click-through rates within 6 months
- Built IT dept from scratch for 600+ employee organization

---

### GEHA
**Title:** Project Manager / Scrum Master  
**Dates:** June 2018 – June 2019  
**Location:** Lee's Summit, MO  
**Type:** Federal Employee Health Benefits (2M+ members)

**Bullets (verbatim from resume):**
- Managed major migration effort from On-Prem to Cloud conversion, including project conversion and stabilization of hundreds of VDI environments, as well as managed initiative to reduce litigation risk through defensible destruction and updated data retention policies.
- Facilitated Agile delivery of new customer experience initiative supporting over 2+ million members, aligning KPIs (CSAT, VOC) with business objectives.

**Quantified Wins:**
- Hundreds of VDI environments migrated
- CX initiative supporting 2M+ members

---

### Netsmart Technologies
**Title:** Project / Program Manager  
**Dates:** June 2014 – June 2018  
**Location:** Overland Park, KS  
**Type:** Healthcare IT / EHR Vendor

**Bullets (verbatim from resume):**
- Managed 150+ projects and $100M+ in enterprise EHR implementations, overseeing teams from design through operational readiness utilizing and maintaining SDLC continuity.
- Delivered the Reporting Module for State of Alabama, partnering with state/federal stakeholders for compliance reporting standards.

**Quantified Wins:**
- 150+ EHR implementation projects
- $100M+ portfolio managed
- State-level government stakeholder management

---

## 4. EDUCATION

### University of Kansas
**Degree:** Master of Social Work (MSW)  
**Year:** 2013  
**Location:** Lawrence, KS

### Northwest Missouri State University
**Degree:** Bachelor of Science — Psychology / Sociology (Dual)  
**Year:** 2011  
**Location:** Maryville, MO

---

## 5. CERTIFICATIONS & LICENSES

| Certification | Issuing Body | Year |
|---|---|---|
| Certified Scrum Master (CSM) | SCRUM Alliance | 2019 |
| Certified Product Owner (CSPO) | SCRUM Alliance | 2019 |

---

## 6. SKILLS INVENTORY

### Project & Program Management
- Team management & leadership
- Project planning, scheduling & strategy
- Executive reporting
- Stakeholder management
- Risk/issue & change management
- Cost estimation & budget management
- Scope creep mitigation
- SDLC (full lifecycle)
- Agile methodology
- Waterfall methodology
- DevOps methodology
- Standards compliance (HIPAA, SOC2)

### Technical Competencies
- Application development: mobile, web, client-server
- API integrations & interoperability (REST, FHIR/HL7)
- Database management (SQL, PostgreSQL, NoSQL)
- On-Prem & Cloud infrastructure
- Artificial Intelligence (LLM, MCP, Agents, multi-agent orchestration)
- Entity resolution & knowledge pipelines
- Cybersecurity program design
- Data privacy & broker opt-out systems (current project)

### AI & Enterprise Leadership
- Enterprise AI Center of Excellence (CoE) design and scaling
- AI lifecycle management: ideation → PoC → production
- Use-case scoring frameworks (ROI, technical feasibility, risk)
- AI Champions / citizen development programs
- AI-era change management for non-technical business units
- Responsible AI policy authoring (legal & compliance partnership)
- AI TRiSM (Trust, Risk, and Security Management)
- Model evaluation: bias monitoring, hallucination rates, data leakage detection
- AI FinOps & token economics (cost vs. performance routing)
- Foundation model vendor negotiation & enterprise SLAs
- CapEx/OpEx business case development for AI portfolios

### Advanced AI / Agentic Expertise (Next-Level)
- Agentic workflow orchestration: LangGraph, CrewAI, AutoGen
- Multi-agent systems: autonomous monitoring, anomaly flagging, human-in-the-loop approval
- Advanced enterprise RAG and GraphRAG (Neo4j knowledge graphs)
- Token routing strategy: frontier models (Claude, GPT-4o) vs. fine-tuned open-source (Llama 3)
- Real-time AI guardrails: NeMo Guardrails, Llama Guard, prompt-injection defense
- AI red teaming and architectural safety (not just annual audits)

### Current / Active Technical Stack (from Vanyshr README + CAIO work)
- **Languages:** TypeScript, JavaScript
- **Frontend:** React 19, Vite, MUI (Material UI), Framer Motion, Lucide
- **Backend:** Supabase (functions, migrations, auth, DB)
- **Architecture:** pnpm monorepo, Turborepo, Zod
- **AI/ML:** Gemini API, Azure OpenAI Service, AWS Bedrock, LangGraph, CrewAI, AutoGen, Neo4j (GraphRAG)
- **AI Safety:** NeMo Guardrails, Llama Guard, automated model evaluation pipelines
- **DevOps:** GitHub Actions (CI/CD), ESLint, Prettier
- **Patterns:** PWA, REST APIs, modular services layer, agentic harnesses

### Tools & Platforms
- Azure DevOps
- Azure OpenAI Service
- AWS Bedrock
- Neo4j
- Visio
- MS Project
- SharePoint
- Confluence
- ServiceNow
- Power BI
- Tableau
- Qualtrics
- Splunk
- Ubuntu

### Soft Skills / Leadership Competencies
- C-suite communication & executive liaison
- Cross-functional team leadership
- Voice of the Customer (VOC) program design
- Vendor negotiation & contract optimization
- Process transformation & governance
- Startup founding & operational leadership
- AI literacy upskilling for non-technical stakeholders
- Cross-functional business case development (CapEx/OpEx)

---

## 7. KEY PROJECTS

### Enterprise AI Center of Excellence (2025–Present) — *Active*
**Type:** Enterprise AI Operating Model  
**Role:** Chief AI Officer  
**Description:** Designed and scaled an Enterprise AI CoE — standardized use-case scoring (ROI/feasibility/risk), AI Champions citizen-development network, Responsible AI governance, and $5M+ portfolio FinOps. Productionized 15+ GenAI and predictive ML use cases.  
**Highlights:**
- 200+ employees upskilled; 40% acceleration in organic AI adoption
- Responsible AI Policy co-authored with legal/compliance; automated bias/hallucination/leakage monitoring
- Agentic harnesses (LangGraph, CrewAI, AutoGen), GraphRAG (Neo4j), real-time guardrails (NeMo, Llama Guard)
- Token economics optimization across Azure OpenAI, AWS Bedrock, and self-hosted open-source models

---

### ringldr — Manufacturing AI (Gasket & Metal Plant Client)
**Type:** Consulting / AI Implementation  
**Role:** Designer, Developer, Deployer, Trainer  
**Description:** Two shipped AI systems for a gasket and metal manufacturing plant:
1. **Predictive maintenance** — machine-log synthesis; James designed, developed, deployed, and trained plant operators.
2. **Delivery velocity forecasting** — monitored delivery velocity and predicted delivery timelines earlier in the process, enabling closer forecast monitoring and proactive resource allocation; significantly reduced late deliveries (no quantified metric on file).

**Outcomes (predictive maintenance):** 20% reduction in machines experiencing downtime; on-time maintenance compliance improved from <50% to 90%.

---

### Vanyshr (2024–Present) — *Active*
**Type:** Startup / PWA  
**Role:** Founder & Lead Developer  
**Description:** Privacy-focused progressive web app that helps users discover publicly available personal data and automates opt-out requests from data brokers.  
**Tech Stack:** React 19, TypeScript, Vite, Supabase, pnpm monorepo, Turborepo, MUI, Framer Motion, Gemini AI, GitHub Actions  
**Architecture Highlights:**
- Monorepo with `apps/app`, `apps/landing`, `packages/shared`, `packages/services`, `packages/ui`, `packages/backend`
- Services layer: scrapers, auth, database, email, Gemini AI
- Supabase backend with edge functions and migrations
- CI/CD via GitHub Actions

---

### SEEKR (2021)
**Type:** InsurTech Mobile App Startup  
**Role:** Director / Program Lead  
**Description:** Directed launch of a $6M InsurTech mobile app startup.  
**Value:** $6,000,000 funded launch

---

### Cornerstones of Care — Cybersecurity Program (2019)
**Type:** Enterprise Security Initiative  
**Role:** Director of Technology  
**Description:** Designed and developed a comprehensive Cyber Security Resilience Program for 600+ employees, achieving 50% reduction in phishing click-through rates within 12 months.

---

### NASB — FinTech Mobile App (2019)
**Type:** Banking / FinTech  
**Role:** Consultant / PM  
**Description:** Facilitated National Banking consumer FinTech mobile app development for NASB (North American Savings Bank).

---

### Netsmart Technologies — EHR Platform (2016)
**Type:** Enterprise Healthcare IT  
**Role:** Program Manager  
**Description:** Managed implementation of a new EHR platform — a 3,000+ hour development effort involving cross-functional enterprise teams and full SDLC oversight.

---

### State of Alabama — Reporting Module (2015–2016)
**Type:** Government / Healthcare Compliance  
**Role:** Program Manager  
**Description:** Delivered the Reporting Module for the State of Alabama, partnering with state and federal stakeholders for compliance reporting standards.

---
## 8. PERSONAL BRAND & POSITIONING

### Core Value Proposition
Enterprise-grade technical program management chops + hands-on startup builder experience + modern AI/ML fluency. Rare profile: can talk to a CTO about architecture AND present to a board about ROI.

### Strongest Differentiators
1. **Scale:** $100M+ portfolio, 150+ enterprise projects
2. **Builder:** Currently building a production-grade PWA as a solo founder
3. **Domain:** Deep healthcare IT + FinTech + InsurTech cross-sector experience
4. **Security:** Designed org-wide cybersecurity programs, not just managed them
5. **AI-native:** Chief AI Officer at stealth startup; enterprise AI CoE operator + hands-on builder of multi-agent systems, GraphRAG, guardrails, and LLM-driven entity resolution — not just reading about them
6. **Governance + builder:** Can author Responsible AI policy with legal/compliance AND ship the guardrails in code

### Roles This Profile Maps To
- Technical Program Manager (TPM)
- Director of Technology / CTO (Series A–B startups)
- Implementation Manager (Enterprise SaaS)
- Product Manager — Technical
- Head of Engineering Operations
- Chief AI Officer / Head of AI
- VP of AI / Director of AI Strategy
- AI Product / Platform Manager
- Head of AI Center of Excellence

### Keywords for ATS Optimization
`Program Management`, `Technical Program Manager`, `EHR Implementation`, `HIPAA`, `SOC2`, `Agile`, `Scrum`, `DevOps`, `Stakeholder Management`, `Cloud Migration`, `Cybersecurity`, `AI`, `LLM`, `MCP`, `Generative AI`, `Multi-Agent Systems`, `Agent Orchestration`, `LangGraph`, `CrewAI`, `AutoGen`, `RAG`, `GraphRAG`, `Neo4j`, `Entity Resolution`, `Knowledge Pipeline`, `AI Center of Excellence`, `AI CoE`, `Responsible AI`, `AI Governance`, `AI TRiSM`, `AI FinOps`, `Token Economics`, `Prompt Engineering`, `Citizen Development`, `Azure OpenAI`, `AWS Bedrock`, `NeMo Guardrails`, `Llama Guard`, `Red Teaming`, `Predictive Maintenance`, `React`, `TypeScript`, `Supabase`, `REST API`, `FHIR`, `HL7`, `Data Privacy`, `Healthcare IT`, `FinTech`, `InsurTech`, `Vendor Management`, `C-Suite`, `VOC`, `Product Owner`, `Scrum Master`, `Chief AI Officer`

---

## 10. QUANTIFIED ACHIEVEMENTS BANK

> Use these as building blocks when tailoring bullets to job descriptions.

| Metric | Context | Source |
|---|---|---|
| $100M+ | EHR implementation portfolio managed | Netsmart |
| 150+ | Enterprise projects managed | Netsmart |
| $6M | InsurTech startup launched (SEEKR) | Key Projects |
| $245K+ | Annual vendor savings achieved | Cornerstones |
| 22% | Improvement in on-time delivery | Avirodha |
| 18% | Reduction in budget overruns | Avirodha |
| 35% | Reduction in help desk resolution time | Cornerstones |
| ~70% | Reduction in phishing click-through rates within 6 months | Cornerstones |
| 600+ | Employees supported in IT org build | Cornerstones |
| 2M+ | Members served via CX initiative | GEHA |
| 3,000+ | Development hours managed (EHR project) | Netsmart |
| 15+ | GenAI and predictive ML use cases productionized | Stealth AI Startup |
| 200+ | Employees upskilled via AI Champions network | Stealth AI Startup |
| 40% | Acceleration in organic AI adoption | Stealth AI Startup |
| 20% | Reduction in machines experiencing downtime (predictive maintenance) | ringldr manufacturing client |
| 90% | On-time maintenance compliance (up from <50%) | ringldr manufacturing client |
| $5M+ | AI/IT portfolio budget managed | Stealth AI Startup |

---

## 11. CAREER NARRATIVE (for Cover Letters & Interviews)

### The Arc
Started in social work (MSW, psychology background) → pivoted to technology program management in healthcare → scaled to enterprise-level ($100M+ portfolios) → took on Director-level leadership building entire IT departments → now serving as Chief AI Officer at a stealth AI startup while founding a privacy tech startup and maintaining consulting practice. The through-line: **systems thinking applied to human-scale problems**, whether that's patient records, employee security awareness, consumer data rights, or AI agents that reason like domain experts.

### Why the Social Work Background Matters
Mention this strategically. It explains the "why" behind healthcare focus, the stakeholder empathy, and the VOC/user-centered approach. For mission-driven orgs, nonprofits, or health tech — lead with it. For pure enterprise tech roles — keep it brief or omit.

### The Startup Story (Vanyshr)
"I got tired of being an advisor on data privacy and decided to build the product myself. Vanyshr is my live proof-of-concept that I can translate program management chops into actual shipped software — scraping infrastructure, Supabase backend, React PWA, CI/CD, the whole stack."

### The CAIO Story (Enterprise + Builder)
"I don't sit in the strategy layer only. I've stood up an AI CoE that moved 15+ use cases to production, upskilled 200+ people through an AI Champions network, and wrote the Responsible AI policy with legal — then built the guardrails and agent harnesses that enforce it. The difference is I can explain token economics to finance, demystify agents for a plant manager, and still architect LangGraph workflows that actually ship."

---

*End of Master Profile v1.0*
