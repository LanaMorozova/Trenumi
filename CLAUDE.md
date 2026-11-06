# CLAUDE.md — Working instructions for Trenumi

**Version:** 0.10 — November 4, 2026
**Project phase:** Product discovery and MVP definition. **No application code is to be written yet.**

---

## Context

Trenumi is a training-management product for personal trainers: workout programming, client management, progress tracking and subscriptions. Clients never sign up on their own — they arrive by trainer invitation, and every permission resolves through the trainer–client relationship, never through the client alone.

It ships as **two products**: a mobile application for coaches and their clients (iOS + Android), and a marketing landing page that acquires trainers. There is no web dashboard and no web workout builder in the MVP (§4.6).

It is **built by one person** — a product designer, not a professional engineer — entirely through Claude Code. Every proposal is judged on four axes, maintenance burden for one person included, not on product value alone (§0).

Current phase: **product discovery and MVP definition. No application code is written yet**, and the technical stack is still open (§3).

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
4. **Figma file "Trenumi"** (`gYz2eydZiQ5ezFcutqS6DL`), in English. It now holds three different kinds of material, and they have different rules:
   - **Research pages** — competitor analysis, personas, journeys, IA. **Read-only.** They inform decisions; they do not override README or PRD.
   - **`🧩 UI Kit`** — the design system: variables, text styles, Main Components and their documentation sidebars. This is where components are built and changed.
   - **`📱 Mobile App`** — product screens and their UI states. No Main Components live here.

   Product screens are never built on the UI Kit page, and components are never built on the Mobile App page.

If a requirement is not in README.md or PRD.md, it does not exist. Do not infer it from a competitor, a convention, or a plausible-sounding user need.

---

## 2. Non-negotiable working rules

1. **Do not implement the application yet.** Architecture, user flows, and UI/UX are reviewed before any code. If asked to build something, confirm that the review has happened. The learning prototype in §4.11 is the one exception, and it is not product code.
2. **Do not invent requirements.** No product behavior, business rule, pricing, limit, or copy that is not in README.md or PRD.md.
3. **Do not make major technical decisions alone.** Stack, database, hosting, auth provider, payment provider, state management, navigation library, analytics, media hosting — all require explicit approval. Propose options with trade-offs; wait for a decision.
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
| Illustration asset hosting and delivery | **[O]** — also a licensing question, PRD D1. Video hosting is **out of the MVP**, so this is image delivery only |
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
- Display **static illustrations** for the exercise library, and open a trainer's external video link out of the app. **No video hosting, encoding, storage or in-app player in the MVP** — README §61, PRD FR-EX-01 / FR-EX-08, and FR-EX-09 withdrawn. **[C]**
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

**[C]** Touch targets on mobile: **48 x 48 minimum**, with no exceptions to be decided case by case. A target that cannot reach 48 is a design problem to raise, not a judgement call to make locally. Apple asks 44x44 pt, Android asks 48x48 dp — targeting 48 satisfies both at once. This covers buttons, icon buttons, selection controls (checkbox, radio, switch) and interactive chips.

**[A]** The visual element may be smaller than its target: an icon of 20–24 px inside a 48 x 48 tappable area is correct and expected. Extend the target with padding or `hitSlop`, not by enlarging the graphic.

**[C]** Button sizes and platforms:

| Size | Height | Radius | Platform |
| --- | --- | --- | --- |
| SM | 40 | 16 | **Desktop only** — never in the mobile app |
| MD | 48 | 18 | Mobile + desktop — smallest standard size on mobile |
| LG | 56 | 20 | Mobile + desktop |

**[C]** Button labels are **Manrope SemiBold 600**, through the text styles `Label/SM` (14/20) and `Label/MD` (16/24). These differ from `Body/SM` and `Body/MD` in weight only. This is a rule for buttons and control labels, not a change to application typography: the `Body/*` styles stay Regular 400 and are used by everything else.

**[A]** Figma picks a component set's default variant by canvas position and the plugin API cannot override it, so the Button set reports `Size=SM` as its technical default. That is a Figma artefact, not the product rule: on mobile, set `Size=MD` explicitly. Full reasoning in `docs/design-system/buttons.md`.

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

