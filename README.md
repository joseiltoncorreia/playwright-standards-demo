# SwagLabs Playwright Standards (demo)

Example of a lint and formatting standard for a Playwright + TypeScript automation project.

## Setup

```
npm install
```

## Commands

```
npm run lint          # ESLint
npm run lint:fix      # ESLint with automatic fixes
npm run format        # Prettier
npm run duplication   # jscpd duplication report
```

## See the rules in action

`tests/demo-violations.ts` contains code that breaks the rules on purpose. It is ignored by the normal lint run. To see the errors:

```
npx eslint --no-ignore tests/demo-violations.ts
```

## CI

`.github/workflows/lint.yml`:

- **lint-changed-files** (blocking): ESLint and Prettier only on files changed in the pull request.
- **full-report** (non-blocking): lints the whole repository, publishes violations per rule in the job summary, and uploads the JSON and duplication reports.

## Standards page

`docs/standards-confluence-page.md` is the draft of the team page. `docs/proposal.md` is the one-page rollout proposal.

## Notes

- Requires Node 20+ and ESLint 9 (flat config).
- `no-floating-promises` uses type information, so keep `tsconfig.json` up to date with the folders that contain tests.
- Rule thresholds (function length, complexity) are starting values to tune with the team.
