# CLAUDE.md — Working instructions for Trenumi

**Version:** 0.6 — October 29, 2026
**Project phase:** Product discovery and MVP definition. **No application code is to be written yet.**

---

## 0. Team reality — CONFIRMED

**This is a solo-built product.** The product owner is a **Product Designer**, not a professional engineer, and builds the entire application alone through Claude Code (AI-assisted development). There are **no backend developers, no frontend developers, no QA engineers, and no DevOps**, and none will be hired for the MVP.

What this changes about every recommendation:

1. **Propose only what one person can build *and maintain*** through Claude Code. Favour technologies with large, well-documented ecosystems over clever or niche ones.
2. **Prefer simple, reliable, boring solutions.** Managed services over self-hosted infrastructure. One stack over three.
3. **Avoid unnecessary technical complexity**, custom infrastructure, and premature optimization. Scale problems this product does not have yet are not problems.
4. **Judge every feature on four axes**, not two: UX value, business value, **implementation cost**, and **long-term maintenance burden for one person**.
5. **Never assume a team.** No "hand this to the backend team", no "QA will catch it", no process that needs a second pair of hands.
6. **Help beyond code**: architecture planning, environment setup, testing, debugging, and preparing for App Store and Google Play release.
7. **Proactively recommend automated tests and security checks** for the critical paths — authorization, payments, and personal data. With no QA, a regression ships unless a test catches it. The invariant tests in §4.5 are not optional.
8. **Do not over-simplify the MVP into uselessness.** Simplicity is a means, not the goal: the product must still be genuinely valuable to a working trainer. Cutting the thing that makes it worth using is not a simplification, it is a failure.

Scope and architecture proposals must state the **solo-build cost** explicitly, so the trade-off is visible before it is accepted.

---

## 0.1 Language policy — CONFIRMED

| Context | Language |
| --- | --- |
| Communication with the product owner — explanations, questions, research, recommendations | **Ukrainian** |
| README.md, PRD.md, CLAUDE.md | **English** |
| Code, variable/component/function names, technical terms, commit messages | **English** |
| UX/UI documentation in Figma | **English** |
| Application interface | **Localized: Ukrainian (uk-UA) + English (en)** |

Talk to the product owner in Ukrainian. Write the artifacts in English. Do not mix the two inside one document.

---

## 1. Document hierarchy

Read in this order. On conflict, the higher document wins.

1. **[README.md](README.md)** — product context and confirmed decisions. **Primary source of truth.** Do not edit without asking.
2. **[PRD.md](PRD.md)** — requirements, flows, permissions, acceptance criteria, open decisions.
3. **CLAUDE.md** (this file) — how to work in this repository.
4. **Figma file "Coach"** — UX research and product discovery (competitor analysis, personas, journeys, information architecture), in English. The **Design System page is never modified**. Research informs decisions; it does not override README or PRD.

If a requirement is not in README.md or PRD.md, it does not exist. Do not infer it from a competitor, a convention, or a plausible-sounding user need.

---

## 2. Non-negotiable working rules

1. **Do not implement the application yet.** Architecture, user flows, and UI/UX are reviewed before any code. If asked to build something, confirm that the review has happened.
2. **Do not invent requirements.** No product behavior, business rule, pricing, limit, or copy that is not in README.md or PRD.md.
3. **Do not make major technical decisions alone.** Stack, database, hosting, auth provider, payment provider, state management, navigation library, analytics, video hosting — all require explicit approval. Propose options with trade-offs; wait for a decision.
4. **Label everything.** Use the PRD's labels in any document you write or edit: **[C]** confirmed, **[A]** assumption, **[O]** open. Never present an assumption as a requirement.
5. **Surface, don't resolve.** When you hit an open decision mid-task, do everything that does not depend on it, then state the question. Do not pick a default silently.
6. **Never overwrite README.md** without asking first.
7. **MVP boundary is authoritative.** Nutrition, meal plans, recipes, in-app chat, AI workout generation, and full client-side workout logging are out of scope. Do not scaffold, stub, or "leave room for" them unless asked.
8. **Keep docs in sync.** When a decision is made, update the PRD requirement, flip its label to **[C]**, record it in PRD §14 Decision log, and mark it RESOLVED in PRD §13 in the same change.
9. **No hard-coded user-facing strings.** Every string a user can read goes through the message catalog, in both `uk-UA` and `en`, from the first screen onwards. A string added "temporarily" in English is a string someone has to hunt down later.
10. **Keep multi-trainer support open.** The MVP has one active trainer per client, but the data model must not assume it. See §4.

