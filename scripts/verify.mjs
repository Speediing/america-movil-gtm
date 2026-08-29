import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ignoredDirectories = new Set([".git", ".next", "node_modules"]);
const textExtensions = new Set([
  ".css",
  ".env",
  ".example",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".wgsl",
]);
const textNames = new Set([".env.example", ".gitignore"]);
const failures = [];

function fail(message) {
  failures.push(message);
}

function listTextFiles(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...listTextFiles(absolute));
      continue;
    }
    if (textNames.has(entry.name) || textExtensions.has(extname(entry.name))) {
      files.push(absolute);
    }
  }
  return files;
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function requireFile(path) {
  if (!existsSync(join(root, path))) {
    fail(`Missing required file: ${path}`);
    return false;
  }
  return true;
}

function requireIncludes(content, expected, label) {
  if (!content.includes(expected)) {
    fail(`Missing ${label}`);
  }
}

const files = listTextFiles(root);
const contents = files.map((absolute) => ({
  absolute,
  relative: relative(root, absolute),
  text: readFileSync(absolute, "utf8"),
}));

const phrase = (...parts) => parts.join("");
const word = (...parts) =>
  new RegExp(`\\b${parts.join("")}\\b`, "i");
const forbidden = [
  { label: "legacy customer name 1", pattern: word("data", "dog") },
  { label: "legacy customer name 2", pattern: word("sea", "gate") },
  { label: "legacy contact first name", pattern: word("made", "line") },
  { label: "legacy contact surname", pattern: word("ingle", "by") },
  { label: "legacy product detail 1", pattern: word("A", "P", "M") },
  { label: "legacy product detail 2", pattern: word("L", "ogs") },
  {
    label: "legacy incident detail",
    pattern: new RegExp(`${phrase("Sev", "-2")}`, "i"),
  },
  {
    label: "legacy product detail 3",
    pattern: new RegExp(`${phrase("Bits", " AI")}`, "i"),
  },
  {
    label: "legacy product detail 4",
    pattern: new RegExp(`${phrase("Cloud", " SIEM")}`, "i"),
  },
  { label: "legacy product detail 5", pattern: word("R", "UM") },
  {
    label: "legacy sample account",
    pattern: word("Ac", "me"),
  },
  {
    label: "legacy named buyer 1",
    pattern: new RegExp(phrase("Jordan", " Hale"), "i"),
  },
  {
    label: "legacy named buyer 2",
    pattern: new RegExp(phrase("Priya", " Shah"), "i"),
  },
  {
    label: "legacy named buyer 3",
    pattern: new RegExp(phrase("Chris", " Okonkwo"), "i"),
  },
  {
    label: "legacy named account 1",
    pattern: word("Glob", "ex"),
  },
  {
    label: "legacy named account 2",
    pattern: word("Ini", "tech"),
  },
  {
    label: "legacy named account 3",
    pattern: word("Umbr", "ella"),
  },
  {
    label: "legacy named account 4",
    pattern: word("Ho", "oli"),
  },
  {
    label: "legacy named account 5",
    pattern: new RegExp(phrase("Aster", " Peak"), "i"),
  },
  {
    label: "legacy section heading",
    pattern: new RegExp(["What", "we", "heard"].join("\\s+"), "i"),
  },
  {
    label: "legacy static artifact",
    pattern: new RegExp(phrase("where", "-cursor-fits"), "i"),
  },
  {
    label: "legacy recorded media",
    pattern: new RegExp(phrase("krista", "-clips"), "i"),
  },
  {
    label: "legacy watercolor asset",
    pattern: new RegExp(
      `${phrase("water", "color")}-(?:${["pad", "orbit", "room", "deal", "attach"].join("|")})`,
      "i",
    ),
  },
  { label: "em dash", pattern: /\u2014/u },
];

for (const value of [
  "632ca6",
  "4c1d82",
  "1b1820",
  "3f0e40",
  "a259ff",
  "c6a7ea",
  "d9b8ff",
  "f8e7f8",
  "6ebe49",
]) {
  forbidden.push({
    label: "legacy color",
    pattern: new RegExp(`#${value}`, "i"),
  });
}

