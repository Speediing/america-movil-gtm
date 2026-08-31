import type { ClipId, JobId } from "./types";

export type SiteKind =
  | "granola"
  | "figma"
  | "gong"
  | "sfdc-account"
  | "sfdc-opp"
  | "sheets"
  | "gmail"
  | "slack"
  | "gdoc"
  | "linkedin"
  | "research"
  | "page"
  | "clip";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  clip?: ClipId;
  tabs: ChromeTab[];
};

const granola = { id: "granola", host: "granola.app", label: "Granola" };
const figma = { id: "figma", host: "figma.com", label: "Figma" };
const gmail = { id: "gmail", host: "mail.google.com", label: "Gmail" };
const docs = { id: "docs", host: "docs.google.com", label: "Docs" };
const linkedin = {
  id: "linkedin",
  host: "www.linkedin.com",
  label: "LinkedIn",
};
const web = { id: "web", host: "example.com", label: "Public web" };

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "standardize-room": {
    m1: {
      pill: "Opening the sample session",
      host: "granola.app",
      path: "/notes/sample-account",
      title: "Sample account working session",
      site: "granola",
      tabs: [granola, figma, gmail],
    },
    m2: {
      pill: "Reviewing live notes",
      host: "granola.app",
      path: "/notes/sample-account",
      title: "Sample account working session",
      site: "granola",
      tabs: [granola, figma, gmail],
    },
    m3: {
      pill: "Writing the working-session deck",
      host: "figma.com",
      path: "/file/sample-working-session",
      title: "Sample working-session deck",
      site: "figma",
      tabs: [granola, figma, gmail],
    },
    m4: {
      pill: "Draft parked for seller review",
      host: "figma.com",
      path: "/file/sample-working-session",
      title: "Sample working-session deck",
      site: "figma",
      tabs: [granola, figma, gmail],
    },
  },
  "legal-redlines": {
    m1: {
      pill: "Opening the sample question",
      host: "mail.google.com",
      path: "/mail/u/0/#inbox",
      title: "Inbox",
      site: "gmail",
      tabs: [gmail, docs],
    },
    m2: {
      pill: "Checking approved public sources",
      host: "docs.google.com",
      path: "/document/d/sample-source-notes",
      title: "Source notes",
      site: "gdoc",
      tabs: [gmail, docs],
    },
    m3: {
      pill: "Building the sourced answer",
      host: "docs.google.com",
      path: "/document/d/sample-source-notes",
      title: "Source notes",
      site: "gdoc",
      tabs: [gmail, docs],
    },
    m4: {
      pill: "Drafting the reply, not sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, docs],
    },
    m5: {
      pill: "Draft parked for seller review",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, docs],
    },
  },
  "attach-engine": {
    m1: {
      pill: "Opening public sources",
      host: "example.com",
      path: "/sample-account",
      title: "Sample account public source",
      site: "research",
      tabs: [web, docs, linkedin, gmail],
    },
    m2: {
      pill: "Marking verified facts and gaps",
      host: "example.com",
      path: "/sample-account",
      title: "Sample account public source",
      site: "research",
      tabs: [web, docs, linkedin, gmail],
    },
    m3: {
      pill: "Writing the account brief",
      host: "docs.google.com",
      path: "/document/d/sample-account-brief",
      title: "Sample account brief",
      site: "gdoc",
      tabs: [web, docs, linkedin, gmail],
    },
    m4: {
      pill: "Drafting the first touch, not sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [web, docs, linkedin, gmail],
    },
    m5: {
      pill: "Drafts parked for seller review",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [web, docs, linkedin, gmail],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
