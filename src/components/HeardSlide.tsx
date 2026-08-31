import type { SlideCard } from "@/data/types";

export function HeardSlide({
  slides,
  size = "lg",
  wash,
}: {
  slides: SlideCard[];
  size?: "sm" | "lg";
  wash?: string;
}) {
  return (
    <div className={`leave leave-heard size-${size}`}>
      <article className="heard-slide heard-slide-dynamic">
        {wash ? (
          <div className="leave-wash" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={wash} alt="" />
          </div>
        ) : null}
        <header className="heard-bar">
          <span>Illustrative sample</span>
          <span>Working-session slides · draft only</span>
        </header>
        <div className="heard-main">
          <h3>Seller review deck</h3>
          <ol className={`deck-slides size-${size}`}>
            {slides.map((slide) => (
              <li
                key={`${slide.n}-${slide.title}`}
                className={`deck-tile voice-${slide.voice || "us"}`}
              >
                <div className="deck-tile-bar">
                  <span className="deck-kicker">
                    {slide.kicker || "Illustrative draft"}
                  </span>
                  <span className="deck-n">
                    {String(slide.n).padStart(2, "0")}
                  </span>
                </div>
                <h4 className="deck-tile-title">{slide.title}</h4>
                <p className="deck-map">{slide.body}</p>
                <p className="deck-tile-foot">
                  <span>Sample only</span>
                  <span>Not sent</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </article>
    </div>
  );
}
