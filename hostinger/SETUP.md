# The Vie: Hostinger shared hosting

This version runs on PHP 8.2 or later, HTML, CSS and browser JavaScript. It needs PHP sessions, JSON, cURL, writable private files and Apache/LiteSpeed rewrite rules. No Node.js process, Cloudflare account, D1, MySQL or Composer is needed on the hosting server. Node.js is used only if you later rebuild the frontend from source.

## Upload

1. In Hostinger, create a Custom PHP/HTML website. Enable HTTPS and choose PHP 8.2 or later.
2. Open File Manager at the domain directory. The ZIP contains public_html/ and private/. Upload the contents of public_html/ into the domain's public_html/. Put private/ beside public_html/, one level above it. Do not put private/ inside the public website. Enable visibility of dotfiles and upload both .htaccess files.
3. The structure must be:
   domain-directory/public_html/index.html
   domain-directory/public_html/api.php
   domain-directory/private/bootstrap.php
   domain-directory/private/metrics.json
4. PHP must be able to write inside private/. Use the hosting account's normal ownership and permissions; do not grant world-write permission. Keep credentials and data files private.
5. Visit the domain root. The included report is a verified snapshot through October 14, 2026. Today is partial. Selecting dates outside its coverage shows no invented figures.

## Owner editing

Copy private/config.example.php to private/config.php. Enter your own random setup_token of at least 24 characters. Visit /editor; you will be redirected to owner setup. Enter that token and choose a password of at least 14 characters. The password is hashed in private/credentials.json. After setup, clear setup_token in config.php. /editor controls design and copy; /admin controls period-specific report presentation. Save a draft, review it, then publish. Published settings and history are stored in private/states.json. Owner login uses PHP sessions and replaces the previous Sites/ChatGPT login. No owner account or password is shipped in this package.

## Receive the 12-hour GitHub metrics updates

The existing Codex automation queries and reconciles TCZ - EGP every 12 hours and updates data/metrics.json on main in khaled9599/the-vie-tcz-performance. It does not deploy Hostinger. This PHP version reads private/metrics.json at request time, so a successful sync changes the report without rebuilding the website.

Create a fine-grained GitHub token for this repository only, with Contents read-only permission. Add it to github_token in private/config.php. Never add config.php, credentials.json, states.json or login-attempts.json to GitHub. The token stays on Hostinger, outside public_html.

In Hostinger's Cron Jobs, schedule PHP to run the absolute path to private/sync.php. Use the PHP executable and domain path shown by your account, for example:

/usr/bin/php /home/YOUR_HOSTINGER_USER/domains/YOUR_DOMAIN/private/sync.php

Test it manually through SSH if available, or inspect the first cron output. A successful run prints the report's verified refresh timestamp. The sync validates account, currency, campaigns, dates, values and duplicates before atomic replacement. Failed downloads or older reports leave the last successful snapshot intact.

Recommended cron cadence: every 15 minutes (*/15 * * * *). This checks for newly pushed GitHub snapshots; actual Meta figures are still refreshed every 12 hours by Codex. If you choose a 12-hour sync (0 */12 * * *), it can add up to another 12 hours of delay after a GitHub push. Hostinger cron uses UTC; verify your account's PHP binary/path. No Meta API key is required on Hostinger for this workflow.

## Verify after uploading

Check that the root dashboard displays the included spend and leads, that /editor asks for owner login, and that anonymous requests to /api.php?route=admin return 403. Save, preview and publish a harmless heading change. Check the updated report timestamp after cron sync. Direct URLs to private/config.php must be inaccessible because private/ is outside the web root. Share only the public dashboard URL with your client.

## Editing source and backups

The upload ZIP is already built. To rebuild locally from the existing repository, run node node_modules/vite/bin/vite.js build --config hostinger/vite.config.mjs. Upload the generated public_html files without overwriting your configured private files. Back up private/states.json and credentials.json securely before maintenance. Existing D1 design edits and revision history are not automatically transferred; this package starts with default settings and the latest verified report.

Local validation: PHP syntax and source/settings/persistence checks, mobile report rendering and anonymous admin denial. Actual Hostinger deployment, account-specific cron path and private GitHub token access require verification after upload.

Hostinger upload documentation: https://www.hostinger.com/support/1583289-how-to-manually-transfer-a-website-to-hostinger/
