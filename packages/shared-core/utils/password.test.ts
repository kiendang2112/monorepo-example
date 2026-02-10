import { describe, expect, test } from "bun:test"

import { hashPassword, verifyPassword } from "./password"

describe("Password Utils", () => {
  test("hash and verify password", async () => {
    const password = "mysecretpassword"
    const hash = await hashPassword(password)
    const isValid = await verifyPassword(password, hash)
    expect(isValid).toBe(true)

    const isInvalid = await verifyPassword("wrongpassword", hash)
    expect(isInvalid).toBe(false)
  })
})
