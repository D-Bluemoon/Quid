# Accessibility audit: WCAG 2.2 AA

Branch: `feature/creator-dashboard-design-a11y-performance-435-438`
Issue: #437
Date: 2026-11-23

## Method and limitation

This is a static source review of the landing, connect wallet, mission board, mission detail, submit, review, and wallet flows. No browser audit tooling was run in this environment: no axe, Lighthouse, VoiceOver, NVDA, or screenshot review. Nothing here is a final conformance claim.

## Fixes made in this PR

Only `frontend/src/components/hunter/SubmitFeedbackModal.tsx` was changed, plus this audit document.

- Added dialog semantics: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-describedby`.
- Added an inline, dependency-free focus trap: initial focus into the feedback textarea, Escape close, Tab/Shift+Tab containment, focus handling across step changes, and focus restore to the previously focused element on close/unmount.
- Associated visible labels with the feedback textarea, proof URL input, and rating range using `htmlFor`/`id`; grouped the proof file upload control with a visible group label.
- Added `aria-hidden="true"` to decorative icons and an accessible name to the icon-only close button.
- Added assertive `role="alert"` regions for inline validation and terminal submission errors, plus a polite `role="status"` region for progress and success transitions.
- Preserved the existing submission state machine, reset behavior, and all API calls.

## Surface findings

| Surface | Issues found | Fixed in this PR | Remaining work |
| --- | --- | --- | --- |
| Landing (`/`) | No unlabeled interactive control was found in code review. Decorative icon exposure, image alt decisions, FAQ disclosure state, focus visibility, and contrast are not machine-verified here. | None in this PR. | Verify all decorative SVGs are hidden from assistive tech, alt text is meaningful or intentionally empty, and focus/contrast pass at 200% zoom and 320px width. |
| Connect wallet (`/(auth)/connect-wallet`) | Wallet logo alt text duplicates the adjacent wallet name inside the same button; the connected-state check icon is decorative but not hidden; connection status changes are not announced; wrong-network explanation relies on a `title` tooltip on a disabled button (1.1.1, 4.1.3). | None in this PR. | Give status changes a live region, hide decorative icons, expose disabled reasons in text, and verify wallet-provider announcements with a screen reader. |
| Mission board (`/hunter/mission-board`) | Search field has only a placeholder, not a persistent visible label; filter buttons do not expose selected state or group semantics; error text is not a live region; decorative icons are not hidden; repeated “View Details” links do not identify the mission in their accessible name (1.3.1, 2.4.4, 4.1.2, 4.1.3). | None in this PR. | Add explicit labels, tab/pressed semantics, unique link names, hidden decorative icons, and status messaging in a follow-up owned by the page/component owner. |
| Mission detail (`/hunter` mission cards and creator detail) | Cards rely on a separate “Submit Feedback” button whose accessible name does not include the mission title; creator detail tabs lack `role="tablist"`/`aria-selected`; the reject reason textarea has a placeholder but no persistent label; inline confirmations are not live regions (1.3.1, 3.3.2, 4.1.2, 4.1.3). | None in this PR. | Verify heading/link structure, tab semantics, rejection form labeling, and status announcements with keyboard and screen reader. |
| Submit (`SubmitFeedbackModal`) | Previously: no dialog role/name, no focus trap or restore, unassociated labels, unhidden decorative icons, unlabeled close button, and no live regions for errors or step changes. | All listed modal issues fixed here. | Browser-test the open, validation error, IPFS upload, signing, success, error, and close paths with keyboard and screen readers. |
| Review (creator response review) | Response preview rows look clickable but are plain `div` elements; approval/rejection controls need mission and submission context in their accessible names; rejection confirmations are not live regions; the reject reason field has no persistent visible label (2.1.1, 2.4.6, 3.3.2, 4.1.3). | None in this PR. | Make interactive rows focusable/actionable, label the reason field, expose state changes, and verify disabled payout reasons are conveyed without tooltips. |
| Wallet (`/hunter/wallet`, `/creator/wallet`) | Error banners are not live regions; decorative Lucide icons are not hidden; copy success is visual-only; disabled cashout/withdraw controls explain themselves mainly through `title`; loading skeletons have no status text (1.1.1, 4.1.3). | None in this PR. | Add status announcements, hide decorative icons, provide text alternatives for disabled reasons, and verify balance/transaction tables at narrow widths. |

## Remaining manual verification needs

- Run axe DevTools (or equivalent) on all seven surfaces, including submit modal form, progress, success, error, and restored-focus states; resolve all critical and serious findings.
- Keyboard-only pass: Tab/Shift+Tab order, no focus escape from the modal, Escape closes, focus returns to the trigger, all controls reachable, and visible focus indicators at every stop.
- VoiceOver (macOS/Safari) pass: dialog name and description, form labels, rating value, inline errors, progress/success status, tabs, and review actions.
- NVDA (Windows Chrome/Firefox) pass: live-region announcements, assertive errors, wallet connection state, and copy/funding confirmations.
- Screenshots at 320px, 768px, and 1280px; 200% zoom; high-contrast mode; and reduced-motion settings. Check reflow, text clipping, target size, icon-only buttons, and color-only status.
- Manual contrast checks: at least 4.5:1 for normal text, 3:1 for large text and UI component boundaries/icons, including disabled and gradient-backed controls.
- Confirm all remaining decorative icons on the listed surfaces are hidden from assistive technology and that meaningful images have appropriate alt text.
