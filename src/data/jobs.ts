import type { Artifact, CroJob, SlideCard } from "./types";

export const WORKING_SESSION_SLIDES: SlideCard[] = [
  {
    n: 1,
    kicker: "Illustrative draft",
    voice: "them",
    title: "Priority",
    body: "Add the priority stated in the room. Do not add a claim the buyer did not make.",
  },
  {
    n: 2,
    kicker: "Illustrative draft",
    voice: "us",
    title: "Working path",
    body: "Show one clear next step tied to the stated priority.",
  },
  {
    n: 3,
    kicker: "Illustrative draft",
    voice: "them",
    title: "Owners",
    body: "List role owners only after the seller confirms them.",
  },
  {
    n: 4,
    kicker: "Draft · not sent",
    voice: "us",
    title: "Next meeting",
    body: "Propose a short agenda, an owner, and a date for seller review.",
  },
];

export const SAMPLE_SOURCED_REPLY: Extract<
  Artifact,
  { kind: "redlines" }
> = {
  kind: "redlines",
  title: "Illustrative sourced answer",
  paperTitle: "Sample questions",
  from: "Sample buyer · illustrative email",
  marks: [
    {
      text: "Where can I review product guidance?",
      note: "Use the linked public documentation. Confirm the exact page before sending.",
      take: true,
    },
    {
      text: "Where can our team review security information?",
      note: "Use the linked public security page. Route detailed questions to the approved owner.",
      take: true,
    },
  ],
  sources: [
    {
      label: "Cursor documentation",
      url: "https://cursor.com/docs",
    },
    {
      label: "Cursor security",
      url: "https://cursor.com/security",
    },
  ],
  reply: {
    to: "Sample buyer",
    subject: "Sources for your review",
    body: "Illustrative draft. Not sent.\n\nHi,\n\nI linked the public product guidance and security page below. Please use those sources for review. I will confirm any detailed follow-up with the approved owner before I send a final answer.\n\nBest,",
  },
};

export const SAMPLE_OUTREACH: Extract<Artifact, { kind: "outbound" }> = {
  kind: "outbound",
  title: "Illustrative account brief and outreach draft",
  account: "Sample account",
  hypothesis: [
    {
      k: "Why us",
      body: "Draft a short workflow hypothesis. Keep it as a hypothesis until the seller confirms it.",
    },
    {
      k: "Why now",
      body: "Use a current, linked public signal if one exists. No signal is assumed in this sample.",
    },
    {
      k: "Why them",
      body: "Start with the role that owns the workflow. Confirm the person before outreach.",
    },
  ],
  evidence: [
    {
      source: "Official website",
      finding: "Illustrative placeholder. Add a linked public fact before seller review.",
    },
    {
      source: "Public press page",
      finding: "Illustrative placeholder. No customer claim is included.",
    },
  ],
  targets: [
    {
      name: "Sample contact",
      role: "Role unconfirmed",
      why: "Role placeholder. Confirm ownership before outreach.",
    },
  ],
  page: {
    headline: "A working note for Sample account",
    body: "Illustrative draft. Add only sourced account facts and seller-approved language before sharing.",
  },
};

