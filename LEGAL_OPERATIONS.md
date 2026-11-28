# Legal operations pending for Café El Regio

## Completed in the site
- Generic privacy policy, terms, refunds, cookies, licenses, unsubscribe and copyright pages.
- Cookie banner with necessary storage only and optional consent blocked by default.
- Separate terms acceptance and optional marketing consent in cart, events and Christmas kit flows.
- Netlify Forms records for terms acceptance, unsubscribe and copyright claims.
- Generic AI content notice based on observed C2PA metadata on the Christmas poster.
- Third-party notices and license inventory references.
- Keyboard-accessible modals, skip link, focus-visible styles and reduced-motion support.

## Still required from the business owner
1. Register the business identity, NIT, address and legal contact email/phone for the privacy policy.
2. Have a Colombia-qualified lawyer review all generic legal text before relying on it.
3. Sign data processing agreements with Netlify, Meta/WhatsApp and any future analytics or marketing provider.
4. Obtain written permission for KMuffis logo use and any client logos, testimonials or case studies.
5. Verify rights to all photos, videos, audio and product images, including AI-generated assets.
6. Decide retention periods and access process for Netlify form submissions.
7. Configure a real unsubscribe implementation and test it end to end before promising automatic removal.
8. Rotate or remove any VITE_-prefixed admin secrets in web/.env if that PocketBase setup is still used.

## Subscriptions and cancellation plan
- Do not launch subscriptions until price, period, renewal, cancellation and refund terms are published.
- Before launch, implement self-service cancellation, renewal notices and a support fallback.
- Test cancellation and refund flows in staging before public release.
- Keep subscription consent separate from terms, cookies and marketing consent.