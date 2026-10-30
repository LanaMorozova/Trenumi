# Trenumi

*Working title adopted October 28, 2026 (previously "Fitness Coach App"). The repository directory name is unchanged.*

**Product status:** MVP discovery / requirements definition  
**Build model:** solo-built by one Product Designer using AI-assisted development — no engineering team  
**Document version:** 0.8 — October 29, 2026  
**Platforms:** iOS and Android mobile applications, plus a marketing landing page  
**Languages:** Ukrainian (uk-UA) and English (en) — both in the MVP  
**Primary market:** Personal gym trainers and online fitness trainers

## 1. Product overview

Trenumi is a subscription-based workout management platform for trainers and their clients. The interface is localized into Ukrainian and English from the MVP onwards. Trainers create and manage personalized training programs, assign them to clients, maintain an exercise library, and record or review client progress. Clients use the mobile application for free to view their individual training schedules, workout details, and exercise demonstrations.

The main product goal is to make building and updating client programs faster and more organized than using spreadsheets, documents, and messaging apps.

**MVP scope: workout management only.** Meal plans, nutrition tracking, recipe libraries, and built-in chat are excluded.

## 2. Users and access

### Trainer
- Creates a trainer account and accesses the product through a subscription with a free trial.
- Adds, invites, and manages clients.
- Creates, saves, reuses, assigns, and edits workout programs.
- Uses a built-in exercise library and can add custom exercises.
- Records client progress and views previous results.
- Receives relevant notifications.

### Client
- Uses the app free of charge after joining a trainer.
- Views assigned workouts, exercise instructions, demonstration videos, and a training calendar.
- Can view and edit permitted personal profile data.
- Is connected to **exactly one active trainer at a time**. The client can end the current relationship and move to another trainer; a single client account is never duplicated.
- In the MVP the client can mark a session done and optionally record actual weights and reps. **Comprehensive** self-logging (RPE, timers, supersets) stays out of scope.

**Access and privacy principle (decided):** A trainer can access only their own client relationships, programs, and progress. The trainer–client relationship is the permission boundary. Client profile information is shared with the trainer under the client's consent, and **sensitive health information requires separate explicit consent**. Trainers never see one another's data.

**Multiple simultaneous trainers per client is deferred to a future release.** The MVP must not introduce architectural limits that would make it hard to support later. See PRD §3.2.4.

## 3. Commercial model

- **Clients:** free access.
- **Trainers:** subscription-based access.
- **Free trial:** 14 days, up to 3 clients. *(Revised October 28, 2026 from 7 days / 2 clients, after competitor benchmarking — see PRD §14.)*
- **Clients after a relationship ends:** read-only access to previously assigned programs for 30 days; the account and history are not deleted. A client-purchased subscription for trainer-less access is a **future release**.
- **Positioning:** the intended differentiator is a **mobile-first workout builder** — making individual programs fast, simple and flexible to create and edit *from a phone*. This is a **hypothesis, not a validated advantage**, pending trainer interviews (see [RESEARCH_PLAN.md](RESEARCH_PLAN.md), H1) — see PRD §1.1.1.
- **Pricing, paid subscription tiers, payment provider, and behavior after trial expiry:** not decided yet.

## 4. MVP features

### Trainer onboarding and client management
- Sign up / sign in as a trainer.
- Create and manage client profiles.
- Client profile fields are expected to include name, age, gender, height, weight, **a single training goal owned by the client**, and optional health-related limitations. The trainer separately keeps an **experience level** assessment and free-text notes, scoped to their relationship — there is no second, parallel goal field. Exact requirements, permissions, and data minimization need to be defined in the PRD.
- Support invited clients connecting to an existing account; a client changing trainer reuses the same account.
- Profile field ownership is decided: the client owns identity, body metrics, stated training goal, and health information; each trainer owns their own assessment of goal and experience level plus private notes, scoped to their relationship. See PRD §3.4.
- The exact invitation flow (email, link, other options) remains to be finalized after reviewing competitors.