export const JOBS: CroJob[] = [
  {
    id: "standardize-room",
    number: 1,
    title: "Turn a live call into a working deck",
    trigger: "a sample customer call starts",
    backgroundAction: "Room listens and updates the open draft",
    problem:
      "The seller needs a clean record of the room without stopping the conversation to edit slides.",
    botJob:
      "Room follows the call, keeps only buyer-stated points, and prepares a short working-session deck.",
    storyboard: [
      {
        when: "Call starts",
        label: "Room joins the sample session and opens the draft.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Sample account working session",
          people: [
            { initials: "AE", name: "Seller" },
            { initials: "SB", name: "Sample buyer" },
            { initials: "RM", name: "Room" },
          ],
        },
      },
      {
        when: "During discovery",
        label: "Room makes space for a buyer-stated priority.",
        scene: "demo",
        visual: {
          kind: "live-note",
          timestamp: "Live",
          label: "Illustrative placeholder",
          note: "Add the buyer's words only after the seller confirms them.",
          signals: ["Sample only", "Needs seller review"],
        },
      },
      {
        when: "Before wrap-up",
        label: "Room turns the notes into four concise draft slides.",
        scene: "notes",
        visual: {
          kind: "deck-update",
          eyebrow: "Illustrative sample",
          headline: "Priority, path, owners, next meeting",
          product: "Draft only",
          status: "4 slides ready for review",
        },
      },
      {
        when: "Final artifact",
        label: "Illustrative working-session slide set. Draft only. Not sent.",
        scene: "deck",
        slides: WORKING_SESSION_SLIDES,
      },
    ],
    unlock:
      "A seller-reviewed working deck can be ready before the sample call ends.",
    outcome:
      "One sample call becomes a concise draft deck for seller review.",
    clips: [],
    demo: {
      title: "Room",
      subtitle: "Live notes to a working-session deck",
      participants: [
        { id: "you", name: "Seller", role: "you" },
        {
          id: "room",
          name: "Room",
          role: "bot",
          persona: "Turns a live sample session into a concise draft deck",
          color: "oklch(0.5 0.17 253)",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "room",
          kind: "routine",
          body: "Illustrative sample session detected. I am following the call and keeping only buyer-stated points.",
        },
        {
          id: "m2",
          from: "room",
          kind: "text",
          body: "I have a sample priority, a possible owner, and a next-step placeholder. All need seller review.",
        },
        {
          id: "m3",
          from: "room",
          kind: "draft",
          draftLabel: "Illustrative slide set · not sent",
          artifact: {
            kind: "slides",
            title: "Sample account working-session draft",
            cards: WORKING_SESSION_SLIDES,
          },
        },
        {
          id: "m4",
          from: "room",
          kind: "system",
          body: "Draft only. Nothing was sent or shared.",
        },
      ],
    },
  },
  {
    id: "legal-redlines",
    number: 2,
    title: "Find a sourced answer",
    trigger: "a sample buyer question lands",
    backgroundAction: "Answer checks approved sources and drafts a reply",
    problem:
      "The seller needs a fast answer with clear sources and a review step.",
    botJob:
      "Answer finds approved public references, shows its sources, and prepares a reply that stays unsent.",
    storyboard: [
      {
        when: "Question arrives",
        label: "Answer picks up the illustrative buyer email.",
        scene: "notes",
        visual: {
          kind: "procurement-email",
          sender: "Sample buyer · Sample account",
          subject: "Product and security sources",
          status: "Questions ready for source checks",
        },
      },
      {
        when: "Source check",
        label: "Answer opens the approved public references.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Public docs", answer: "Source linked" },
            { name: "Security page", answer: "Source linked" },
          ],
          status: "Sources checked",
        },
      },
      {
        when: "Seller review",
        label: "Answer prepares a concise reply with both links.",
        scene: "send",
        visual: {
          kind: "reply-ready",
          to: "Sample buyer",
          subject: "Sources for your review",
          status: "Illustrative draft",
        },
      },
      {
        when: "Final artifact",
        label: "Illustrative sourced answer and reply. Draft only. Not sent.",
        scene: "send",
        artifact: SAMPLE_SOURCED_REPLY,
      },
    ],
    unlock:
      "The seller gets a sourced draft without chasing several internal threads.",
    outcome:
      "One sample question becomes a sourced answer and an unsent reply.",
    clips: [],
    demo: {
      title: "Answer",
      subtitle: "Question to sourced reply",
      participants: [
        { id: "you", name: "Seller", role: "you" },
        {
          id: "answer",
          name: "Answer",
          role: "bot",
          persona: "Checks approved sources and prepares a concise reply",
          color: "oklch(0.57 0.2 25)",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "answer",
          kind: "routine",
          body: "Illustrative buyer question detected. I am checking public product and security sources.",
        },
        {
          id: "m2",
          from: "answer",
          kind: "text",
          body: "Two public references are ready. I have not added any account claim.",
        },
        {
          id: "m3",
          from: "answer",
          kind: "draft",
          draftLabel: "Illustrative sourced answer · not sent",
          artifact: SAMPLE_SOURCED_REPLY,
        },
        {
          id: "m4",
          from: "answer",
          kind: "draft",
          draftLabel: "Illustrative email reply · not sent",
          artifact: {
            kind: "gmail",
            title: "Sample reply",
            to: SAMPLE_SOURCED_REPLY.reply.to,
            subject: SAMPLE_SOURCED_REPLY.reply.subject,
            body: SAMPLE_SOURCED_REPLY.reply.body,
          },
        },
        {
          id: "m5",
          from: "answer",
          kind: "system",
          body: "Draft only. Nothing was sent.",
        },
      ],
    },
  },
  {
    id: "attach-engine",
    number: 3,
    title: "Prepare a careful first touch",
    trigger: "a sample account enters the seller's list",
    backgroundAction: "Scout gathers public sources and drafts a brief",
    problem:
      "A first touch needs a clear hypothesis, a real source, and seller judgment.",
    botJob:
      "Scout gathers public references, marks every gap, and prepares an account brief and outreach draft.",
    storyboard: [
      {
        when: "Account added",
        label: "Scout opens a clean research workspace for Sample account.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Sample account",
          sources: ["Official website", "Press page", "Public profile"],
          signal: "No claim until sourced",
        },
      },
      {
        when: "Research pass",
        label: "Scout separates placeholders from verified public facts.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Why us", answer: "Hypothesis only" },
            { label: "Why now", answer: "Needs a linked signal" },
            { label: "Why them", answer: "Role needs confirmation" },
          ],
        },
      },
      {
        when: "Draft review",
        label: "Scout queues a brief and two unsent outreach drafts.",
        scene: "map",
        visual: {
          kind: "outreach-ready",
          person: "Sample contact · role unconfirmed",
          channels: ["Account brief", "Email", "LinkedIn"],
          status: "Illustrative drafts · 0 sent",
        },
      },
      {
        when: "Final artifact",
        label: "Illustrative account brief and outreach. Draft only. Not sent.",
        scene: "send",
        artifact: SAMPLE_OUTREACH,
      },
    ],
    unlock:
      "The seller starts with sources, visible gaps, and an editable first draft.",
    outcome:
      "One sample account becomes a reviewable brief and unsent outreach.",
    clips: [],
    demo: {
      title: "Scout",
      subtitle: "Public research to a careful first touch",
      participants: [
        { id: "you", name: "Seller", role: "you" },
        {
          id: "scout",
          name: "Scout",
          role: "bot",
          persona: "Finds public references and marks every unverified gap",
          color: "oklch(0.5 0.17 253)",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "scout",
          kind: "routine",
          body: "Sample account entered the list. I am opening public sources and will mark every placeholder.",
        },
        {
          id: "m2",
          from: "scout",
          kind: "text",
          body: "Research workspace is ready. No customer fact is assumed in this illustrative sample.",
        },
        {
          id: "m3",
          from: "scout",
          kind: "draft",
          draftLabel: "Illustrative account brief · not sent",
          artifact: SAMPLE_OUTREACH,
        },
        {
          id: "m4",
          from: "scout",
          kind: "draft",
          draftLabel: "Illustrative email · not sent",
          artifact: {
            kind: "gmail",
            title: "Sample outreach",
            to: "Sample contact",
            subject: "A short working-session idea",
            body: "Illustrative draft. Not sent.\n\nHi,\n\nI am sharing a short workflow hypothesis for your review. I will add only linked public facts and confirm your role before sending a final note.\n\nBest,",
          },
        },
        {
          id: "m5",
          from: "scout",
          kind: "system",
          body: "Draft only. Nothing was sent or published.",
        },
      ],
    },
  },
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
