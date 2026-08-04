import test from "node:test"
import assert from "node:assert/strict"

import {
  canReplyToConversation,
  getDirectMessagePartner,
  normalizeDirectMessageBody,
} from "../src/domain/community/directMessages.js"

test("direct message bodies are trimmed and limited", () => {
  assert.deepEqual(normalizeDirectMessageBody("  hello reader  "), {
    ok: true,
    body: "hello reader",
    error: "",
  })
  assert.equal(normalizeDirectMessageBody("   ").ok, false)
  assert.equal(normalizeDirectMessageBody("x".repeat(2001)).ok, false)
})

test("conversation partner resolves from membership", () => {
  const conversation = {
    requester_id: "reader-a",
    recipient_id: "reader-b",
    requesterProfile: { userId: "reader-a" },
    recipientProfile: { userId: "reader-b" },
  }

  assert.equal(getDirectMessagePartner(conversation, "reader-a")?.userId, "reader-b")
  assert.equal(getDirectMessagePartner(conversation, "reader-b")?.userId, "reader-a")
})

test("pending requests allow only the requester's first note", () => {
  const pending = {
    requester_id: "reader-a",
    recipient_id: "reader-b",
    status: "pending",
    messageCount: 0,
  }

  assert.equal(canReplyToConversation(pending, "reader-a"), true)
  assert.equal(canReplyToConversation(pending, "reader-b"), false)
  assert.equal(canReplyToConversation({ ...pending, messageCount: 1 }, "reader-a"), false)
  assert.equal(canReplyToConversation({ ...pending, status: "accepted" }, "reader-b"), true)
})
