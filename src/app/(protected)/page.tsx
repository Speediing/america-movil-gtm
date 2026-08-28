import { CompareTable } from "@/components/CompareTable";
import { HeroTelemetry } from "@/components/HeroTelemetry";
import { JobSection } from "@/components/JobSection";
import { QuoteWall } from "@/components/QuoteWall";
import { RosterChart } from "@/components/RosterChart";
import { SiteNav } from "@/components/SiteNav";
import { JOBS } from "@/data/jobs";

export default function HomePage() {
  return (
    <main id="top">
      <div className="hero-watercolor">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-watercolor-image"
          src="/brand/america-movil-watercolor.jpg"
          alt=""
        />
        <SiteNav />
      </div>

      <div className="report">
        <div className="report-hero">
          <HeroTelemetry />
          <section className="hero">
            <div>
              <p className="eyebrow">América Móvil x SpaceXAI</p>
              <h1>The agents that work while your reps sell.</h1>
              <p className="hero-intro">
                Grok Bot follows approved work, prepares drafts, and keeps the
                seller in control. These workflows are illustrative samples.
              </p>
            </div>
          </section>

          <section className="usecase-framing">
            <p className="eyebrow">Three sample use cases</p>
            <h2>
              Here is what a small fleet of Grok Bot teammates could look like
              for a seller.
            </h2>
            <p>Three illustrative workflows. Drafts stay unsent.</p>
          </section>

          <div className="metric-grid">
            {JOBS.map((job) => (
              <a
                key={job.id}
                className="metric-card"
                href={`#${job.id}`}
              >
                <div className="metric-card-top">
                  <p>Sample {String(job.number).padStart(2, "0")}</p>
                </div>
                <h2>{job.title}</h2>
                <p className="metric-trigger">Starts when {job.trigger.toLowerCase()}</p>
              </a>
            ))}
          </div>
        </div>

        <RosterChart />

        <div id="jobs">
          {JOBS.map((job) => (
            <JobSection key={job.id} job={job} />
          ))}
        </div>
      </div>

      <div className="orbit-break" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/america-movil-watercolor.jpg" alt="" />
      </div>

      <div className="report">
        <CompareTable />
        <QuoteWall />
      </div>

      <footer className="site-footer">
        <div>
          <p className="footer-title">América Móvil x SpaceXAI</p>
          <p>Illustrative GTM workflow review</p>
        </div>
        <address className="footer-contact">
          <p>SFDC owner</p>
          <strong>Mike Weinert</strong>
          <a href="mailto:mike.weinert@cursor.com">
            mike.weinert@cursor.com
          </a>
        </address>
      </footer>
    </main>
  );
}