for (const file of contents) {
  for (const item of forbidden) {
    if (item.pattern.test(file.text)) {
      fail(`${item.label} found in ${file.relative}`);
    }
  }
}

const pageSource = read("src/app/(protected)/page.tsx");
const layoutSource = read("src/app/layout.tsx");
const authSource = read("src/lib/auth.ts");
const brandSource = read("src/data/brand.ts");
const brandLockup = read("src/components/BrandLockup.tsx");
const heroDemoSource = read("src/components/HeroDemo.tsx");
const heroJobsSource = read("src/data/hero-jobs.ts");
const jobSectionSource = read("src/components/JobSection.tsx");
const globalsSource = read("src/app/globals.css");

requireIncludes(layoutSource, "América Móvil x SpaceXAI", "page title");
requireIncludes(pageSource, "mike.weinert@cursor.com", "footer contact");
requireIncludes(pageSource, "Mike Weinert", "footer contact name");
requireIncludes(pageSource, "SFDC owner", "footer contact label");
requireIncludes(authSource, "process.env.SITE_PASSWORD", "SITE_PASSWORD reference");
requireIncludes(
  brandSource,
  "https://www.americamovil.com/English/press-room/default.aspx",
  "official press-room provenance",
);
requireIncludes(
  brandSource,
  "https://s22.q4cdn.com/604986553/files/design/americamovil-logo.png",
  "official logo provenance",
);
requireIncludes(
  pageSource,
  "/brand/america-movil-watercolor.jpg",
  "hero and orbit watercolor reference",
);
requireIncludes(
  brandLockup,
  "AMERICA_MOVIL_BRAND.officialLogo",
  "official customer mark lockup",
);
requireIncludes(
  jobSectionSource,
  "/brand/america-movil-watercolor.jpg",
  "section watercolor wash",
);
requireIncludes(
  globalsSource,
  'url("/brand/america-movil-watercolor.jpg")',
  "login watercolor wash",
);
requireIncludes(pageSource, "<HeroDemo />", "HeroDemo page integration");
requireIncludes(pageSource, "<HeroTelemetry />", "hero telemetry integration");
requireIncludes(
  heroDemoSource,
  'from "@/data/hero-jobs"',
  "HeroDemo job registry",
);
requireIncludes(heroDemoSource, 'className="hero"', "HeroDemo hero section");
requireIncludes(heroDemoSource, 'className="eyebrow"', "HeroDemo eyebrow");
requireIncludes(heroDemoSource, "<h1>", "HeroDemo heading");
requireIncludes(heroDemoSource, 'className="hero-intro"', "HeroDemo intro");
for (const selector of [
  ".hero-phone-jobs {",
  ".hero-bot-demo {",
  ".hero-phone {",
]) {
  requireIncludes(globalsSource, selector, `${selector.slice(1, -2)} CSS`);
}
if (!/<HeroTelemetry\s*\/>\s*<HeroDemo\s*\/>/.test(pageSource)) {
  fail("HeroTelemetry must stay directly behind HeroDemo");
}
if (
  pageSource.includes('className="hero"') ||
  pageSource.includes('className="eyebrow"') ||
  pageSource.includes('className="hero-phone-jobs"')
) {
  fail("HeroDemo must own the entire hero section");
}
const heroClassStructure = [
  'className="hero"',
  'className="hero-copy"',
  'className="hero-phone-jobs"',
  'className="hero-bot-demo"',
  'className="hero-phone"',
  'className="hero-phone-notch"',
  'className="hero-phone-header"',
  'className="hero-phone-thread"',
  'className="hero-phone-composer"',
];
let previousHeroClassIndex = -1;
for (const className of heroClassStructure) {
  const index = heroDemoSource.indexOf(className);
  if (index < 0) {
    fail(`Missing HeroDemo structure: ${className}`);
  } else if (index <= previousHeroClassIndex) {
    fail(`HeroDemo structure is out of order: ${className}`);
  }
  previousHeroClassIndex = index;
}
if (
  (pageSource.match(/\/brand\/america-movil-watercolor\.jpg/g) || []).length < 2
) {
  fail("Header and orbit break must both use the América Móvil watercolor");
}
requireIncludes(authSource, "america_movil_gtm_session", "customer cookie namespace");
requireIncludes(authSource, "america-movil-gtm:", "customer session namespace");
requireIncludes(brandSource, 'slug: "america-movil"', "customer slug");
requireIncludes(brandSource, 'project: "america-movil-gtm"', "project identity");

