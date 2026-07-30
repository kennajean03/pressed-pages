import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs"
import { execFileSync } from "node:child_process"
import { extname, join } from "node:path"

const failures = []
const warnings = []
const maximumChunkBytes = 500 * 1024

const trackedFiles = execFileSync("git", ["ls-files"], {
  encoding: "utf8",
})
  .split("\n")
  .filter(Boolean)

if (trackedFiles.includes(".env")) {
  failures.push(".env is tracked; production credentials must remain local.")
}

for (const requiredFile of [
  ".env.example",
  "dist/index.html",
  "vercel.json",
]) {
  if (!existsSync(requiredFile)) {
    failures.push(`${requiredFile} is missing.`)
  }
}

if (existsSync("dist/assets")) {
  for (const fileName of readdirSync("dist/assets")) {
    const extension = extname(fileName)
    if (![".js", ".css"].includes(extension)) continue

    const byteSize = statSync(join("dist/assets", fileName)).size
    if (byteSize > maximumChunkBytes) {
      failures.push(
        `${fileName} is ${(byteSize / 1024).toFixed(1)} kB; split it below 500 kB.`
      )
    }
  }
}

const sourceFiles = trackedFiles.filter(
  (fileName) =>
    fileName.startsWith("src/") &&
    [".js", ".jsx"].includes(extname(fileName))
)

for (const fileName of sourceFiles) {
  const source = readFileSync(fileName, "utf8")
  if (/\bdebugger\b/.test(source)) {
    failures.push(`${fileName} contains a debugger statement.`)
  }
  if (/\bconsole\.(log|debug)\s*\(/.test(source)) {
    warnings.push(`${fileName} contains console logging.`)
  }
}

if (warnings.length) {
  console.warn(warnings.map((warning) => `Warning: ${warning}`).join("\n"))
}

if (failures.length) {
  console.error(failures.map((failure) => `Release audit failed: ${failure}`).join("\n"))
  process.exitCode = 1
} else {
  console.log("Release audit passed: credentials, chunks, and production files are ready.")
}
