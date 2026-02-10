// Module mã hóa/giải mã dữ liệu sử dụng AES-256-GCM cho các trường hợp lưu trữ nhạy cảm trong database.
// Sử dụng PBKDF2 để derive key từ password với random salt và random IV cho mỗi lần mã hóa.
// Format output: base64(salt[16] + iv[12] + authTag[16] + ciphertext)
import crypto from "node:crypto"

/**
 * Thuật toán mã hóa sử dụng
 */
const ALGORITHM = "aes-256-gcm"
const KEY_LENGTH = 32 // 256 bits
const IV_LENGTH = 12 // 96 bits (recommended for GCM)
const SALT_LENGTH = 16 // 128 bits
const AUTH_TAG_LENGTH = 16 // 128 bits
const PBKDF2_ITERATIONS = 100_000

/**
 * Custom error cho DataEncryption
 */
export class DataEncryptionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "DataEncryptionError"
  }
}

/**
 * Đối tượng dataEncryption cung cấp các hàm mã hóa và giải mã dữ liệu.
 * - encrypt: Mã hóa chuỗi đầu vào với password (random salt + IV mỗi lần).
 * - decrypt: Giải mã chuỗi đã mã hóa với password.
 */
const dataEncryption = {
  /**
   * Mã hóa dữ liệu đầu vào thành chuỗi base64 sử dụng AES-256-GCM.
   * Output format: base64(salt[16] + iv[12] + authTag[16] + ciphertext)
   * @param data Chuỗi cần mã hóa
   * @param password Chuỗi password dùng để derive key
   * @returns Chuỗi đã mã hóa dạng base64
   * @throws DataEncryptionError nếu input không hợp lệ
   */
  encrypt: (data: string, password: string): string => {
    if (!data || typeof data !== "string") {
      throw new DataEncryptionError("Data must be a non-empty string")
    }
    if (!password || typeof password !== "string") {
      throw new DataEncryptionError("Password must be a non-empty string")
    }

    const salt = crypto.randomBytes(SALT_LENGTH)
    const iv = crypto.randomBytes(IV_LENGTH)
    const key = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LENGTH, "sha256")

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH })
    const encrypted = Buffer.concat([cipher.update(data, "utf8"), cipher.final()])
    const authTag = cipher.getAuthTag()

    // Format: salt (16 bytes) + iv (12 bytes) + authTag (16 bytes) + ciphertext
    return Buffer.concat([salt, iv, authTag, encrypted]).toString("base64")
  },

  /**
   * Giải mã chuỗi base64 đã mã hóa về dữ liệu gốc.
   * @param data Chuỗi đã mã hóa dạng base64 (format: salt + iv + authTag + ciphertext)
   * @param password Chuỗi password dùng để derive key
   * @returns Chuỗi dữ liệu gốc
   * @throws DataEncryptionError nếu giải mã thất bại hoặc input không hợp lệ
   */
  decrypt: (data: string, password: string): string => {
    if (!data || typeof data !== "string") {
      throw new DataEncryptionError("Data must be a non-empty string")
    }
    if (!password || typeof password !== "string") {
      throw new DataEncryptionError("Password must be a non-empty string")
    }

    try {
      const buffer = Buffer.from(data, "base64")

      const minLength = SALT_LENGTH + IV_LENGTH + AUTH_TAG_LENGTH + 1
      if (buffer.length < minLength) {
        throw new DataEncryptionError("Invalid encrypted data format")
      }

      const salt = buffer.subarray(0, SALT_LENGTH)
      const iv = buffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH)
      const authTag = buffer.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + AUTH_TAG_LENGTH)
      const ciphertext = buffer.subarray(SALT_LENGTH + IV_LENGTH + AUTH_TAG_LENGTH)

      const key = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LENGTH, "sha256")

      const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH })
      decipher.setAuthTag(authTag)
      const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()])

      return decrypted.toString("utf8")
    } catch (error) {
      if (error instanceof DataEncryptionError) {
        throw error
      }
      throw new DataEncryptionError("Decryption failed: invalid password or corrupted data")
    }
  },
}

export default dataEncryption
