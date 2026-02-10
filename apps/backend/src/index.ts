import { $ } from "bun"

const commands = [
  "bun run --hot src/entry/server/index.ts",
]
const names = ["server"]
const colors = ["blue.bold"]

await $`concurrently \
  --color \
  --names ${names.join(",")} \
  --prefix-colors ${colors.join(",")} \
  --prefix "[{time}] [{name}]" \
  --timestamp-format "HH:mm:ss" \
  ${commands}`
