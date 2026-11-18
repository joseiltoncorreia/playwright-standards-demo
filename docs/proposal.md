# Proposal: A Shared Standard for Playwright Automation Code

## Problem

During our conversation you mentioned that the automation code is not standardized. Without a shared standard, tests are harder to read, review, and maintain, and every new engineer writes in a slightly different style.

## Caveat

I have not seen your codebase. This is a starting point based on common Playwright practices, meant to be adjusted together with your team.

## Proposal

Automate the standard instead of relying on code review to enforce it.

1. **ESLint with Playwright rules** for quality: no fixed waits, awaited calls, assertions only in tests, no forced clicks, web-first assertions.
2. **Prettier** for formatting, so spacing and punctuation are never discussed in review.
3. **A duplication report** (jscpd) to find repeated code that should move into page objects or fixtures.
4. **One Confluence page** with the rules, the reasons, and "do / don't" examples.

## Rollout without stopping the team

| Phase       | What happens                                                                                     | Effect on the team          |
| ----------- | ------------------------------------------------------------------------------------------------ | --------------------------- |
| 1. Baseline | Run the rules in report-only mode and count violations per rule.                                 | None                        |
| 2. New code | CI lints only files changed in a pull request. A small set of high-value rules blocks the merge. | Only new work is affected   |
| 3. Expand   | Add rules gradually. Clean old code by module, guided by the report.                             | Gradual, one area at a time |
| 4. Review   | Adjust rules with the team and track the trend.                                                  | Standard owned by the team  |

## How progress is measured

- Violations per rule over time (from the non-blocking report).
- Share of pull requests passing the check on the first run.
- Duplicated lines reported by jscpd.
- Flaky tests, since many rules target the common causes.

## Risks and how they are handled

- **Rules the team disagrees with:** every rule is discussed before it blocks anything, and changes go through a pull request.
- **Too many violations at the start:** old code is never blocked, only reported.
- **Lint cannot judge design:** page object design and naming still need review, so they stay as documented conventions.

## What I built as a demonstration

A small public example project (SwagLabs) with the ESLint, Prettier, and jscpd configuration, a GitHub Actions workflow that blocks only changed files and publishes a full report, and the draft Confluence page. It uses no code from any employer or client.

I would be glad to adapt it to your stack and walk through it whenever it is useful.