### Exercise library
- Ready-to-use exercise library with descriptions and **static illustrations** in both languages. **No built-in demonstration videos in the MVP**; trainers may attach external video links they have the right to use. A comprehensive video library is a future release.
- Trainer-created custom exercises.
- Exercise organization / search / filtering to be defined.
- Content licensing and sourcing of demonstration videos must be resolved before implementation.

### Workout program builder
- Build personalized training programs for a week, month, or another period.
- **Duplicate a training day and a whole week** — required for program building to be practical on a phone.
- Add training days and exercises in a selected order.
- Save programs as reusable templates and adapt them for other clients.
- Edit already assigned workout programs so clients see updated information.
- Training parameters (sets, reps, weight, rest, tempo, RPE/RIR, etc.) are **not yet finalized**.
- Whether schedules repeat weekly or support different workouts each week is **not yet finalized**.

### Client workout experience
- Training calendar with upcoming and past scheduled sessions; final status handling is open.
- Read-only access to workouts, exercise details, and videos.
- Notifications about relevant workout assignments or changes.
- Minimal client logging **is** in the MVP: mark done, plus optional actual weights and reps. This closes the feedback loop — without it the trainer cannot tell whether a session happened.
- **Both the trainer and the client can record results.** Entries are stored separately and attributed, so neither overwrites the other. Which entry leads when they disagree is a **proposed solution, not yet approved** — it will be settled during UX design. See PRD §6.6.1.
- **No guaranteed offline viewing or offline sync in the MVP.** Required instead: graceful handling of connectivity loss, clear offline and error states, a retry action, and no loss of data already saved. Offline viewing of the current week stays a P1 potential improvement.

### Progress
- Trainer can enter client exercise results and review progress over time.
- The client can see progress recorded about them. The trainer's private notes are a separate, trainer-only field and are never shown to the client.
- Detailed progress measurements, visualization, and historical editing rules are still to be designed.
- Avoid assuming that clients are required to log workout data themselves in the MVP.

### Localization
- The MVP ships **two languages: Ukrainian (uk-UA) and English (en)**.
- Both roles — Trainer and Client — get a fully localized interface.
- The default language follows the device settings; the user can change it in Settings, and the choice is saved.
- The landing page supports both languages.
- The localization architecture must make adding further languages straightforward.
- **Content localization is a separate task from interface localization:** the pre-populated exercise library needs names and descriptions in both languages, which is a sourcing and translation deliverable with its own cost and quality bar. Trainer-authored content is stored as entered and not translated.

### In-app feedback
- Send feedback from both roles: feature request, bug report, general feedback.
- Admin inbox with a type filter and New / In review / Planned / Resolved statuses.
- Minimal data collection, no health or training data — see §5.3.

### Notifications
- Notify users of relevant changes, such as new or updated workout programs.
- Notifications are sent in the recipient's chosen language.
- **Critical events** — program assigned, session changed, invitation, trial expiring — are delivered individually and immediately.
- **Non-critical client activity** — sessions marked done, results logged — is batched into a digest, so a trainer with 20+ clients is not flooded.
- Notification channels (push, in-app, email) remain to be defined.

## 5. Illustrative primary user flow (provisional)

1. Trainer registers and begins the 14-day trial (up to 3 clients).
2. Trainer adds a client and sends an invitation using a yet-to-be-finalized method.
3. Client accepts the invitation and accesses a free client account, completing or editing profile details as permitted and granting profile consent; health-information consent is a separate explicit step.
4. Trainer assembles a workout program using existing or custom exercises, optionally starting from a template.
5. Trainer assigns the program to the client and can update it later.
6. Client checks the calendar and opens workout details on their phone.
7. Trainer records results and reviews client progress.

The invitation sequence and the level of scheduling flexibility are provisional, pending further product decisions.

## 5.1 Marketing landing page — CONFIRMED, IN SCOPE

**[C]** Trenumi ships **two separate products**: the mobile application (iOS + Android) and a **marketing landing page**. Both are in scope.

**Purpose.** A standalone responsive marketing site aimed primarily at personal trainers. It explains Trenumi's value, interests the trainer and moves them to install the mobile app.