## 4.9 Component library presentation — CONFIRMED

**[C]** Every component group in the Figma library follows one layout:

| Left | Right |
| --- | --- |
| Documentation sidebar | Component gallery |
| Overview, Usage Rules, Variants & Hierarchy, Accessibility, Focus & Disabled Behavior, Technical Notes / Known Limitations | Main Component Sets, variant matrices, configurations, icon and localisation examples, short captions |

**[C]** Prose belongs in the sidebar, not under the components. No large usage-rule cards beneath a component set when the text fits in the sidebar, and the same text never appears in both places.

**[C]** Sidebar: white surface, `radius/xl` (20), auto layout, height hugging its content, no decorative shadows, consistent padding. Headings use the existing type scale; documentation never introduces new application typography.

**[C]** Detail that does not fit the sidebar goes to `docs/design-system/<component>.md` in the repository, and the sidebar points to it.

**[A]** Adapt the documentation headings to each component group rather than copying the Button matrix literally — a Checkbox needs different sections from a Card.

---

## 4.10 Screen layout rhythm — CONFIRMED

**[C]** Every Trenumi screen is built from **section containers**. A section is one Auto Layout frame that holds its own heading *and* its own content. A heading is never a loose sibling of the block it names, because then the eye attaches it to whatever sits above it.

**[C]** Three gaps, and only three:

| Gap | Where | Token |
| --- | --- | --- |
| 12 | Section heading → section content | `space/12` |
| 12 | Between cards of the same kind inside a section | `space/12` |
| 24 | Between one section and the next | `space/24` |

**[C]** 16 (`space/16`) is the default *internal* padding of a card, where the card's own component allows it. It is a card value, not a screen value, and it does not take part in the rhythm above.

**[C]** The between-section gap is always larger than the heading-to-content gap. That difference is the whole mechanism: it is what makes a heading read as belonging to the block below it.

**[C]** A section heading's **visual height is its title** — 24 — even when it carries a control on the right. The control is laid out at its own content height and centred on the title; its 48 touch target is a transparent hit area that overflows into the surrounding gaps. A control that is 48 *in the layout* inflates the heading and doubles the apparent gap beneath it.

**[C]** Every gap, padding and radius is bound to a Figma Variable. A typed number that happens to equal a token is a defect, not a shortcut — it survives a token change and silently drifts.

**[C]** Do not create duplicate tokens. A value no token carries is a token decision, not a local override.

### Navigation arrows — CONFIRMED

**[C]** One arrow for internal navigation across the whole product:

| Arrow | Container | Size | Meaning |
| --- | --- | --- | --- |
| `chevron-right` | none | 16 | every internal navigation and drill-down |

**[C]** It is a bare `chevron-right` at 16, bound to the surface's secondary foreground, and it applies to every clickable card or row that opens another screen — quick actions, KPI cards, list rows, inline links.

**[C]** Arrows with a meaning of their own are untouched: `chevron-down` for dropdowns, back arrows, and external-link arrows keep their own icons. This rule is about internal navigation, not about every arrow in the product.

**[A]** The earlier rule giving Quick Actions a circled `arrow-up-right` was withdrawn on October 30, 2026.

**[C]** An element that is not tappable gets no arrow at all. A decorative arrow is a false affordance.

**[C]** Where a whole card is the tap target, the arrow is an indicator and not a separate control. Its own size is irrelevant to the 48 x 48 rule in §4.3; the card is what must satisfy it.

---

## 4.11 Learning prototype sandbox — CONFIRMED

**[C]** A separate learning UI prototype is built during a four-week course. It is **not** the Trenumi MVP, and it must not become one by accident.

| | Product | Learning prototype |
| --- | --- | --- |
| Repository | `LanaMorozova/trenumi` | `trenumi-ui-lab` — separate, **not created yet** |
| Holds | README, PRD, design documentation, future production code | course exercises and UI experiments |
| Stack | **[O]** undecided, §3, needs approval | React + TypeScript + Vite + Storybook, Figma design tokens, GitHub PRs, live deployment — **the course sets this, it is not a §3 decision** |
| Status | the product | teaching material |

