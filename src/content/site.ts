// The landing's title slide, and the contact links that close the About page.
// The caption and the place follow the reader's language (src/lang.ts).
// Change these first: they are the name on the slide and in the page title.

import type { Text } from '../lang'

export const site: { name: string; caption: Text; place: Text; email: string; links: { label: string; href: string }[] } = {
  name: 'Your Name',
  caption: { en: 'Product Engineer', zh: '产品工程师' },
  place: { en: 'Your City · 2026', zh: '你的城市 · 2026' },
  email: 'you@example.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'GitHub', href: 'https://github.com/' },
  ],
}