**Primary funnel:** Landing page → App Store / Google Play → install → coach onboarding → free trial → paid subscription.

**Clients do not arrive through the landing page.** They are invited by their trainer and go straight to the app. The site is a trainer-acquisition channel, not a client one.

### Planned sections

Hero with a clear value proposition · demonstration of the mobile app · key benefits for personal trainers · the workout builder as a headline capability · how Trenumi works · pricing and subscription plans · the 14-day free trial as the current business hypothesis · FAQ · App Store and Google Play download buttons · a QR code for desktop visitors where it helps · footer with the required legal links.

### Requirements

- Responsive: mobile, tablet, desktop.
- Localized: Ukrainian (`uk`) and English (`en`).
- Built on the approved brand kit in `brand/`, visually consistent with the mobile app.
- SEO-friendly architecture.
- Accessibility to WCAG 2.2 AA.
- Analytics on the core conversions: store click-throughs, and where feasible installs and trainer activation.
- **No invented App Store or Google Play links before publication.**

### Scope boundary

| Mobile application | Marketing website |
| --- | --- |
| Coach experience | Product presentation |
| Client experience | Trainer acquisition |
| Workout programs | Features and pricing information |
| Client management | Hand-off to the app stores |
| Progress tracking | |
| Subscription functionality | |

**[C]** No web dashboard and no web workout builder in the MVP. The landing page is marketing only.

**[C]** Treated as a **separate workstream** on the roadmap, started after the core mobile flows are agreed. Final copy, full section structure and the site's technical stack are not decided yet.

## 5.2 Product scope at a glance

### Confirmed MVP

| Area | Scope |
| --- | --- |
| **Mobile app — Coach** | Clients, programs, exercise library, progress, subscription |
| **Mobile app — Client** | Calendar, workouts, minimal logging, profile and consent |
| **Marketing landing page** | Trainer acquisition, hand-off to the app stores (§5.1) |
| **In-app feedback** | Three types, admin inbox, minimised data (§5.3) |
| **Internal admin / analytics** | Minimal — off-the-shelf tools preferred (§5.4) |

### Future / needs validation

| Area | Status |
| --- | --- |
| Advanced admin dashboard | Future — only once the minimal route proves limiting |
| Gym / organization subscriptions | Future — business hypothesis, unvalidated (§6) |
| Multiple trainers per client | Future release |
| Client-purchased subscription | Future release |
| AI-assisted workout editing | Future possibility |
| Nutrition, in-app chat | Excluded |

## 5.3 In-app feedback — CONFIRMED, IN SCOPE

**[C]** Both roles can send feedback from inside the app: **feature request**, **bug report** or **general feedback**, plus a free-text message.

**[C]** The administrator gets a **feedback inbox** — browse, filter by type, and set a status of **New / In review / Planned / Resolved** — so recurring problems and requests become visible.

**[C]** This is **not** an in-app chat and **not** a support platform. Replying to users from inside the product is out of the MVP.

**[C]** Minimal data only: type, message, timestamp, role, app version, platform, OS version, locale. **No name, no email field, no health or training data.** Whether a submission carries an account reference is an open decision — linking enables follow-up, anonymity encourages candour.

## 5.4 Internal admin and analytics — CONFIRMED, IN SCOPE (minimal)

**[C]** A closed, authenticated web surface for the platform owner, to monitor the business, activity, subscriptions and feedback.

**[C] Deliberately minimal for the MVP.** Off-the-shelf analytics plus a simple query surface, not a custom dashboard — a bespoke admin product is a second product, and this one has one builder.

**[C]** Tracked: registered and active coaches (DAU/WAU/MAU), registered and active clients, programs created, completed workouts, trial users, trial-to-paid conversion, active paid subscriptions, MRR, churn, and user feedback. **Exact definitions are fixed in PRD §6.12.1** — a metric defined later cannot be computed backwards, so instrumentation ships with the first release.

**[C]** Access is authenticated and role-based. **Administrators cannot read clients' private training data without a defined need and a lawful basis**, and access to personal or health-related records is logged.