**[C]** The prototype's stack is **not** an architecture decision for Trenumi. §3 stays open and still requires approval; nothing in `trenumi-ui-lab` sets a precedent for the MVP.

**[C]** The prototype consumes the real Trenumi design system — variables, typography, colours, spacing, radius, components — through Figma design tokens. It may **read** the design system; it may not reshape it. **Do not change a Main Component in Figma for the prototype's sake without asking.**

**[C]** Constraints:

- **No real client data, ever.** Fictional names only, as in the Dashboard demo data.
- A limitation of the course project never changes a product requirement. If the prototype cannot do something, that is a fact about the prototype, not about Trenumi.
- README.md and PRD.md are not edited because of the prototype.
- Rule 1 in §2 stands unchanged for the product: the architecture and UX review still gate production code.

**[C]** As of October 30, 2026 the repository does not exist and no prototype code has been written. Ask before creating either.

---

## 5. Repository layout

**[O]** The application layout is not decided; it depends on §3. Current contents:

```
README.md              product context — source of truth
PRD.md                 product requirements
CLAUDE.md              this file
RESEARCH_PLAN.md       hypotheses, interview guide, decision rules
.gitignore             secrets, macOS noise, future build output
brand/                 brand kit as delivered — logos, app icons, splash,
                       app store concepts, brandbook, colour tokens
docs/design-system/    component reference, written as components are built
.claude/               agents and skills used in this repository
```

**[C]** The repository is live at **github.com/LanaMorozova/trenumi** and is **public** — it is part of the product owner's portfolio. It is the **product** repository. The learning prototype gets its own repository, `trenumi-ui-lab` (§4.11), which does not exist yet; course code never lands here. GitHub and the Figma file "Trenumi" are the two sources of truth for current state: documentation and tokens in the repository, components and their visual documentation in Figma.

**[C]** Because the repository is public, the rules that assumed a private one now bind in the open: no real client data anywhere in the tree (§4.11), no secrets in the repository or in any example file (§7), and no personal data in a commit message. Anything written here is published the moment it is pushed.

**[C]** `brand/` is named as it arrived on disk, including the nested `brand/brand/`. Do not rename it without asking.

**[A]** Still proposed, pending the stack decision:

```
apps/mobile/        iOS + Android application
apps/landing/       marketing landing page
packages/shared/    shared types, validation, domain logic (if the stack allows)
services/api/       backend, if a custom backend is chosen
docs/adr/           architecture decision records
```

Do not create these directories yet. `docs/design-system/` is the exception already made: it holds the long-form technical reference for components that exist in Figma, which does not depend on the stack.

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
- **[C]** The repository is live: `github.com/LanaMorozova/trenumi` (**public**, §5), default branch `main`, remote `origin` configured.
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
- Creating the `trenumi-ui-lab` repository or writing any prototype code (§4.11).
- Changing a Figma Main Component for the learning prototype's benefit (§4.11).

---

## 9.1 What NOT to do — quick reference

A digest of the hard prohibitions stated above, gathered in one place. Each line names the section that owns it; **where a line and its section differ, the section wins** — this list is a reminder, not a second source of truth. This resolves disagreements *inside this file* only; conflicts *between documents* are resolved by §1.

### Process
- Do not write application code yet — architecture and UX are reviewed first (§2)
- Do not invent requirements: if it is not in README.md or PRD.md, it does not exist (§1, §2)
- Do not decide stack, database, hosting, auth or payment provider alone (§2, §3)
- Do not present an assumption as confirmed — label everything [C] / [A] / [O] (§2)
- Do not resolve an open question silently: do everything that does not depend on it, then ask (§2)
- Do not edit or overwrite README.md without asking (§1, §2)
- Do not commit or push unless asked (§7)

### Scope
- Do not build product functionality on the web — no dashboard, no workout builder in the MVP (§4.6)
- Do not pull nutrition, meal plans, recipes, in-app chat, AI workout generation or full client-side logging into the MVP (§2)
- Do not invent App Store or Google Play links — they do not exist until the apps are published (§4.6)
- Do not assume a team: no "hand this to backend", no "QA will catch it" (§0)
- Do not over-simplify into uselessness — simplicity is a means, not the goal (§0)

