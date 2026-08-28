import type { Artifact, StoryBeat } from "@/data/types";
import { HeardSlide } from "./HeardSlide";

function OutboundPack({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "outbound" }>;
}) {
  const contact = artifact.targets[0]?.name ?? "your buyer";
  const firstName = contact.split(" ")[0];

  return (
    <div className="leave leave-out-phone">
      <div className="out-phone" aria-label="Scout approval chat">
        <div className="out-phone-notch" aria-hidden />
        <header className="out-phone-header">
          <span className="out-phone-back" aria-hidden>
            ‹
          </span>
          <span className="out-phone-agent" aria-hidden>
            ✦
          </span>
          <p>
            <strong>Scout</strong>
            <small>{artifact.account} · drafts ready</small>
          </p>
          <span className="out-phone-desktop" aria-hidden>
            ▣
          </span>
        </header>

        <div className="out-phone-thread">
          <article className="out-email-card">
            <p className="out-email-label">
              Illustrative email draft · not sent
            </p>
            <p className="out-email-subject">
              Subject · A short working-session idea
            </p>
            <div className="out-email-copy">
              <p>Hi {firstName},</p>
              <p>{artifact.hypothesis[0]?.body}</p>
              <p>Would a short review be useful?</p>
              <p>Seller</p>
            </div>
            <footer>
              <span>Review draft</span>
              <span>Discard</span>
            </footer>
          </article>

          <p className="out-message is-you">
            Keep the drafts queued for review.
          </p>
          <p className="out-message is-bot">
            All drafts remain unsent.
          </p>
        </div>

        <footer className="out-phone-composer">
          <span aria-hidden>+</span>
          <p>Message Scout</p>
          <span aria-hidden>◉</span>
        </footer>
      </div>
    </div>
  );
}

function UpstairsMemo({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "forecast" }>;
}) {
  return (
    <div className="leave leave-memo">
      <header className="leave-memo-top">
        <div>
          <p className="leave-kicker">{artifact.title}</p>
          <h3>
            {artifact.account || "Sample account"}
            {artifact.amount ? ` · ${artifact.amount}` : ""}
          </h3>
        </div>
        <p className="leave-stamp">{artifact.status}</p>
      </header>
      <p className="leave-memo-body">{artifact.body}</p>
      {artifact.gaps?.length ? (
        <ul className="leave-stamps">
          {artifact.gaps.map((gap) => (
            <li key={gap.label}>
              <strong>{gap.label}</strong>
              <span>{gap.body}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function FieldPack({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "talk-tracks" }>;
}) {
  return (
    <div className="leave leave-pack">
      <header className="leave-pack-top">
        <p className="leave-kicker">Illustrative field pack</p>
        <h3>{artifact.title}</h3>
      </header>
      <ol className="leave-cards">
        {artifact.tracks.map((track) => (
          <li key={track.seat}>
            <p className="leave-seat">{track.seat}</p>
            <p className="leave-line">{track.line}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function BetterAnswer({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "scorecard" }>;
}) {
  return (
    <div className="leave leave-answer">
      <header className="leave-answer-top">
        <div>
          <p className="leave-kicker">Illustrative practice</p>
          <h3>A clearer answer</h3>
        </div>
        <p className="leave-score">{artifact.score}</p>
      </header>
      <div className="leave-split">
        <section className="leave-before">
          <p className="leave-kicker">Too abstract</p>
          <p className="leave-weak">
            {artifact.weakLine || artifact.notes[0]}
          </p>
          <ul>
            {artifact.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
        <section className="leave-after">
          <p className="leave-kicker">Say this</p>
          <p className="leave-win">{artifact.betterAnswer}</p>
          <p className="leave-incident" aria-hidden>
            <span>Public source</span>
            <span>Approved docs</span>
            <span>Seller review</span>
            <b>Draft only</b>
          </p>
        </section>
      </div>
    </div>
  );
}

function RedlinePack({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "redlines" }>;
}) {
  return (
    <div className="leave leave-paper">
      <header className="leave-paper-top">
        <div>
          <p className="leave-kicker">Sources checked</p>
          <h3>{artifact.title}</h3>
        </div>
        <p className="leave-paper-from">{artifact.from}</p>
      </header>
      <div className="leave-paper-split">
        <section className="leave-marks">
          <p className="leave-kicker">{artifact.paperTitle}</p>
          <ol>
            {artifact.marks.map((mark) => (
              <li key={mark.text} className={mark.take ? "is-take" : "is-hold"}>
                <p className="leave-mark-line">{mark.text}</p>
                <p className="leave-mark-note">
                  <b>{mark.take ? "Answer" : "Hold"}.</b> {mark.note}
                </p>
              </li>
            ))}
          </ol>
          <p className="leave-kicker">Sources</p>
          <ul className="leave-sources">
            {artifact.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className="leave-reply">
          <p className="leave-kicker">Draft reply · not sent</p>
          <p className="leave-reply-meta">
            <span>To</span>
            {artifact.reply.to}
          </p>
          <p className="leave-reply-meta">
            <span>Subject</span>
            {artifact.reply.subject}
          </p>
          <p className="leave-reply-body">{artifact.reply.body}</p>
        </section>
      </div>
    </div>
  );
}

export function ChapterPayoff({
  beat,
  wash,
  value,
}: {
  beat: StoryBeat;
  wash?: string;
  value?: string;
}) {
  const slides = beat.slides;
  const artifact = beat.artifact;

  let body = null;
  if (slides?.length) {
    body = <HeardSlide slides={slides} size="lg" wash={wash} />;
  } else if (artifact?.kind === "redlines") {
    body = <RedlinePack artifact={artifact} />;
  } else if (artifact?.kind === "outbound") {
    body = <OutboundPack artifact={artifact} />;
  } else if (artifact?.kind === "forecast") {
    body = <UpstairsMemo artifact={artifact} />;
  } else if (artifact?.kind === "talk-tracks") {
    body = <FieldPack artifact={artifact} />;
  } else if (artifact?.kind === "scorecard") {
    body = <BetterAnswer artifact={artifact} />;
  }

  if (!body) return null;

  return (
    <div className="chapter-payoff">
      <p className="payoff-label">
        {beat.when ? <span>{beat.when}</span> : null}
        {beat.label}
      </p>
      {body}
      {value ? <p className="leave-value">{value}</p> : null}
    </div>
  );
}