## 6. Outside MVP / future opportunities

- Nutrition plans, recipes, and meal tracking — **excluded from MVP**.
- In-app trainer–client chat — **excluded from MVP**.
- AI assistant for trainers to create or modify workouts through natural-language instructions (e.g., “Add a workout to this client next Tuesday”) — **future possibility**, not an approved MVP requirement.
- Comprehensive client-driven workout logging — future consideration.
- **Gym / organization subscription** — a B2B model where a gym owner buys an organization subscription covering several trainers, invites and manages them, and may have its own billing and basic analytics. Each trainer still manages their own clients. **Pricing hypothesis, unvalidated: ~$100 per gym per month.** Open questions: seat count, seat-based vs flat-rate, organization roles, trainers who also hold individual subscriptions, client data ownership inside an organization, and billing management. Not in the MVP, but architecture should not foreclose it — see PRD §9.2.
- **Advanced admin dashboard** with charts, segments and cohorts — future, only once the minimal route proves limiting.
- **Multiple simultaneous trainers per client**, with a coach switcher and an explicit cross-trainer data-sharing model — **future release**, deliberately out of the MVP.
- **Client-purchased subscription** allowing a client to keep using previously assigned programs with no trainer — **future release**.
- Additional interface languages beyond Ukrainian and English.

## 7. Open product decisions

1. Final client invitation and account-linking flow.
2. Subscription tiers, pricing, and trial-expiration behavior. ~~Trial cap~~ **decided** — 14 days, up to 3 clients.
3. Required exercise parameters, including alternatives for strength and cardio.
4. Program scheduling: repeating weekly templates vs per-date workout customization.
5. Definition of trainer-entered progress data and how it is presented.
6. Calendar statuses and whether workouts can be marked complete in MVP.
7. ~~Permission and privacy model when a client has multiple trainers.~~ **Decided** October 28, 2026 — relationship-scoped isolation with one active trainer in the MVP; multi-trainer deferred. See PRD §3.2.
8. ~~Profile edit ownership and handling of sensitive health-related information.~~ **Decided** — see PRD §3.4. Residual: which profile fields are mandatory.
9. Exercise video sourcing, hosting, and licensing.
10. Notification channels and delivery rules.
11. Choice of technical stack and backend architecture.
12. Branding and launch market. ~~Product name~~ **decided** — **Trenumi**. Still open: visual identity, logo, and whether the name clears trademark and domain checks. ~~Localization~~ **decided** — Ukrainian and English in the MVP.
**Highest-priority remaining decision:** #4, the program scheduling model. The data model depends on it, so it should be settled before anything else.

**Newly raised by the localization requirement:** who produces the Ukrainian exercise library content, to what quality bar, and whether both languages must be complete at launch. Tracked as **#25** in PRD §13, together with #13–#28 raised while drafting the PRD.

Decisions 1–12 above are numbered identically in PRD §13. Decision numbers are permanent in both documents and are never reused.

## 8. Documentation workflow

- **README.md:** high-level product context and confirmed decisions.
- **PRD.md:** functional requirements, key user journeys, permissions, acceptance criteria, explicit MVP boundaries, and unresolved questions.
- **CLAUDE.md:** project-specific working instructions for Claude Code, including architectural invariants, and the verified tech stack and implementation conventions once decisions have been made.

### Language policy

| Context | Language |
| --- | --- |
| Communication with the product owner | Ukrainian |
| README.md, PRD.md, CLAUDE.md | English |
| Code, identifiers, technical terms, commit messages | English |
| UX/UI documentation in Figma | English |
| Application interface | Localized: Ukrainian + English |

**Decision log:** all settled product decisions, with dates, are recorded in PRD §14.

**Instructions for AI development:** Treat the defined MVP and exclusions as authoritative. Clearly distinguish confirmed decisions, suggested defaults, and open questions. Do not invent product behavior, business rules, technical dependencies, or pricing. Do not begin coding until requirements and the implementation approach have been reviewed.
