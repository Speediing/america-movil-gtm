import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const src = "private/media/job-clips";
const dest = "public/media/job-clips";

if (!existsSync(src)) {
  process.exit(0);
}

mkdirSync(dest, { recursive: true });

for (const name of readdirSync(src)) {
  if (!name.endsWith(".mp4")) continue;
  const from = join(src, name);
  if (statSync(from).size < 50_000) continue;
  cpSync(from, join(dest, name));
}
