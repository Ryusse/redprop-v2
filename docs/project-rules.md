# PROYECT RULES & AI BEHAVIOR

This file defines the mandatory standards for any developer or AI assistant working on this repository.

## 1. Versioning Standards (SemVer)
We strictly follow [Semantic Versioning 2.0.0](https://semver.org/).
- **Major (X.y.z):** Incompatible API changes.
- **Minor (x.Y.z):** Functionality in a backwards compatible manner.
- **Patch (x.y.Z):** Backwards compatible bug fixes.

**Automation:**
- Releases are handled by `standard-version`.
- **NEVER** update `package.json` version manually.
- **ALWAYS** use `npm run release`.

## 2. Commit Convention
Commits MUST follow the **Conventional Commits** specification to trigger correct versioning:
- `feat: ...` -> Minor release.
- `fix: ...` -> Patch release.
- `docs: ...`, `chore: ...`, `style: ...` -> No checking release (unless configured).
- `BREAKING CHANGE:` body footer -> Major release.

## 3. Documentation First (Context Awareness)
Before proposing architectural changes or refactors, you MUST read:
- `docs/planning/architecture-guidelines.md` (Domain Logic & Modular Design).
- `docs/planning/technical-strategy-and-justification.md` (Rendering Strategies).

## 4. Task Management
- Check `docs/planning/linear-tasks.md` for priority.
- Create specific branches for each task (e.g., `feature/RED-12-fix-colors`).

## 5. Technology Stack Constraints
- **Framework:** Next.js (latest stable).
- **Styling:** Tailwind CSS + Shadcn/UI (Strict).
- **State Management:** URL State (Nuqs) + Server State (React Query). Avoid global client stores like Zustand unless strictly necessary.

## 6. Documentation Standards
- **Location:** All project-level documentation MUST reside in `docs/`.
- **Naming:** Filenames must be in `kebab-case.md` (e.g., `project-rules.md`, `release-process.md`).
- **Language:** English is preferred for technical docs (though Spanish is accepted for internal planning).
- **Update:** If you change code logic, you MUST update the corresponding documentation.

## 7. Global Naming Conventions
- **Files & Directories:** Strict `kebab-case` for **ALL** files in Frontend and Backend (e.g., `user-profile.tsx`, `auth-controller.ts`).
  - *Exception:* React Components may use PascalCase if strictly required by framework patterns, but Next.js App Router favors kebab-case for directories/routes.
- **Variables/Functions:** camelCase.
- **Classes/Interfaces:** PascalCase.
