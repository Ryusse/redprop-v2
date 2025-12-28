# Release Process (Unified & Automated)

This project uses **[Standard Version](https://github.com/conventional-changelog/standard-version)** to automate semantic versioning, CHANGELOG generation, and Git tagging.

## Current Version: `v0.0.1`

### 🚀 How to Release (The Automatic Way)

Instead of manually calculating versions, follow this simple workflow:

1.  **Commit your work** following [Conventional Commits](https://www.conventionalcommits.org/):
    *   `feat: add new map component` (Triggers MINOR version)
    *   `fix: resolve broken login link` (Triggers PATCH version)
    *   `chore: update dependencies` (No version bump usually)
    *   `feat!: rewrite API to v2` (Triggers MAJOR version)

2.  **Run the release command:**
    ```bash
    npm run release
    ```
    *This magic command will automatically:*
    1.  Bump the version in `package.json` based on your commits.
    2.  Generate/Update `CHANGELOG.md` with a list of changes.
    3.  Create a Git Tag (e.g., `v0.0.2`).
    4.  Commit these changes.

3.  **Push to GitHub:**
    ```bash
    git push --follow-tags
    ```

### Optional: Manual Override
If you specifically want to force a version (e.g., jump to 1.0.0):
```bash
npm run release -- --release-as 1.0.0
```

### Monorepo Sync
Currently, this process versions the **Root Repository**.
If `frontend` or `backend` need strictly matching versions, ensure they are updated or use a tool like `lerna` in the future. For now, the Root Tag is the source of truth for the project state.
