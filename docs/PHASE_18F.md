# Phase 18F — Connected reading-account feasibility

Date: August 5, 2026

Status: complete feasibility spike; **no third-party account connection ships**.

## Decision

Pressed Pages will not show an external-account Connect control yet. A credible
connection needs provider-authorized OAuth, narrowly scoped and revocable
access, a documented data-rights path, server-side token storage, and a
complete import/sync/disconnect lifecycle. None of the researched candidates
meets that bar today.

This is an intentional product decision, not a missing piece of UI. The
existing Settings > Connections area continues to describe real reader
followers, following, and reader discovery only.

## Provider findings

| Candidate | Supported path confirmed | Product fit | Phase 18F decision |
| --- | --- | --- | --- |
| Goodreads | The public developer API no longer issues new keys and was slated for retirement. | No dependable new-app OAuth/import integration; scraping or credential collection is unacceptable. | Do not integrate. A user-owned CSV export could be considered in a separate file-import phase. |
| The StoryGraph | Its documented import route accepts a Goodreads-format CSV; no public third-party OAuth or reading-account API was confirmed. | A CSV workflow is possible, but it is an import, not a connected account or recurring sync. | Do not integrate as an account connection. Evaluate user-initiated file import separately. |
| Hardcover | A documented GraphQL API accepts a bearer token generated from a user account. Public provider material does not establish a scoped third-party OAuth grant. | Asking a reader to paste a broad personal bearer token would create an unnecessary secret, revocation, and scope risk. | Do not integrate until Hardcover offers a reviewed, scoped OAuth grant or an equivalent safe delegation mechanism. |
| Open Library | Public book-data API with published low-volume rate limits; it is not a reader-account provider. | Helpful for catalog enrichment only, not reading-account import or sync. | Keep its existing catalog role separate from account connections. |

Sources reviewed on August 5, 2026:

- [Goodreads API deprecation notice](https://www.goodreads.com/topic/show/21788520-api-deprecation)
- [Goodreads terms](https://www.goodreads.com/about/terms)
- [The StoryGraph import guidance](https://thestorygraph.freshdesk.com/support/solutions/articles/79000146300-bulk-import-template)
- [Hardcover API endpoint](https://api.hardcover.app/)
- [Hardcover developer API announcement](https://roadmap.hardcover.app/feature-requests/posts/developer-api)
- [Open Library API guidance and rate limits](https://openlibrary.org/developers/api)

## What a future provider must prove

A provider may move from this holding list only after all of these are
confirmed in its official documentation and a small non-production test:

1. OAuth authorization code flow with PKCE, registered redirect URIs, limited
   scopes, short-lived access tokens or secure refresh semantics, and an
   account-side revocation path.
2. Explicit permission to import the reader's own shelves, reading state,
   dates, ratings, reviews, and identifiers. No scraping and no bulk use of
   public catalog pages.
3. Published rate limits plus backoff guidance that support bounded manual
   import and an opt-in sync schedule.
4. A provider-data deletion and disconnect path that can be explained plainly
   to the reader.
5. Stable identifiers sufficient to reconcile exact editions before a title /
   author fallback is ever considered.

## Required architecture before implementation

Tokens and provider secrets must never enter Vite environment variables,
browser storage, or `profiles.appearance_preferences`. A future implementation
requires server-only endpoints and encrypted persistence. The client may hold
only a short-lived connection attempt identifier.

The minimum owned data model would keep these responsibilities separate:

| Record | Purpose | Reader-visible behavior |
| --- | --- | --- |
| `external_connections` | Provider name, owner, approved scopes, connection state, timestamps, and an opaque server-side token reference. | Show connection status and Disconnect. Never reveal a token. |
| `external_import_runs` | One bounded import/sync attempt, cursor, summary, errors, and cancellation state. | Show progress and a durable result summary. |
| `external_book_matches` | Source identifier, candidate local book, confidence/match method, and reader decision. | Review ambiguous duplicates before any write. |
| `external_provider_data` | The smallest retained source metadata needed for sync/reconciliation, isolated by owner and deleted on disconnect when the reader chooses. | Explain exactly what is retained and why. |

All reads and writes need owner-scoped RLS. Token encryption, refresh, sync,
and deletion must run through a server-side function using server-managed
secrets. Any provider callback must validate state, PKCE verifier, redirect
origin, and current reader before persistence.

## Product flows that must remain separate

- **One-time import:** reader selects a file or authorizes a provider, previews
  only their own data, resolves duplicates, then explicitly confirms writes.
- **Recurring sync:** a separate opt-in after a successful import. It needs a
  frequency, scope, pause control, failure history, and reauthorization state.
- **Conflict resolution:** Pressed Pages never silently overwrites a locally
  edited status, date, rating, review, or cover. Exact source ID is preferred;
  ISBN-13 plus edition detail is next; title/author is review-only; no match
  creates a new draft rather than a silent duplicate.
- **Disconnect:** revokes or invalidates the provider grant where supported,
  stops scheduled work, removes encrypted tokens, and asks whether to retain
  imported Pressed Pages books while deleting provider-linked metadata.

## Acceptance gate for a future implementation

Before any external Connect control becomes visible, ship a reviewed provider
decision, additive migration, owner/attacker RLS matrix, mocked OAuth callback
tests, encryption and deletion-path tests, import preview/retry/cancel/empty
states, duplicate-resolution tests, keyboard and screen-reader coverage, and
desktop/tablet/phone QA. Then run `npm run test:release` and remove every
disposable provider connection and test record.

## Next step

Phase 18G (saved review-graphic designs and accessible placement tools) is the
next product-depth phase. A third-party connection can be reconsidered only
when a provider clears the gate above; a reader-owned CSV import may be scoped
as its own future phase without pretending to be a live sync.
