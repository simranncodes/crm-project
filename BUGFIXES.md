# Bug fixes

1. **Lead form could never submit** – backend requires `PhoneNo`, form had no phone field. Added field + validation; phone column added to table.
2. **PhoneNo stored as Number** – lost leading zeros; `minlength`/`trim` don't apply to Number. Now a String validated as 10–15 digits (model + validator).
3. **Search crashed / regex injection** – user input went straight into `new RegExp`. Input is now escaped; blank searches ignored.
4. **Logout failed to clear cookie in production** – cookie options (secure/sameSite) didn't match; now uses `clearCookie` with the same options. Logout no longer requires a valid token.
5. **Malformed JSON returned 500** – now 400; 500 messages hidden in production.
6. **Dashboard race condition** – changing filters while on page > 1 fired two requests and a stale response could overwrite results. Added request-id guard and single page reset.
7. **Email normalisation** – `normalizeEmail` stripped dots from Gmail addresses (could break admin login); disabled.
8. **CORS** – trailing slash in `CLIENT_URL` broke origin match; `trust proxy` set for Render.
9. Login page redirects logged-in admins; axios errors keep a real Error object; logout always clears local state; env check at startup.
