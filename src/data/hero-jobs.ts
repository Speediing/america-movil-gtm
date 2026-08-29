export type HeroJobIcon =
  | "outbound"
  | "research"
  | "follow-up"
  | "deal-desk"
  | "pipeline"
  | "renewal"
  | "competitive"
  | "chief-of-staff";

export type HeroJob = {
  id: string;
  label: string;
  teammate: string;
  icon: HeroJobIcon;
  account: string;
  signal: string;
  work: string;
  result: string;
  user: string;
  bot: string;
};

export const HERO_JOBS = [
  {
    id: "morning-inbox",
    label: "Morning inbox",
    teammate: "Inbox",
    icon: "outbound",
    account: "Sample telecom account",
    signal: "Coverage question in the sample inbox",
    work: "I sorted the open messages, flagged the coverage question that needs judgment, and prepared a short reply for review.",
    result: "Reply draft ready, not sent",
    user: "hold it for my review",
    bot: "held. nothing was sent.",
  },
  {
    id: "account-research",
    label: "Account research",
    teammate: "Scout",
    icon: "research",
    account: "Sample telecom account",
    signal: "Account added to the sample list",
    work: "I opened public sources for network footprint and service context, separated facts from open questions, and linked each source.",
    result: "Research brief draft ready, not shared",
    user: "show the sources and leave gaps",
    bot: "done. no outreach was sent.",
  },
  {
    id: "meeting-prep",
    label: "Meeting prep",
    teammate: "Prep",
    icon: "competitive",
    account: "Sample customer meeting",
    signal: "Calendar prep window opened",
    work: "I drafted an agenda for coverage, rollout, and technical questions, then marked every assumption for the seller to confirm.",
    result: "Meeting brief draft ready, not shared",
    user: "keep the assumptions labeled",
    bot: "labeled. the brief stays private.",
  },
  {
    id: "live-call-notes",
    label: "Live-call notes",
    teammate: "Room",
    icon: "renewal",
    account: "Sample discovery call",
    signal: "Meeting started",
    work: "I captured working notes on sites, coverage, and timing, kept buyer statements separate, and marked owners for confirmation.",
    result: "Live-note draft ready, not shared",
    user: "do not share until I review",
    bot: "held. nothing was shared.",
  },
  {
    id: "sourced-product-answer",
    label: "Sourced product answer",
    teammate: "Answer",
    icon: "deal-desk",
    account: "Sample product question",
    signal: "Question needs an approved source",
    work: "I checked approved sources for the deployment question, linked the relevant pages, and flagged the part that still needs an owner.",
    result: "Sourced answer draft ready, not sent",
    user: "route the unsupported part",
    bot: "flagged for review. the draft stays unsent.",
  },
  {
    id: "deck-update",
    label: "Deck update",
    teammate: "Slides",
    icon: "pipeline",
    account: "Sample working session",
    signal: "Reviewed notes are available",
    work: "I turned confirmed notes on service area, rollout, and open technical questions into slides, with gaps left in a review list.",
    result: "Deck draft ready, not shared",
    user: "leave it in draft",
    bot: "saved as a draft. no link was shared.",
  },
  {
    id: "next-step-draft",
    label: "Next-step draft",
    teammate: "Nudge",
    icon: "follow-up",
    account: "Sample opportunity",
    signal: "Meeting ended",
    work: "I drafted a recap with a coverage check, technical review, proposed owners, and dates for seller approval.",
    result: "Next-step draft ready, not sent",
    user: "queue it for my approval",
    bot: "queued. nothing was sent.",
  },
  {
    id: "weekly-brief",
    label: "Weekly brief",
    teammate: "Brief",
    icon: "chief-of-staff",
    account: "Sample weekly review",
    signal: "Weekly review window opened",
    work: "I summarized open account work, pending technical answers, approval gaps, and missing evidence in a short brief.",
    result: "Weekly brief draft ready, not shared",
    user: "keep it private for Friday",
    bot: "private and unsent.",
  },
] satisfies readonly HeroJob[];
