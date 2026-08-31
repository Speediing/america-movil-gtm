import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  seat?: boolean;
};

export const FLEET: FleetBot[] = [
  {
    id: "seller",
    name: "Seller",
    blurb: "Reviews the work and keeps final approval.",
    color: "oklch(0.9 0.02 82)",
    mark: "AE",
    seat: true,
  },
  {
    id: "room",
    name: "Room",
    blurb: "Turns a live sample session into a working deck.",
    jobId: "standardize-room",
    color: "oklch(0.52 0.17 253)",
  },
  {
    id: "answer",
    name: "Answer",
    blurb: "Finds approved sources and prepares an unsent reply.",
    jobId: "legal-redlines",
    color: "oklch(0.57 0.2 25)",
  },
  {
    id: "scout",
    name: "Scout",
    blurb: "Researches public sources and marks every gap.",
    jobId: "attach-engine",
    color: "oklch(0.45 0.14 253)",
  },
  {
    id: "brief",
    name: "Brief",
    blurb: "Packages reviewed context into a concise draft.",
    color: "oklch(0.64 0.14 34)",
  },
];