---

## 3. Technical stack — UNDECIDED

**[O]** README decision 11 / PRD NFR-10. Nothing here is chosen.

Do not add a dependency, create a config file, initialize a package manifest, or scaffold a project directory until this section records an approved stack.

To be decided, with proposals to be presented at the architecture review:

| Area | Status |
| --- | --- |
| Mobile framework (cross-platform vs. native) | **[O]** — two separate native codebases are almost certainly out: one person cannot maintain both (§0) |
| Backend (managed BaaS vs. custom API) | **[O]** |
| Database | **[O]** |
| Authentication | **[O]** |
| Media/video hosting and delivery | **[O]** — also a licensing question, PRD D1 |
| Push notifications | **[O]** |
| Payments / subscriptions (incl. app-store IAP policy, PRD §8.3) | **[O]** |
| Landing page stack and hosting | **[O]** |
| Analytics and crash reporting | **[O]** |
| Localization library and message-catalog format | **[O]** — must satisfy FR-LOC-07/10: externalized catalogs and correct Ukrainian plural categories |
| CI, testing frameworks, release tooling | **[O]** |

**Solo-build constraints on this decision (§0):** managed backend over self-hosted; one language across app and backend if possible; authorization enforceable declaratively rather than re-implemented per endpoint; subscriptions through a service that handles App Store and Google Play billing rather than hand-rolled receipt validation; no infrastructure requiring ongoing ops work.

Constraints the stack must satisfy (derived from confirmed requirements, so these are inputs to the decision, not decisions themselves):

- iOS **and** Android from one codebase or two — must support both. **[C]**
- Server-side authorization scoped per trainer–client relationship. A client-side-only permission model is not acceptable. **[C]** principle, **[A]** mechanism
- One active trainer per client in the MVP, enforced as an invariant, with the model still able to admit several later. **[C]** See §4.
- Full interface localization into Ukrainian and English for both roles, plus a bilingual landing page, with new languages addable without touching screen code. **[C]**
- Per-locale content for the exercise library, separate from UI strings. **[C]**
- Streaming video playback on mobile. **[C]**
- Push-capable. **[C]**
- Trainer-side editing of structured, nested, reorderable content (programs → days → exercises) — the most demanding UI in the product.

**Once the stack is approved:** replace this section with the decided stack, versions, and the reasoning, and add a `docs/adr/` entry per significant decision.

---

## 4. Architectural invariants — CONFIRMED

These come from settled product decisions (PRD §3.2.4, §6.9). They are cheap to honour now and expensive to retrofit. Treat a violation as a defect, not a preference.

### 4.1 Relationship is the permission boundary

- `Relationship` is a **first-class entity**. Never put `trainer_id` on the client profile. "The client's trainer" is not a property of the client.
- Programs, assignments, sessions, progress, consent, and trainer assessments are keyed by **`relationship_id`**, never by `client_id` alone.
- **One active trainer per client** is an **invariant** — at most one relationship per client in `active` status — not a schema shape. Lifting it later must be a rule change, not a migration.
- Authorization always answers "does this account own this relationship". Never trust a client-supplied `client_id`, `program_id`, or `relationship_id`; re-derive access from the authenticated session.
- The authorization check lives at **one chokepoint**, not repeated per endpoint. Repeated checks are where the one missing check lives.
- No UI assumption that a client has one trainer may leak into data or API shapes. Workout queries carry a relationship context even though the MVP always resolves it to one.

### 4.2 Program access is a rule, not a status check

