import assert from "node:assert/strict"
import test from "node:test"

import {
  loadJsonPreference,
  saveJsonPreference,
} from "../src/lib/preferencesStorage.js"

function createStorage(initialValue = null) {
  let value = initialValue

  return {
    getItem() {
      return value
    },
    setItem(_key, nextValue) {
      value = nextValue
    },
    value() {
      return value
    },
  }
}

test("preference loading survives corrupted browser JSON", () => {
  const fallback = { books: "75" }
  const errors = []
  const result = loadJsonPreference({
    storage: createStorage("{broken"),
    key: "goals",
    fallback,
    validate: (value) => Boolean(value && typeof value === "object"),
    onError: (error) => errors.push(error),
  })

  assert.equal(result, fallback)
  assert.equal(errors.length, 1)
})

test("preference validation rejects an unexpected shape", () => {
  const fallback = []
  const result = loadJsonPreference({
    storage: createStorage('{"not":"a list"}'),
    key: "challenges",
    fallback,
    validate: Array.isArray,
  })

  assert.equal(result, fallback)
})

test("preference saves report quota failures without throwing", () => {
  const quotaError = new Error("quota exceeded")
  const result = saveJsonPreference({
    storage: {
      setItem() {
        throw quotaError
      },
    },
    key: "goals",
    value: { books: "100" },
  })

  assert.equal(result.ok, false)
  assert.equal(result.error, quotaError)
})

test("preference saves serialize the current value", () => {
  const storage = createStorage()
  const result = saveJsonPreference({
    storage,
    key: "goals",
    value: { books: "100" },
  })

  assert.equal(result.ok, true)
  assert.equal(storage.value(), '{"books":"100"}')
})
