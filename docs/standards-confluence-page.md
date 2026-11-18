# Playwright Automation Standards

Proposed starting point. Every rule here is open for discussion with the team before it becomes mandatory.

## Goals

- Any engineer can read, run, and fix any test.
- New code follows one standard from day one, without blocking work on existing code.
- Rules that a tool can check are checked by the tool, not by people in code review.

## 1. What is enforced automatically (ESLint + Prettier)

| Rule                                                                     | Why                                                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| No fixed waits (`waitForTimeout`) and no `networkidle`                   | Fixed waits make tests slow and flaky. Rely on Playwright auto-waiting and web-first assertions. |
| No `{ force: true }`                                                     | Forcing a click hides real usability or timing problems.                                         |
| Every Playwright call is awaited (`no-floating-promises`)                | A missing `await` makes a test pass or fail for the wrong reason.                                |
| `expect` only in tests, never in page objects or utils                   | Page objects perform actions or return data. The test decides what is correct.                   |
| Every test has at least one assertion                                    | A test without an assertion proves nothing.                                                      |
| Web-first assertions (`toBeVisible()`, not `isVisible()` + `toBe(true)`) | They retry automatically and give clearer failure messages.                                      |
| No `test.only`; `test.skip` shows a warning                              | Prevents accidentally disabling the suite.                                                       |
| No conditionals inside tests (warning)                                   | A test should be one clear path. Move branching to setup.                                        |
| `===` only, no `var`, `const` by default                                 | Basic consistency.                                                                               |
| No `console.log` (warning)                                               | Use Playwright reporters and traces.                                                             |
| Functions under 60 lines, low complexity (warnings)                      | Smaller functions are easier to reuse, which supports DRY.                                       |
| Formatting: spacing, quotes, semicolons, trailing commas (Prettier)      | Formatting is automatic, so it never needs discussion in review.                                 |

## 2. What is a convention (reviewed by people, or by a duplication report)

- **DRY:** repeated steps become a page object method, a fixture, or a utility. `jscpd` produces a duplication report to find candidates. It is a report, not a blocker.
- **Assertions live in the test.** Page objects can expose state (`getCartCount()`), and the test asserts on it.
- **Locators, in order of preference:** `getByRole`, `getByLabel`, `getByTestId`, then CSS. Avoid XPath and position-based selectors.
- **Structure:** `tests/` for specs, `pages/` for page objects, `fixtures/` for shared setup, `utils/` for helpers.
- **Naming:** files `feature.spec.ts` and `feature.page.ts`. Test titles describe behavior ("adds a product to the cart"), not implementation.
- **Independence:** each test creates or prepares its own data and does not depend on another test.

## 3. Example

Not allowed:

```ts
login.login('standard_user', 'secret_sauce'); // missing await
await page.waitForTimeout(3000); // fixed wait
await page.locator('.btn').click({ force: true }); // forced click
expect(await badge.isVisible()).toBe(true); // not web-first
```

Preferred:

```ts
await login.login('standard_user', 'secret_sauce');
await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
```

## 4. How it is rolled out

- **New and changed files:** the pull request check lints only the files changed in the PR. Errors block the merge.
- **Existing code:** not blocked. A non-blocking report runs on the whole repository and publishes the number of violations per rule.
- **Cleanup:** fix by module, using the report to choose the next target. Use `npm run lint:fix` for the automatic fixes.
- **A file you touch is a file you leave clean.** This is the main rule that moves old code forward.

## 5. Running it locally

```
npm run lint          # check
npm run lint:fix      # fix what can be fixed automatically
npm run format        # apply Prettier
npm run duplication   # duplication report
```

## 6. Changing a rule

Open a pull request on `eslint.config.mjs` with the reason. The team reviews it like any other code.
