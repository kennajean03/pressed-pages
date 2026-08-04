# Phase 18B — Direct messages and reader safety

Date: August 4, 2026

Status: application implementation and database activation complete; two-account acceptance pending.

## Delivered

- Added a request-gated private message folio to Community.
- Added a Message Reader action to eligible public profiles. The action is
  disabled when the reader accepts no requests or accepts followers only and
  the current reader does not follow them.
- Added persisted message privacy preferences: no one, followers, or any
  signed-in reader. The conservative fallback for existing profiles is
  followers only.
- Added pending, accepted, declined, and closed conversation states.
- A requester may leave exactly one introductory message. The recipient must
  accept before either reader can continue the conversation.
- Added chronological message history, unread counts, recipient-owned read
  state, request notifications, reply notifications, and accepted-request
  notifications.
- Added private message reporting, close-with-retention behavior, and blocking
  through the shared `reader_blocks` boundary from Phase 18A.
- Added truthful loading, empty, migration-unavailable, closed, declined, and
  error states plus responsive desktop and phone layouts.
- Realtime delivery is deliberately absent. Manual refresh is honest and safe;
  realtime should only be enabled after the complete hosted RLS matrix passes.

## Database migration

Apply:

`supabase/migrations/20260804_phase18b_direct_messages.sql`

The migration is additive and creates:

- `direct_conversations`
- `direct_messages`
- `direct_message_reports`

It reuses, but never rewrites, Phase 18A's `reader_blocks`. It does not alter or
delete profiles, follows, notifications, activity, reviews, reading logs,
uploads, or library records.

## Privacy and RLS boundary

- Conversations and messages are readable only by the two members while
  neither has blocked the other.
- New requests are allowed only by the target reader's saved permission,
  public-profile state, follow relationship where required, and block state.
- Only the requester may create the one pending introductory message.
- Only the recipient may accept or decline a pending request.
- Accepted conversation members may send messages and update its activity
  timestamp. Either member may close it.
- Only recipients can mark messages from the other reader as read.
- Reports are private to their reporter and cannot target the reporter's own
  message.
- Column-level grants prevent client code from changing participant identity,
  message authorship, server timestamps, report status, or message bodies after
  sending.

## Retention and rollback

Closing is non-destructive: conversation and message rows remain available for
safety and report context, but replies stop. Account deletion cascades through
authenticated ownership.

For a runtime rollback, deploy the prior application build first; the current
UI already fails closed when Phase 18B relations are absent. Retain the tables
to avoid destroying correspondence or report evidence. If a full schema
rollback is explicitly required, export all three Phase 18B tables first, then
drop their policies, helper functions, and tables in dependency order.

## Verification completed

- Domain tests cover message trimming/limits, partner resolution, and the
  one-note pending request boundary.
- Lint, 38 tests, production build, and diff checks pass.
- Signed-in pre-migration desktop and 390 × 844 checks show one activation
  notice, no usable message controls, and zero document-level horizontal
  overflow.
- Existing Phase 18A activity controls remain present.
- The owner applied the hosted migration through the Supabase SQL editor on
  August 4, 2026. The signed-in inbox then loaded one existing pending request,
  preserved the one-introductory-note boundary, and exposed no reply composer
  before recipient acceptance.
- Activated desktop and 390 × 844 checks show no migration notice, no browser
  errors, and zero document-level horizontal overflow.
- Codex did not create, change, or delete any conversations, messages, reports,
  blocks, notifications, reader records, library records, or uploads during QA.

## Hosted activation acceptance still required

Use two disposable test accounts—not the owner's reading records—to verify:

1. no-one, followers-only, and everyone request permissions;
2. one introductory message and duplicate-conversation prevention;
3. accept, decline, reply, unread/read, close, and reload persistence;
4. sender, recipient, non-member, declined, closed, removed/invalid member, and
   blocked-reader RLS denial;
5. request/reply/accepted notifications and recipient scoping;
6. private reports, self-report denial, and duplicate-report prevention;
7. block filtering across messages and the existing activity feed.

Delete the disposable accounts and every test social row before declaring the
hosted phase complete.
