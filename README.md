# América Móvil x SpaceXAI

Passworded América Móvil GTM concept site for Grok Bot from SpaceXAI.

## What it is

Three illustrative GTM workflows on one page. Each chapter has three
scene-in-time beats, a final draft artifact, and an interactive Grok Bot
chat with the bot computer beside it. The site also includes the agent fleet,
a comparison, and six linked public quotes.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Configure
`SITE_PASSWORD` from `.env.example`.

## Project identity

- Customer slug: `america-movil`
- Project: `america-movil-gtm`

Private clip arrays are intentionally empty. The JobMore chat and computer
playback remain available without private media.

## Brand provenance

- [América Móvil press room](https://www.americamovil.com/English/press-room/default.aspx)
- [Official América Móvil logo source](https://s22.q4cdn.com/604986553/files/design/americamovil-logo.png)

The lockup loads the official wordmark from the América Móvil CDN. The custom
watercolor is stored at `/brand/america-movil-watercolor.jpg`.

## Deploy

Deploy as the `america-movil-gtm` project with `SITE_PASSWORD` configured.
