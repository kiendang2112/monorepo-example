import { expect, test } from "bun:test"

import { normalizeEmail } from "./email"

test("normalizeEmail", () => {
  expect(normalizeEmail("  Test.Email@Gmail.com  ")).toBe("testemail@gmail.com")
  expect(normalizeEmail("  Another.Email+Alias@Gmail.com  ")).toBe("anotheremail@gmail.com")
})
