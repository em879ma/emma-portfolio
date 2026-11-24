# Yuwei (Emma) Zhuo — Portfolio

A bilingual personal portfolio with an interactive 3D desk, project presentations,
education and work experience, an About notebook, and a résumé drawer.

## Local preview

Requires Node.js (see `.nvmrc`).

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5173
```

## Build

```sh
npm run check
```

The static production site is generated in `dist/`.

## Cloudflare Pages

Build command: `npm run build` · Output directory: `dist`.
Client-side routes use Cloudflare Pages' default SPA fallback.

```sh
npx wrangler pages deploy dist --project-name emma-zhuo-portfolio
```

Source: https://github.com/em879ma/emma-portfolio

## Credits

Adapted from [hitianqi/desk-portfolio](https://github.com/hitianqi/desk-portfolio).
Original licences and third-party credits are retained in LICENSE, NOTICE.md,
and public/models/CREDITS.md. Personal text, photos, and résumé belong to their
respective owners; template licensing does not grant reuse of those materials.
