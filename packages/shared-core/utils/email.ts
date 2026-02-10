/**
 * Normalize an email address to a standard format.
 * @param email - The email address to normalize
 * @returns The normalized email address
 */
export const normalizeEmail = (email: string) => {
  const raw = email.trim().toLowerCase()

  const at = raw.lastIndexOf("@")
  if (at === -1) {
    throw new Error("Invalid email address")
  }

  let local = raw.slice(0, at)
  const domain = raw.slice(at + 1)

  if (domain === "gmail.com" || domain === "googlemail.com") {
    local = local.replaceAll(".", "")
    const plus = local.indexOf("+")
    if (plus !== -1) local = local.slice(0, plus)
  }

  return `${local}@${domain}`
}
