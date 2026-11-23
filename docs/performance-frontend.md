# Frontend performance baseline and budgets (issue #438)

## Before / after framework

Every performance change should be recorded with the same before/after shape so a budget waiver is a decision, not an accident.

| Field | Before | After |
| --- | --- | --- |
| Route / URL | e.g. `/hunter/mission-board` | same URL, same query and fixtures |
| First-load JS | `resource-summary:script:size` from Lighthouse, in bytes transferred | re-measured after the change |
| LCP | Lighthouse `largest-contentful-paint` (lab) and field p75 if available | re-measured after the change |
| INP | lab `total-blocking-time` as proxy; field p75 (or timespan INP) when available | re-measured after the change |
| Largest chunks | top contributors from `client.html` produced by `npm run analyze` | same report after the change |
| Change | PR / commit that introduced it | linked PR and reviewer |
| Verdict | within budget, over budget with waiver, or reverted | follow-up issue if waived |

**Environment note:** The initial CI Lighthouse run was used to establish the baseline below. The values are budgets with headroom over measured medians, not final field data; tighten them after CrUX/RUM and bundle analyzer review.

## Budgets

Budgets are for first-load (initial navigation) JavaScript, measured as transferred bytes of `script` resources. Lighthouse CI asserts the byte values in the right column via `resource-summary:script:size`; the current ceiling is 650,000 bytes for all audited routes.

| Surface | First-load JS target | Asserted ceiling | LCP ceiling | TBT ceiling |
| --- | --- | --- | --- | --- |
| Landing `/` | reduce from baseline | 650,000 bytes | <= 9,000 ms | <= 750 ms |
| Mission board `/hunter/mission-board` | reduce from baseline | 650,000 bytes | <= 9,000 ms | <= 750 ms |
| Hunter hub `/hunter` | reduce from baseline | 650,000 bytes | <= 9,000 ms | <= 750 ms |

The Core Web Vitals "good" targets remain LCP <= 2,500 ms and INP <= 200 ms. The initial CI medians were about 7.0 s / 4.5 s for LCP and 480–510 ms for TBT, so the enforced ceilings are deliberately above that baseline while still catching regressions. CI uses the median of three Lighthouse navigation runs per URL. INP requires a real interaction, so it is not present in navigation-mode Lighthouse results: the workflow keeps an `interaction-to-next-paint` assertion at `warn` (it is populated by timespan/user-flow runs) and gates on `total-blocking-time` as the enforced lab proxy. Confirm the actual INP p75 with CrUX/RUM or a scripted Lighthouse timespan before declaring a route healthy.

## Code-splitting strategy

- Keep the App Router route boundary as the primary split: landing, `/hunter`, and `/hunter/mission-board` must not import each other's feature code.
- Load below-the-fold landing sections with `next/dynamic` (motion-heavy sections such as roadmap, FAQ, opportunities) so the hero's first paint does not wait for the full animation bundle.
- Keep Stellar/Soroban wallet clients behind interaction-triggered dynamic imports. The landing route should never pull `@stellar/stellar-sdk` into its initial chunks just because `WalletProvider` is mounted.
- Defer modal and upload code (`SubmitFeedbackModal`, `ProofFileUpload`, wizard steps, milestone flows) until the trigger is used.
- Prefer named/direct icon imports. `experimental.optimizePackageImports` in `frontend/next.config.ts` rewrites barrel imports for `@iconify/react`, `lucide-react`, `react-icons`, `framer-motion` and `@stellar/stellar-sdk`; if a package regression appears, remove that package from the list rather than disabling the whole option.
- Re-run the analyzer after adding any package in the icon, animation or Stellar family and record the delta in the table above.

## Run the bundle analyzer

The analyzer is a devDependency and is only wired into `next.config.ts` when `ANALYZE=true`; normal builds and `next start` are unaffected.

```bash
cd frontend
npm ci
npm run analyze
```

`npm run analyze` is `ANALYZE=true next build`. Reports are emitted under `.next/analyze/` (client, server, edge). Use `client.html` for first-load JS budgets. On Windows the inline `ANALYZE=true` prefix requires a POSIX shell (Git Bash/WSL); from `cmd` or PowerShell, set `ANALYZE=true` in the environment then run `npm run build`.

The lockfile now includes the analyzer dependencies, so `npm ci` succeeds in CI.

## Run Lighthouse CI

`.github/workflows/lighthouse.yml` runs on PRs touching `frontend/**` (or the workflow itself). It installs with `npm ci`, builds with the same public env values as `ci.yml`, starts `next start` on `127.0.0.1:3000`, polls until the server responds, writes an LHCI config in the runner temp directory, and runs:

```bash
npx --yes @lhci/cli@0.15 autorun --config="$RUNNER_TEMP/lighthouserc.json"
```

The config collects three runs each for `/`, `/hunter/mission-board`, and `/hunter`, then uses `assertMatrix` to apply per-route JS ceilings plus the LCP threshold, the INP warning, and the TBT gate. `@lhci/cli` is fetched by `npx` and is not a repository dependency. Reports are written to the filesystem target, not uploaded. No secrets are used; all env values are public testnet identifiers and URLs.

To reproduce locally, start the built server, copy the JSON block from the workflow into a temporary file outside the repo (adjusting paths as needed), and pass it to the same `npx` command. Compare the resulting table to the before/after framework above.