- Never express access as `relationship.status == 'active'`. Resolve it through an access rule that today admits an active relationship **or** an ended one within its 30-day read-only window, and can later admit a client-held subscription.
- Do **not** build, stub, flag, or schema anything for client-purchased subscriptions. The constraint is "do not preclude", not "prepare for". Rule 7 in §2 still applies.

### 4.3 Platform guidelines — CONFIRMED

**[C]** Trenumi is designed and built to the **official Apple Human Interface Guidelines**, the **App Store Review Guidelines**, and **Android accessibility guidance** (Material / Android a11y). These are requirements, not references: an App Store rejection costs a release cycle, and a solo build has no slack for one.

**[C]** Touch targets on mobile: **48 x 48 minimum** wherever practical. Apple asks 44x44 pt, Android asks 48x48 dp — targeting 48 satisfies both at once. This covers buttons, icon buttons, selection controls (checkbox, radio, switch) and interactive chips.

**[A]** The visual element may be smaller than its target: an icon of 20–24 px inside a 48 x 48 tappable area is correct and expected. Extend the target with padding or `hitSlop`, not by enlarging the graphic.

**[C]** Button sizes and platforms:

| Size | Height | Radius | Platform |
| --- | --- | --- | --- |
| SM | 40 | 16 | **Desktop only** — never in the mobile app |
| MD | 48 | 18 | Mobile + desktop — smallest standard size on mobile |
| LG | 56 | 20 | Mobile + desktop |

**[A]** Other platform obligations already identified, to re-check before submission: in-app purchase for subscriptions, an in-app account-deletion path, a public privacy policy, accurate privacy declarations for health-related data, and working demo credentials for both roles at review time (PRD §8.3).

### 4.4 Localization

- No user-facing string in code. Catalogs for `uk-UA` and `en` from day one.
- No sentences built by concatenating fragments — Ukrainian grammatical case and gender break this.
- Plurals go through a locale-aware plural API. Ukrainian has three plural categories; English has two. A `count === 1 ? a : b` branch is a bug.
- Dates, numbers, weekday and month names are formatted per locale, never hand-built.
- UI strings and **content** (exercise library text) are separate systems. Library entries carry per-locale name and description; trainer-authored content is stored as entered and never machine-translated.
- Missing translation falls back to English, never to a raw key or an empty string.
- The user's locale is stored on the account so server-sent notifications and emails match it.

### 4.5 Testing these invariants

**[A]** When code starts, these are the tests worth writing before the feature tests:
- A trainer cannot read or write anything belonging to a relationship they do not own.
- A client cannot see another client's data, and cannot see trainer private notes.
- A trainer loses access the moment a relationship ends; the client keeps read access for exactly 30 days and not longer.
- The one-active-relationship invariant holds under a client accepting a new invitation.
- Health information is inaccessible without explicit health consent, and revoking consent takes effect immediately.
- Every screen renders in both `uk-UA` and `en` with no missing keys.

---

## 4.6 Two products, one scope — CONFIRMED

**[C]** Trenumi ships **two products**, and they must not be confused when scoping work:

| Mobile application (iOS + Android) | Marketing landing page |
| --- | --- |
| Coach and client experience | Product presentation |
| Workout programs, client management | Trainer acquisition |
| Progress tracking, subscriptions | Features and pricing information |
| All product functionality | Hand-off to the app stores |

**[C]** The landing page is a **separate workstream**, bilingual (uk/en), responsive, built on the brand kit in `brand/`, WCAG 2.2 AA, SEO-friendly. It targets **trainers only** — clients arrive by trainer invitation, never through the site.

**[C]** **No web dashboard and no web workout builder in the MVP.** A request to build product functionality on the web is out of scope until that changes.

**[C]** **Never invent App Store or Google Play links.** They do not exist until the apps are published; a placeholder that looks real is worse than an obvious one.

---

## 4.7 Keeping the organization model open — CONFIRMED CONSTRAINT

**[C]** Gym / organization subscriptions are a **future** direction (PRD §9.2). They are **not** built in the MVP, and no organization entity, field or flag is to be created now.

