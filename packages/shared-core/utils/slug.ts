import slugify from "slugify"

export function makeSlug(str: string) {
  return slugify(str, { lower: true, locale: "vi", strict: true })
}