requireFile("src");
requireFile("src/lib/hero-telemetry.wgsl");
requireFile("src/lib/startHeroTelemetry.ts");
requireFile("src/components/HeroDemo.tsx");
requireFile("src/data/hero-jobs.ts");
requireFile("public/brand/america-movil-watercolor.jpg");

const allowedBrandAssets = new Set([
  "america-movil-watercolor.jpg",
  "spacexai.svg",
]);
for (const asset of readdirSync(join(root, "public/brand"))) {
  if (!allowedBrandAssets.has(asset)) {
    fail(`Unexpected brand asset: ${asset}`);
  }
}
for (const path of [
  phrase("private/media/krista", "-clips"),
  "public/avatars",
  phrase("public/media/krista", "-clips"),
  phrase("public/media/where", "-cursor-fits.jpg"),
]) {
  const absolute = join(root, path);
  const hasLegacyMedia =
    existsSync(absolute) &&
    (extname(path) !== "" || readdirSync(absolute).length > 0);
  if (hasLegacyMedia) {
    fail(`Legacy template media must be removed: ${path}`);
  }
}

const envExample = read(".env.example");
const passwordMatch = envExample.match(/^SITE_PASSWORD=(.+)$/m);
if (!passwordMatch?.[1]) {
  fail(".env.example must define SITE_PASSWORD");
} else {
  for (const file of contents) {
    if (file.relative !== ".env.example" && file.text.includes(passwordMatch[1])) {
      fail(`Literal site password found outside .env.example: ${file.relative}`);
    }
  }
}

const packageJson = JSON.parse(read("package.json"));
if (packageJson.name !== "america-movil-gtm") {
  fail("Package name must be america-movil-gtm");
}
if (packageJson.scripts?.verify !== "node scripts/verify.mjs") {
  fail("npm verify script is missing");
}
const expectedVersions = {
  next: "15.5.24",
  geist: "^1.7.2",
  vgpu: "^0.3.1",
  react: "19.1.0",
  "react-dom": "19.1.0",
};
for (const [name, version] of Object.entries(expectedVersions)) {
  if (packageJson.dependencies?.[name] !== version) {
    fail(`Wrong ${name} version`);
  }
}

const shader = read("src/lib/hero-telemetry.wgsl");
const telemetry = read("src/lib/startHeroTelemetry.ts");
if (!shader.includes("@fragment") || !shader.includes("linkSignal")) {
  fail("WGSL telecom network field is missing");
}
if (!telemetry.includes('from "vgpu"') || !telemetry.includes("telemetryShader")) {
  fail("vgpu hero integration is missing");
}

const fleet = read("src/data/fleet.ts");
for (const name of ["Seller", "Room", "Answer", "Scout", "Brief"]) {
  if (!fleet.includes(`name: "${name}"`)) {
    fail(`Fleet teammate is missing: ${name}`);
  }
}
const roster = read("src/components/RosterChart.tsx");
requireIncludes(roster, "Has its own computer", "fleet computer statement");
requireIncludes(roster, "org-computer", "fleet computer visual");

const windowSource = read("src/components/GrokBotWindow.tsx");
const chatIndex = windowSource.indexOf('className="gb-thread"');
const computerIndex = windowSource.indexOf('className="pc-screen pc-desk"');
if (chatIndex < 0 || computerIndex < 0 || chatIndex >= computerIndex) {
  fail("JobMore must keep chat on the left and computer on the right");
}

