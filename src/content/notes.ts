// The notebook on the About desk. Newest entry is the open page; older
// ones are earlier pages. Paragraphs are separated by a blank line;
// [text](/about/x.jpg) opens that picture over the page, ![alt](/about/x.jpg)
// puts a small round picture in the line, and
// ![alt](/about/x.jpg /about/full/x.jpg) opens the larger one on click.

import type { Text } from '../lang'

export type Note = {
  date: string
  title: Text
  body: Text
}

// A square print at the head of the notebook page, whichever entry is open (480×480).
export const portrait = { src: '/about/portrait.jpg', alt: 'A placeholder for your portrait' }

export const notes: Note[] = [
  {
    date: '2026-01-01',
    title: { en: 'About me', zh: '关于我' },
    body: {
      en: `Hi, I’m Your Name, a product engineer in [Your City](/about/place.jpg).

This is the notebook: write a few short paragraphs about who you are, what you care about, and what you do when you are not working. A new entry goes at the top of src/content/notes.ts and becomes the open page.

A picture can sit in the line, like this one ![A small picture](/about/sticker.jpg /about/full/sticker.jpg), and opens whole on click.`,
      zh: `你好，我是 Your Name，一名在[你的城市](/about/place.jpg)工作的产品工程师。

这里是笔记本：用几段短文写写你是谁、在意什么、工作之外做些什么。新的一篇写在 src/content/notes.ts 的最前面，就会成为翻开的那一页。

图片可以放在行内，比如这张 ![一张小图](/about/sticker.jpg /about/full/sticker.jpg)，点开能看大图。`,
    },
  },
]
