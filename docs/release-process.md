# Release Process (Unified & Automated)

This project uses **[Standard Version](https://github.com/conventional-changelog/standard-version)** to automate semantic versioning, CHANGELOG generation, and Git tagging.

## Current Version: `v0.0.1`

### 🚀 How to Release (The Enterprise Way)

In this project, **Releases are Fully Automated**. You do not run commands manually.

#### Reference Workflow:
1.  **Develop:** Work on your `feature/` branch.
2.  **Commit:** Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`). This is crucial!
    *   *Bad:* `update styles` (No version bump)
    *   *Good:* `fix: correct primary button color hex` (Triggers v0.0.X)
3.  **Pull Request:** Open a PR to `main`. Wait for Review and CI checks.
4.  **Merge:**
    *   Once merged, the **Release GitHub Action** kicks in.
    *   It analyzes your commits.
    *   It bumps the version (if needed).
    *   It pushes the new Tag and Changelog back to `main`.
5.  **Deploy:** Vercel/Render will detect the new commit/tag and deploy to production.

*(Manual `npm run release` is now deprecated and should only be used for local debugging or emergency overrides).*

### Optional: Manual Override
If you specifically want to force a version (e.g., jump to 1.0.0):
```bash
npm run release -- --release-as 1.0.0
```

### Monorepo Sync
Currently, this process versions the **Root Repository**.
If `frontend` or `backend` need strictly matching versions, ensure they are updated or use a tool like `lerna` in the future. For now, the Root Tag is the source of truth for the project state.
