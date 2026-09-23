---
name: tailor-resume-05-humanization
type: workflow-step
target_model: claude-code
tags: [resume, hiring, humanization, anti-llm-detection]
purpose: Strip LLM fingerprints from the ATS-optimized resume so it reads as human-written without losing ATS keywords.
inputs: [Audited Resume, ATS Audit, Profile Enrichment]
outputs: Humanized Resume.md + Humanize Audit.md in agent_outputs_dir
created: 2026-05-13
last_audited: 
last_audit_score: 
related:
  - prompt-library/tailor-resume-seq/04-ats-pass.md
  - prompt-library/tailor-resume-seq/06-final-output.md
notes: |
  Step 5 of 6. Most opinionated prompt. Must preserve ATS coverage while anchoring rewrite decisions to the candidate's own phrasing from enriched notes.
---

We've completed the ATS optimization pass. Before progressing to the final deliverables, run a
dedicated LLM Fingerprint Audit on `{{agent_outputs_dir}}/Audited Resume.md`.

Also load `{{agent_outputs_dir}}/ATS Audit.md` before rewriting anything so ATS keyword coverage stays intact.

You are now acting as a forensic editor who specializes in identifying and removing
AI-generated writing patterns. Your goal is to make this resume read as if it was
written by a thoughtful human — not polished by a language model.

---

**PHASE 1 — FINGERPRINT SCAN**

Scan the entire resume for the most common LLM writing tells. Build a flagged 
inventory of every instance found:

**Punctuation & Structural Tells:**
- Em dashes used as clause connectors (— ) — the single biggest LLM giveaway
- Overuse of semicolons to chain related ideas
- Bullet points that follow an identical grammatical template 
  (e.g. every bullet is "[Verb]ed X by doing Y, resulting in Z")
- Colons used to introduce a list inside a bullet (LLMs love this)
- Parenthetical asides that over-explain something already clear

**Word & Phrase Tells:**
- "Leveraged" — flag every instance
- "Spearheaded" — flag every instance
- "Championed" — flag every instance
- "Fostered" — flag every instance  
- "Streamlined" — flag every instance
- "Orchestrated" — flag every instance
- "Drove [abstract noun]" (e.g. "drove alignment", "drove adoption")
- "Passionate about"
- "Results-driven"
- Phrases with "robust", "scalable", or "world-class"
- "Proven track record"

**Rhythm & Structure Tells:**
- Bullets that follow an identical grammatical template across an entire role
  (for example, every bullet is "Verb-ed X to achieve Y")
- Summary paragraph that opens with "I am a [adjective] [title] with X years of..."
- Three-adjective stacks: "detail-oriented, results-driven, collaborative professional"
- Bullet points that end with a tidy, summarizing clause (LLMs love to close loops)
- Overly balanced parallelism across all bullets in a single role

**Tone Tells:**
- Formal register that no human would naturally use in a resume
- Sentences that are grammatically perfect but feel like no one actually said them
- Superlatives used confidently without evidence ("exceptional", "outstanding", 
  "unparalleled")

Flag every instance with [🤖 LLM FLAG: type of tell — suggested fix]

---

**PHASE 1.5 — TRIAGE**

Before Phase 2, rank flags by severity:

- High: em dashes used as clause connectors, fabrication-suspect superlatives, three-adjective stacks
- Medium: flagged power words, repeated grammatical templates, overly balanced parallelism
- Low: everything else

Fix all High flags. Fix Medium flags where a natural alternative exists. Leave Low flags alone unless they cluster enough to create an obvious AI pattern.

---

**PHASE 2 — HUMANIZATION PASS**

Rewrite all flagged content using these principles:

1. **Preserve ATS coverage first.** Before rewriting any flagged bullet, list the ATS keywords it contains by cross-referencing `{{agent_outputs_dir}}/ATS Audit.md`.
   The rewrite must preserve every keyword. If a tell can only be removed by dropping a keyword, leave the tell in place and log it as an intentional exception in Phase 3.

2. **Anchor to the candidate's real voice.** Reference `{{agent_outputs_dir}}/Profile Enrichment.md`.
   Do not generate replacement text from your own polished register. Sample phrasing from how the candidate actually described their work in the interview notes.
   If a bullet has no meaningful notes counterpart, ask before rewriting it heavily.

3. **Replace em dashes** with: a period and new sentence, a comma,
   or simple restructuring — whichever reads most naturally in context.
   Em dashes are not banned, but should appear at most 1-2 times in
   the entire document, and only where a human writer would genuinely
   reach for one.

4. **Replace flagged power words** with the actual specific verb that
   describes what was done. "Spearheaded a migration" → "Rebuilt the
   infrastructure from scratch" or "Led the migration from X to Y."
   Concrete beats impressive every time.

5. **Vary bullet structure deliberately.** Some bullets should
   be short and punchy. Some can be longer. They should not all look
   like they came from the same template.

6. **Introduce slight asymmetry.** Real human resumes have mild
   inconsistencies — one section slightly stronger than another, a bullet
   that's more casual than the rest, a metric that's approximate
   ("~40% faster") rather than suspiciously precise.

7. **Read every bullet aloud mentally.** If it sounds like something
   a person would say in an interview, keep it. If it sounds like
   something a chatbot generated to impress, rewrite it.

---

**PHASE 3 — HUMANIZATION REPORT**

Output `{{agent_outputs_dir}}/Humanize Audit.md` containing:

  ## LLM Fingerprint Audit Summary
  - Total flags found: X
  - Flags resolved: X
  - Remaining intentional exceptions: X (with explanation)

  ## Flags & Changes Log
  | Location | Original Text | Flag Type | Revised Text |
  |---|---|---|---|

  ## Voice Consistency Check
  Did the final version maintain the candidate's authentic voice? 
  [Your assessment + any notes]

  ## Human Plausibility Score
  On a scale of 1–10, how likely is this resume to be flagged as 
  AI-generated by a trained recruiter or detection tool? 
  [Score + reasoning]

---

**PHASE 4 — FINAL READ**

Do one final pass and ask yourself:

  "If I were a recruiter who has read 10,000 resumes, would anything 
  here make me pause and think 'a bot wrote this'?"

If yes — fix it. If no — we're done.

Save the clean output as `{{agent_outputs_dir}}/Humanized Resume.md`.

---

When complete, tell me which two files you wrote in `{{agent_outputs_dir}}`, present the Human Plausibility Score, and ask:
"Does this still sound like you? Any phrases that feel off or that 
you'd like to restore?"

Before handing off to the final output step, do a quick sanity check that the humanization pass did not remove critical ATS keywords or distort the facts.

Confirm this explicitly against `{{agent_outputs_dir}}/ATS Audit.md`, not from memory.

Wait for my approval, then we proceed to Step 6.