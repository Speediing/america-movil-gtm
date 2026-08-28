import { FLEET, type FleetBot } from "@/data/fleet";

function initials(bot: FleetBot) {
  if (bot.mark) return bot.mark;
  const parts = bot.name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[parts.length - 1][0] || ""}`.toUpperCase();
}

function Box({
  bot,
  chief = false,
}: {
  bot: FleetBot;
  chief?: boolean;
}) {
  const className = chief ? "org-box is-chief" : "org-box";
  const body = (
    <>
      <span
        className="org-avatar"
        style={{
          background: bot.color,
          color: bot.seat ? "var(--ink)" : "#fff",
        }}
        aria-hidden
      >
        {initials(bot)}
      </span>
      <span className="org-name">{bot.name}</span>
      <span className="org-blurb">{bot.blurb}</span>
      <span className="org-computer">
        <svg viewBox="0 0 20 16" aria-hidden>
          <rect x="2" y="1.5" width="16" height="10" rx="1.5" />
          <path d="M7 14.5h6M10 11.5v3" />
        </svg>
        Has its own computer
      </span>
    </>
  );

  if (bot.jobId) {
    return (
      <a className={className} href={`#${bot.jobId}`}>
        {body}
      </a>
    );
  }

  return <div className={className}>{body}</div>;
}

export function RosterChart() {
  const seat = FLEET.find((item) => item.seat);
  const agents = FLEET.filter((item) => !item.seat);

  if (!seat) return null;

  return (
    <section id="roster" className="roster">
      <h2>A background team for every sales rep</h2>
      <p className="section-lede">
        The work itself is the trigger. A call starts, an email lands, or an
        account enters the list, and the right agent picks it up. They keep
        working after the laptop closes. Drafts stay drafts until the rep sends.
      </p>

      <div className="org" role="tree">
        <div className="org-top">
          <Box bot={seat} chief />
        </div>
        <div className="org-branch">
          <div className="org-connect" aria-hidden>
            <i className="org-stem" />
            <i className="org-bar" />
          </div>
          <ul className="org-kids">
            {agents.map((agent) => (
              <li key={agent.id} className="org-kid">
                <Box bot={agent} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
