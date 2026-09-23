---
name: tailor-resume-06-final-output
type: workflow-step
target_model: claude-code
tags: [resume, hiring, pdf, latex, delivery]
purpose: Clean final markdown and generate ATS-friendly PDF via LaTeX; deliver final files to final_files_dir.
inputs: [Humanized Resume]
outputs: final resume markdown + PDF in final_files_dir; LaTeX working file in agent_outputs_dir
created: 2026-05-13
last_audited: 
last_audit_score: 
related:
  - prompt-library/tailor-resume-seq/05-humanization.md
notes: |
  Step 6 of 6. Final step — ends the workflow with polished deliverables.
---

My resume is approved. Now generate the final deliverables for the active job workspace.

**Inputs:** `{{agent_outputs_dir}}/Humanized Resume.md` (approved version)

**Tasks:**

1. Clean and finalize the markdown as `{{final_files_dir}}/James Oehring Resume - {{company_name}}.md`:
   - Consistent formatting throughout
   - No placeholder text or rewrite notes in the final version
   - Proper section hierarchy

2. Convert to PDF via LaTeX:
   - Write a LaTeX `.tex` working file as `{{agent_outputs_dir}}/Resume.tex`
   - Render the resume with:
     - Clean, ATS-friendly single-column layout with no tables or text boxes
     - Professional font choice appropriate for the role seniority
     - Margins around 0.6-0.75in and 10-11pt body font
     - Section dividers that are visually clean but not decorative
     - Hyperlinks for LinkedIn and email if present
   - Compile to `{{final_files_dir}}/James Oehring Resume - {{company_name}}.pdf` using `pdflatex` or `xelatex`

3. Verify the PDF:
   - Confirm it compiled without errors
   - Confirm the layout looks clean
   - If the PDF fails, fix the issue or fall back to generating a well-structured HTML resume and converting it to PDF with a headless browser

4. Deliver the final files in `{{final_files_dir}}`:
   - `James Oehring Resume - {{company_name}}.md`
   - `James Oehring Resume - {{company_name}}.pdf`

5. Keep all intermediate working artifacts in `{{agent_outputs_dir}}`. The `final_files_dir` is reserved for polished deliverables such as the final resume and, later, cover letter outputs.

When complete, tell me exactly which files were written to `{{final_files_dir}}` and whether the PDF compiled cleanly.