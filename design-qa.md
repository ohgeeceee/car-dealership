# Design QA — Car Dealership GitHub Pages

**Final result: passed**

## Evidence and comparison setup

- Source visual truth: `/home/currie/.codex/generated_images/01a0f510-a1a1-79a1-b2ed-ad4ca94e0314/exec-15e36c94-27f3-49b2-b046-859863a81564.png` (1488 × 1058 px; selected Option 1).
- Rendered implementation: `/tmp/car-guy-pages-root-final.png` (1440 × 1024 px; 1440 × 1024 CSS px; device scale factor 1).
- Combined full-view comparison: `/tmp/car-guy-pages-side-by-side.png`; source normalized to 1440 × 1024 px, beside the implementation at the same viewport.
- Browser state: static production output, landing route `/car-dealership/`, desktop viewport 1440 × 1024.
- Supporting route captures: `/tmp/car-guy-pages-demo-final.png` at `/car-dealership/demo/` and `/tmp/car-guy-pages-portal-final.png` at `/car-dealership/portal/`, both captured at 1280 × 960 CSS px, DPR 1.

## Visual review

- Full composition: graphite/amber color system, display hierarchy, dark dusk vehicle hero, layered dealership/product preview, section rhythm, and pricing cards remain aligned with the selected target.
- Focused regions: hero/product stack and package heading/cards are readable in the combined comparison; no separate focused crop was needed.
- Typography: system sans-serif fallback is retained; weights and tight display spacing preserve the source hierarchy. The implementation has a text-built brand lockup rather than the mock’s bespoke logotype; this remains a minor fidelity difference, not a blocker.
- Spacing/layout: desktop hero and package fold match the source proportions closely. Responsive dashboard renders at its desktop width; mobile lead stages stay horizontally scrollable within the board.
- Colors/tokens: near-black/graphite surfaces, white text, amber accents, and subdued borders remain consistent.
- Images/assets: generated dusk hero and dealership vehicle photography load successfully from the project subpath in the production build.
- Copy/content: the implementation uses the approved “Everything behind the sale” position, all three tiers, and clear sample-data / illustrative-pricing disclosures.

## Findings

- No actionable P0, P1, or P2 design issues. The demo and portal also render from their direct static entry points.
- Minor difference (P3): the logo typography is recreated with text and an icon rather than matching the generated mock’s custom wordmark exactly.

## Verification

- `npm run build:pages` — passed; emits the project-base assets and static `/demo/` and `/portal/` entry points.
- `npm run test:sites` — passed (1 test).
- `git diff --check` — passed.
- GitHub Pages is configured to publish via Actions. Workflow deployment status is checked after the push.

## Comparison history

- The prior prototype comparison exposed package heading wrapping and fold placement differences; the heading was tightened and the plans brought into the desktop first fold.
- This Pages pass changed only base-path routing/static route generation and deployment setup; the production subpath captures preserve the approved visual layout, with no new P0/P1/P2 findings.
