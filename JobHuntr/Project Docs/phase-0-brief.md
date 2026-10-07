> **What this is:** Paste-ready build brief for Cursor — Joba-Fett Phase 0 (Discovery staging + Rover v1 + select-to-queue CLI). Derived from pipeline-v2-spec.md §7. · **Created:** 2026-10-07 · **Status:** ready to paste

# Joba-Fett — Phase 0 Build Brief (for Cursor)

## Context

You are working in the `joba-fett` repo. Read `JobHuntr/Project Docs/pipeline-v2-spec.md` first — it is the authoritative design. Phase 0 builds the **Discovery** lane only: a staging area for discovered roles, a v1 Rover ingest script, and a select-to-queue CLI that graduates a staged role into a full job workspace.

What already exists (do not modify): `JobHuntr/prompt-library/` (the resume engine), `JobHuntr/RUN.md`, `JobHuntr/CLAUDE.md`, `JobHuntr/Applications/Companies/…` (existing job workspaces), `JobHuntr/MasterProfile/`.

## Goal

A human (James) can run: discover roles → stage them in `Discovery/` → review the staged list → select roles into the Job Queue, each tagged with its per-job config. Duplicates are rejected everywhere. Everything is repo files; no database.

## Deliverables

### 1. `Discovery/` staging area

- Directory at repo root: `Discovery/`.
- One JSON file per discovered role: `Discovery/<dedupe_hash>.json` (filename IS the dedupe key).
- Schema:

```jsonc
{
  "dedupe_hash": "sha1 hex of normalized(company|title|location)",
  "status": "new | queued | dismissed",
  "source": "rover | manual",
  "source_board": "linkedin | indeed | ziprecruiter | a16z | vc | target_list | newly_funded",
  "company": "Acme Corp",
  "title": "Senior Product Manager",
  "location": "Kansas City, MO | Remote",
  "url": "https://…",
  "snippet": "short raw excerpt, may be empty",
  "discovered_at": "2026-10-07T00:00:00Z",
  "queued_at": null,        // set on graduation
  "dismissed_at": null      // set on dismissal
}
```

- `Discovery/README.md`: one page explaining the staging flow (sweep → review → select/dismiss) and the 30-day auto-dismiss rule.

### 2. `scripts/rover.py` — Rover v1 (assisted sweep)

Rover v1 is deliberately semi-manual. Automated board scraping is a later phase; v1 normalizes human-provided listings into staged records.

- `rover.py add --board linkedin --company "Acme" --title "Senior PM" --location "Remote" --url "https://…" [--snippet "…"]`
  → writes `Discovery/<hash>.json` with `status=new`, `source=manual|rover`.
- `rover.py add --from-file listings.json` → bulk import; `listings.json` is an array of objects with the same fields (minus hash/status).
- `rover.py list [--status new]` → compact table: hash-prefix, company, title, location, board, age.
- Dedupe (hard rule): compute the hash on every add; if `Discovery/<hash>.json` exists OR the hash matches any existing job workspace (scan `JobHuntr/Applications/Companies/` for `job-record.json` files and compare `dedupe_hash`), reject with `DUPLICATE: <existing location>` and write nothing.
- Normalization before hashing: lowercase, strip whitespace/punctuation, collapse `Sr.`/`Senior`, drop location qualifiers like `(Remote)` vs `Remote` mismatches — document the rules in a `normalize()` function with a comment block.
- `rover.py sweep --board <name>`: v1 prints `NOT IMPLEMENTED in v1 — use 'add'` (placeholder for automated fetch later). Do not half-build a scraper.

### 3. `scripts/queue.py` — select-to-queue CLI

- `queue.py list` → same compact table as rover list, `status=new` only, sorted oldest-first.
- `queue.py select <hash-prefix> --aggression 2 --industry "fintech" --persona manager`
  → all of the following, atomically (if any step fails, roll back):
  1. Creates the job workspace mirroring the existing pattern:
     `JobHuntr/Applications/Companies/<Company>/Jobs/<Title - YYYY-MM-DD>/`
     with `agent_outputs/` and `final_files/` subdirectories.
  2. Writes `job-record.json` in the job dir, following the schema in pipeline-v2-spec.md §6, with:
     `stage: "queued"`, `source`/`source_board` copied from the Discovery record,
     `config: {aggression, industry, persona, personal_connections: []}`.
     (`personal_connections` starts empty — James fills it in.)
  3. Sets the Discovery record to `status=queued`, `queued_at=now`.
- `queue.py dismiss <hash-prefix> [--reason "…"]` → `status=dismissed`, `dismissed_at=now`.
- `queue.py purge --older-than 30d` → lists what *would* be auto-dismissed; `--apply` performs it. (Implements the spec's 30-day auto-dismiss rule.)
- Hash-prefix matching: accept any unambiguous leading substring of a `dedupe_hash`; error clearly on ambiguous/no match.

### 4. Shared helper

- `scripts/jf_common.py`: `normalize()`, `dedupe_hash()`, `now_iso()`, record load/save with atomic writes (write temp + rename), and a `find_job_by_hash()` that scans both `Discovery/` and `JobHuntr/Applications/`.
- Both CLIs import from it. No duplicated logic.

## Constraints

- Python 3.10+, **stdlib only** — no new dependencies.
- Never modify `JobHuntr/prompt-library/`, `RUN.md`, `CLAUDE.md`, or existing `Applications/` content.
- Company/job folder names: sanitize for filesystem safety (`/`, `\0`, `:` → `-`); keep the existing `<Title - YYYY-MM-DD>` convention.
- All timestamps UTC ISO-8601.
- Every mutating command prints what it did (paths written, status changes). No silent writes.

## Non-goals (do not build)

Automated board scraping, scheduling/cron, the Scout/Direct paths, Bundle, Applier, follow-up, Lane 2, GUI, database. Phase 0 ends at: staged roles → queued job workspaces with configs.

## Acceptance criteria

- [ ] `rover.py add` twice with the same role (even with different casing/punctuation) → second rejected as `DUPLICATE`.
- [ ] A role already in `JobHuntr/Applications/` (pre-existing workspace) cannot be re-added via rover.
- [ ] `rover.py list` shows only `status=new` by default.
- [ ] `queue.py select` creates the workspace dirs + a valid `job-record.json` (`stage=queued`, config populated from flags) and flips the Discovery record to `queued`.
- [ ] `queue.py dismiss` + `purge --older-than 30d` behave per spec (dry-run lists, `--apply` acts).
- [ ] `Discovery/README.md` exists and accurately describes the flow.
- [ ] `python3 -m py_compile scripts/*.py` passes; both CLIs print `--help` cleanly.

## Suggested commit

Work on a branch `phase-0-discovery`. Commit message: `Phase 0: Discovery staging, Rover v1, select-to-queue CLI`.
