# Git Workflow Guide for CropFresh

## Branching Strategy:

* `main`: Production-ready code. Only merges from develop branch allowed.
* `develop`: Main integration branch for ongoing development.
* `feature/*`: For new features (e.g., feature/user-authentication)
* `bugfix/*`: For bug fixes (e.g., bugfix/login-error)
* `hotfix/*`: For critical production fixes (e.g., hotfix/security-vulnerability)

## Commit Message Format:

We follow the Conventional Commits format:
`type(scope): description`

Types:
* feat: A new feature
* fix: A bug fix
* refactor: Code refactoring
* style: Formatting changes
* docs: Documentation changes
* test: Test-related changes
* chore: Other changes

Example:
* feat(auth): implement user login
* fix(ui): correct button alignment

## Branch Workflow:

1. Create branch from develop:
   ```bash
   git checkout develop
   git checkout -b feature/your-feature
   ```

2. Make changes and commit:
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

3. Push changes:
   ```bash
   git push origin feature/your-feature
   ```

4. Create Pull Request to develop branch

## Pull Request Process:

1. Create PR from your branch to develop
2. Fill out the PR template
3. Request reviews from team members
4. Address review comments
5. Merge after approval

## Important Notes:

* Always branch from develop for new features
* Keep PRs focused and small
* Write clear commit messages
* Update documentation when needed
* Ensure tests pass before requesting review
