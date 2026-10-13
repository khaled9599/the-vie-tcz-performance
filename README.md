# The Vie | TCZ Performance

Existing Sites project: appgprj_6accc0e773008191b79e921df70304aa.

Public read-only dashboard; no PIN. Owner-only /admin uses dispatch-owned ChatGPT authentication. The verified khaled.salah@tcz-eg.com identity is bound to its Site-specific stable user ID at first authorized access. Every admin request independently checks both. No client header or cookie grants administration.

Only TCZ - EGP (act_2308396932702831) is permitted. Query fields are a fixed allowlist. Campaign names must begin VIE or THE VIE followed by a delimiter. Native campaign discovery on 2026-10-12 found five matching campaigns, including VIE_META_KSA_LEADS_PROSPECT_202610; no campaign list or performance snapshot is shipped in source.

## Live connection remains unverified

A Supermetrics API license and server-side SUPERMETRICS_API_KEY are required. The connected chat reports an existing Full Platform Trial ending 2026-10-26; it does not prove API entitlement. Sites connector eligibility was unavailable. Hosted visitor connectors would not share the owner's connection with anonymous visitors. No plan was purchased or activated.

The REST adapter is prepared but must be verified with the actual API response before reporting live completion. Without a key the interface states that live reporting is not connected and displays no invented figures. API schema, complete zero-delivery campaign discovery, attribution, and hosted refresh still require live validation. Current lead definition is On-Facebook leads, explicitly labelled. No deduplicated reach is calculated or displayed.

## Persistence and overrides

D1 stores independent original source cache, period-specific draft and published display configurations, immutable revision snapshots, and the pinned owner ID. No code writes to Meta or Supermetrics. Overrides record original value, replacement, exact campaign/account/period, reason, author, timestamp and source refresh time. Fresh source data is mandatory for new adjustments. Derived metrics use adjusted bases. Period-level adjustments suppress daily charts. Hidden campaigns are excluded consistently from the visible aggregate. Hidden metrics are removed from public values and CSV columns.

All display edits are scoped to the exact selected date range. Rollback restores a revision into a draft, then requires preview and explicit publish. Restore live figures removes published adjustments immediately and records a revision. Optimistic revision checks prevent lost writes. History is retained, with the most recent 100 shown per period.

## Verification

Run node --test tests/report.test.mjs. Then TypeScript validation and the Sites build helper. Browser checks must verify phone and desktop layout, anonymous reads, denied anonymous and other-identity admin reads/writes, cross-origin writes, drafts versus publishing, rollback, export projection and absence of restricted financial fields.

Local Sites mock identity is seedy@sites.test and must remain unauthorized. Never enable a development authentication bypass in production.

## Timestamped report publication

A verified Supermetrics report can be supplied through the secret Sites runtime environment variable VERIFIED_REPORT_SNAPSHOT. No performance data is included in source or the build. The adapter validates TCZ - EGP, exact The Vie names, currency, dates, bounded nonnegative metrics, unique daily rows and campaign identity. Reports outside the snapshot's coverage display no figures. Client status and CSV explicitly identify the snapshot and say automatic refresh is not connected. This does not establish a continuous live connection. Configure and verify the API adapter to enable ongoing platform refresh.

## Self-service site editor

Open /editor and sign in as the authorized owner. Global presentation settings are stored separately from report periods in D1. Edit headings, navigation labels, colours, font, heading sizes and added point tracking, card corners, section spacing, content width and section visibility. Changes update the draft preview immediately; save, review the saved preview and publish to update the client page. Earlier revisions can be restored into drafts. Reset restores the default design into a draft. /admin remains available for report values, metric labels and explanations. No arbitrary HTML or CSS is accepted. Every editor read and write checks owner identity; writes also validate Origin and the saved revision to prevent cross-site or lost concurrent edits. Public reads return only the published presentation. The requested heading spacing defaults to calc(-.055em + 1pt).