**[A]** Two choices keep that door open at zero cost today. Both are about *not* assuming, rather than *adding*:

1. **A subscription belongs to a payer, not to a trainer.** `Subscription` is already a separate entity — keep it that way, and never infer entitlement by walking from `TrainerProfile` to a plan. Who pays and who is entitled are different questions; an organization answers them differently from an individual.
2. **Entitlement is a check, not a column.** "Can this trainer add a client?" resolves through a rule that reads the active subscription. Today it finds a personal one; later it may find an organization's. Do not cache the answer on the trainer record.

**[A]** What **not** to do now: no `organization_id`, no nullable org fields "just in case", no role enum with unused values. Speculative structure is the expensive kind of flexibility; the two rules above are the cheap kind.

---

## 4.8 Metrics instrumentation — CONFIRMED

**[C]** The metric definitions in PRD §6.12.1 are fixed, and **instrumentation ships with Phase 1**. A metric that was not recorded cannot be reconstructed afterwards.

**[A]** Practical consequences:
- Emit events for the actions that define an *active* user — program created, edited, assigned, duplicated; client added or invited; progress recorded; session opened; session marked done. Opening the app is not one of them.
- Never put health data, training values or free-text notes into an analytics event (§4.3 and PRD §3.3).
- Subscription state transitions come from the payment provider, not from app code guessing. Choose a provider that reports MRR, churn and trial conversion rather than computing them by hand.

---

## 5. Repository layout

**[O]** Not decided; depends on §3. Current contents:

```
README.md     product context — source of truth
PRD.md        product requirements
CLAUDE.md     this file
```

**[A]** Proposed, pending the stack decision:

```
apps/mobile/        iOS + Android application
apps/landing/       marketing landing page
packages/shared/    shared types, validation, domain logic (if the stack allows)
services/api/       backend, if a custom backend is chosen
docs/adr/           architecture decision records
docs/design/        flows, wireframes, UI specs
```

Do not create these directories yet.

---

## 6. Domain language

Use these names consistently in documents, code, and UI copy. They are defined in PRD §14.

`Account` · `TrainerProfile` · `ClientProfile` · `Relationship` · `Consent` · `TrainerAssessment` · `Exercise` · `CustomExercise` · `Program` · `ProgramDay` · `ProgramItem` · `Template` · `Assignment` · `Session` · `ProgressEntry` · `Subscription` · `Notification`

Specifically:
- Say **relationship**, not "client of trainer", when scoping permissions. A relationship is the permission boundary. **[A]**
- A **template** is a `Program` with `is_template = true`, not a separate entity. **[A]**
- A **session** is a dated instance a client sees; a **program day** is the authored definition. Do not conflate them. **[A]**
- "Workout" is user-facing copy, not a model name. Map it to `Session` or `ProgramDay` depending on context. As user-facing copy it is also a translated string, never a literal.
- The client's **stated goal** (client-owned, on `ClientProfile`) and the trainer's **assessed goal** (on `TrainerAssessment`, relationship-scoped) are two different fields. Never collapse them. **[C]**
- `Consent` has two independent grants: general profile and health information. Never one flag. **[C]**

---

## 7. Conventions (apply once code exists)

### Code
- Match the surrounding code. Do not introduce a second style in a file.
- Code, identifiers, comments, and commit messages in English (§0).
- Prefer explicit over clever. This is a product that must be maintainable by one or two people.
- No dead code, no commented-out blocks, no `TODO` without an owner and a reason.
- Comments explain *why*, not *what*. No comment restating the line beneath it.
- Every nullable/optional field exists for a stated reason. Prefer making the model say what is true.
- No feature flags or abstraction layers for out-of-scope features (rule 7 in §2).

### Naming
- Files and directories: kebab-case. **[A]**
- Types/components: PascalCase. Functions/variables: camelCase. Constants: SCREAMING_SNAKE_CASE. **[A]**
- Database identifiers: snake_case. **[A]**
- Booleans read as predicates: `is_template`, `has_accepted`, not `template`, `accepted`.