### Data model and authorization
- Do not put `trainer_id` on the client profile — the relationship is the entity (§4.1)
- Do not key programs, sessions or progress by `client_id` alone (§4.1)
- Do not trust a client-supplied `client_id`, `program_id` or `relationship_id` (§4.1)
- Do not express access as `relationship.status == 'active'` — resolve it through the access rule (§4.2)
- Do not infer entitlement from the trainer — a subscription belongs to a payer (§4.7)
- Do not put health data, training values or free-text notes into an analytics event (§4.8)

### Design
- Do not type a number a token already carries — it is a defect, not a shortcut (§4.10)
- Do not create a duplicate token: a value no token carries is a token decision (§4.10)
- Do not leave a section heading as a loose sibling of the block it names (§4.10)
- Do not build product screens on the UI Kit page, or components on the Mobile App page (§1)
- Do not use SM spacing in the mobile app — it is desktop only (§4.3)
- Do not hand-build dates, numbers, weekday or month names — format them per locale (§4.4)
- Do not fall back to a raw key or an empty string on a missing translation (§4.4)

### Language
- Do not mix Ukrainian and English inside one document (§0.1)

---

## 10. Current state

- README.md — **[C]** v0.8, October 29, 2026.
- PRD.md — **[A]** v0.8, draft for review, October 29, 2026. 148 numbered FR/NFR requirements.
- CLAUDE.md — this file, **[C]** v0.10, November 4, 2026. §3 remains a placeholder until the stack is decided.
- Coach Dashboard delivered in five states on `📱 Mobile App`, awaiting final approval. No other product screen is designed yet.

### Design system — current state

| | |
| --- | --- |
| Variable collections | `_Primitives` (Value) · `Semantic Colors` (Light / Dark) · `Sizes` (Mobile / Tablet / Desktop) · `Language` (en / uk) |
| Text styles | `Caption/XS` · `Body/SM` · `Body/MD` · `Label/SM` · `Label/MD` · `Heading/SM·MD·LG` · `Display/SM·LG` |
| Main components | 17 component sets — Button, Icon Button, Text Field, Textarea, Card, List Item, Checkbox, Radio, Switch, Chip, Badge, Bottom Navigation, Stat Card, Quick Action, Time Tab, Schedule Row, Avatar — plus the single `Notification Badge` component |
| Repository reference | `docs/design-system/` — `buttons.md`, `section-layout.md`, `dashboard.md` |

The repository files carry the measurements, the reasoning and the known limitations. **Do not restate component documentation here** — this table is an index, and the detail lives in `docs/design-system/`.
- No application code and no dependencies. The repository is live (§5) and the brand kit and component library exist.

### Settled so far (PRD §14 Decision log)

- Permission model: relationship-scoped isolation, **one active trainer per client** in the MVP; multiple trainers, cross-trainer sharing and the Coach Switcher deferred to a future release, without architectural lock-in (§4.1).
- Goal and experience level split: client states, trainer assesses.
- Client can see progress recorded about them; trainer private notes stay private.
- Relationship end: trainer access revoked immediately, client read-only for 30 days, nothing auto-deleted. Client-purchased subscriptions deferred, must not be precluded (§4.2).
- Localization: Ukrainian (uk-UA) + English (en) in the MVP, both roles and the landing page (§4.3).
- One role per account in the UI; the model stays capable of both.

### Still open before implementation

P0 blockers from PRD §13: **#4** program scheduling model (weekly pattern vs. per-date sessions — the central modeling question), **#3** exercise parameters, **#9** exercise **illustration** sourcing and licensing (scope reduced October 28, 2026 — video removed from the MVP), **#25** who produces the Ukrainian exercise library content, **#11** technical stack, **#1** invitation mechanism, **#2** pricing and trial-expiry behavior, **#10** notification channels, **#6** calendar statuses.

**Next gate:** review the PRD assumptions, close the P0 open decisions, then review user flows and UI/UX in Figma. Implementation starts only after that.
