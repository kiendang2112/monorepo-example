/* eslint-disable no-console */
import { describe, expect, test } from "bun:test"

import DataEncryption, { DataEncryptionError } from "./data-encryption"

describe("DataEncryption", () => {
  const password = "my_secret_password"

  test("should encrypt and decrypt data correctly", () => {
    const data = "Hello, World!"

    const encrypted = DataEncryption.encrypt(data, password)
    const decrypted = DataEncryption.decrypt(encrypted, password)

    console.log("🚀 ~ encrypted:", encrypted)
    console.log("🚀 ~ decrypted:", decrypted)

    expect(decrypted).toBe(data)
  })

  test("should produce different ciphertext for same input (random IV)", () => {
    const data = "Same data"

    const encrypted1 = DataEncryption.encrypt(data, password)
    const encrypted2 = DataEncryption.encrypt(data, password)

    // Ciphertext should be different due to random salt and IV
    expect(encrypted1).not.toBe(encrypted2)

    // But both should decrypt to the same value
    expect(DataEncryption.decrypt(encrypted1, password)).toBe(data)
    expect(DataEncryption.decrypt(encrypted2, password)).toBe(data)
  })

  test("should fail to decrypt with wrong password", () => {
    const data = "Secret data"
    const encrypted = DataEncryption.encrypt(data, password)

    expect(() => DataEncryption.decrypt(encrypted, "wrong_password")).toThrow(DataEncryptionError)
  })

  test("should throw error for empty data", () => {
    expect(() => DataEncryption.encrypt("", password)).toThrow(DataEncryptionError)
    expect(() => DataEncryption.decrypt("", password)).toThrow(DataEncryptionError)
  })

  test("should throw error for empty password", () => {
    expect(() => DataEncryption.encrypt("data", "")).toThrow(DataEncryptionError)
    expect(() => DataEncryption.decrypt("data", "")).toThrow(DataEncryptionError)
  })

  test("should throw error for invalid encrypted data", () => {
    expect(() => DataEncryption.decrypt("invalid_base64_data", password)).toThrow(DataEncryptionError)
  })

  test("should handle unicode and special characters", () => {
    const data = "Xin chào 世界! 🎉 Special chars: <>&\"'"

    const encrypted = DataEncryption.encrypt(data, password)
    const decrypted = DataEncryption.decrypt(encrypted, password)

    expect(decrypted).toBe(data)
  })

  test("should handle long text", () => {
    const data = "A".repeat(10_000)

    const encrypted = DataEncryption.encrypt(data, password)
    const decrypted = DataEncryption.decrypt(encrypted, password)

    expect(decrypted).toBe(data)
  })
})