### Validation and errors
- Validate at every trust boundary, server-side, even when the client already validated.
- Never trust a client-supplied account, relationship, or program id — always re-derive authorization from the authenticated session.
- Error messages shown to users: plain, actionable, no stack traces, no internal ids.

### Privacy in code
- Health limitations, injuries, weight, and progress values are sensitive (PRD §3.3). They must not appear in logs, analytics events, crash reports, error messages, URLs, or push-notification payloads.
- Health information is readable only with explicit health consent on the current relationship. Consent is checked at read time, not cached at assignment time.
- Trainer private notes are never serialized into any client-facing response.
- Secrets never in the repository, never in a client bundle. Use environment configuration from day one.

### Testing
- **[A]** Minimum bar when code starts: the invariant tests in §4.5, plus program-to-session resolution and subscription/trial limit enforcement. These are where a bug is most expensive.
- Test behavior, not implementation details. A test that only restates the code earns nothing.

### Git
- **[O]** Repository is not initialized yet. Ask before running `git init`.
- **[A]** Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`). One logical change per commit.
- **[A]** Branch per change, no direct commits to the default branch.
- Do not commit or push unless asked.

---

## 8. Definition of done (per change, once implementation begins)

1. Satisfies a numbered PRD requirement; the requirement ID is named in the change description.
2. The requirement is not marked `BLOCKED` in the PRD.
3. Authorization is enforced server-side and scoped by relationship (§4.1).
4. No sensitive data leaked into logs, analytics, or notifications; health data gated on consent.
5. Loading, empty, and error states exist for every screen touched.
6. Every new user-facing string exists in both `uk-UA` and `en`; the screen was checked in Ukrainian, where text is longest.
7. Tested per §7 and §4.5.
8. Any assumption made is recorded in the PRD with an **[A]** label, not left in the code.

---

## 9. What requires asking the user first

- Writing any application code before the architecture and design review.
- Editing README.md.
- Choosing or adding any dependency, framework, or third-party service.
- Initializing git, a package manifest, or a project scaffold.
- Resolving any **[O]** decision.
- Adding a third language, or shipping a screen in only one language.
- Adding a feature, field, screen, or endpoint not traceable to a PRD requirement.
- Anything touching pricing, legal text, privacy policy, or app-store declarations.
- Committing, pushing, or publishing anything.

---

## 10. Current state

- README.md — **[C]** v0.3. Updated October 28, 2026 with the single-active-trainer model and the localization requirement.
- PRD.md — **[A]** draft v0.3, awaiting review. 102 numbered requirements.
- CLAUDE.md — this file, v0.2. §3 and §5 remain placeholders until the stack is decided.
- No code, no repository, no dependencies, no design assets.

### Settled so far (PRD §14 Decision log)

- Permission model: relationship-scoped isolation, **one active trainer per client** in the MVP; multiple trainers, cross-trainer sharing and the Coach Switcher deferred to a future release, without architectural lock-in (§4.1).
- Goal and experience level split: client states, trainer assesses.
- Client can see progress recorded about them; trainer private notes stay private.
- Relationship end: trainer access revoked immediately, client read-only for 30 days, nothing auto-deleted. Client-purchased subscriptions deferred, must not be precluded (§4.2).
- Localization: Ukrainian (uk-UA) + English (en) in the MVP, both roles and the landing page (§4.3).
- One role per account in the UI; the model stays capable of both.

### Still open before implementation

P0 blockers from PRD §13: **#4** program scheduling model (weekly pattern vs. per-date sessions — the central modeling question), **#3** exercise parameters, **#9** exercise video sourcing and licensing, **#25** who produces the Ukrainian exercise library content, **#11** technical stack, **#1** invitation mechanism, **#2** pricing and trial-expiry behavior, **#10** notification channels, **#6** calendar statuses.

**Next gate:** review the PRD assumptions, close the P0 open decisions, then review user flows and UI/UX in Figma. Implementation starts only after that.