const brandCss = globalsSource;
const markSizes = [...brandCss.matchAll(/--customer-h:\s*(\d+)px/g)].map(
  (match) => Number(match[1]),
);
if (!markSizes.length || markSizes.some((size) => size < 15 || size > 18)) {
  fail("Customer mark height must stay between 15px and 18px");
}
if (!brandCss.includes("oklch(")) {
  fail("América Móvil color tokens must use oklch()");
}

function closingIndex(source, openIndex, open, close) {
  let depth = 0;
  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  for (let index = openIndex; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (lineComment) {
      if (char === "\n") lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = "";
      }
      continue;
    }
    if (char === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }
    if (char === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === open) depth += 1;
    if (char === close) {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

function topLevelObjects(arraySource) {
  const objects = [];
  let index = 0;
  while (index < arraySource.length) {
    if (arraySource[index] !== "{") {
      index += 1;
      continue;
    }
    const end = closingIndex(arraySource, index, "{", "}");
    if (end < 0) break;
    objects.push(arraySource.slice(index, end + 1));
    index = end + 1;
  }
  return objects;
}

const heroJobsMarker = heroJobsSource.indexOf("export const HERO_JOBS");
const heroJobsOpen = heroJobsSource.indexOf("[", heroJobsMarker);
const heroJobsClose = closingIndex(heroJobsSource, heroJobsOpen, "[", "]");
if (heroJobsMarker < 0 || heroJobsOpen < 0 || heroJobsClose < 0) {
  fail("Could not parse HERO_JOBS");
} else if (
  topLevelObjects(heroJobsSource.slice(heroJobsOpen + 1, heroJobsClose)).length !==
  8
) {
  fail("HERO_JOBS must contain exactly eight jobs");
}

const jobsSource = read("src/data/jobs.ts");
const storyboards = [];
let searchFrom = 0;
while (true) {
  const marker = jobsSource.indexOf("storyboard:", searchFrom);
  if (marker < 0) break;
  const open = jobsSource.indexOf("[", marker);
  const close = closingIndex(jobsSource, open, "[", "]");
  if (open < 0 || close < 0) {
    fail("Could not parse a chapter storyboard");
    break;
  }
  storyboards.push(topLevelObjects(jobsSource.slice(open + 1, close)));
  searchFrom = close + 1;
}

if (storyboards.length !== 3) {
  fail("Expected exactly three JobSection chapters");
}
for (const [index, beats] of storyboards.entries()) {
  if (beats.length !== 4) {
    fail(`Chapter ${index + 1} must have exactly four beats`);
    continue;
  }
  if (!/\b(?:slides|artifact)\s*:/.test(beats[3])) {
    fail(`Chapter ${index + 1} final beat must contain slides or an artifact`);
  }
}
if ((jobsSource.match(/clips:\s*\[\s*\]/g) || []).length !== 3) {
  fail("Every JOBS clips array must be empty");
}

const heardSlide = read("src/components/HeardSlide.tsx");
requireIncludes(heardSlide, "slides.map", "dynamic slide artifact");

const quotes = read("src/data/quotes.ts");
if ((quotes.match(/\bsource:\s*"https:\/\/x\.com\//g) || []).length !== 6) {
  fail("Quote dataset must contain exactly the six rendered public quotes");
}

const architectureChecks = [
  ["src/app/(protected)/page.tsx", "RosterChart"],
  ["src/app/(protected)/page.tsx", "CompareTable"],
  ["src/app/(protected)/page.tsx", "QuoteWall"],
  ["src/components/JobSection.tsx", "Storyboard"],
  ["src/components/JobSection.tsx", "ChapterPayoff"],
  ["src/components/JobSection.tsx", "JobMore"],
  ["src/components/JobMore.tsx", "JobDemo"],
];
for (const [path, expected] of architectureChecks) {
  requireIncludes(read(path), expected, `${expected} architecture`);
}

if (failures.length) {
  console.error("Verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log("Verification passed.");
}
