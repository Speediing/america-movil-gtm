import type { Clip, ClipId } from "./types";

function clip(
  id: ClipId,
  title: string,
  caption: string,
): Clip {
  return {
    id,
    file: `/api/media/job-clips/${id}.mp4`,
    poster: `/media/job-clips/${id}.jpg`,
    title,
    caption,
  };
}

export const CLIPS: Record<ClipId, Clip> = {
  "01-morning-inbox": clip(
    "01-morning-inbox",
    "Illustrative inbox workflow",
    "Sample playback placeholder. Private media is not rendered.",
  ),
  "02-prospecting-pg": clip(
    "02-prospecting-pg",
    "Illustrative research workflow",
    "Sample playback placeholder. Private media is not rendered.",
  ),
  "03-slides-granola": clip(
    "03-slides-granola",
    "Illustrative working-session workflow",
    "Sample playback placeholder. Private media is not rendered.",
  ),
};

export const ALL_CLIPS: Clip[] = Object.values(CLIPS);
