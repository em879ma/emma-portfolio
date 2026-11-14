// Typed onto the typewriter's sheet, newest first. This page is the CV, but
// a readable one: two or three bullets per job, each with the one fact worth
// keeping. The long versions are on the Projects page. Text in a reader's
// language is a { en, zh } pair (src/lang.ts); dates stay as they are.
// [text](/projects/<id>) in a bullet links to that project's tray.

import type { Text } from '../lang'

export type Job = {
  company: Text
  url: string
  role: Text
  place: Text
  start: string
  end: string
  bullets: Text[]
}

export const experience: Job[] = [
  {
    company: 'Example Studio',
    url: 'https://example.com',
    role: { en: 'Product Engineer', zh: '产品工程师' },
    place: { en: 'Your City', zh: '你的城市' },
    start: 'Jan 2026',
    end: 'Present',
    bullets: [
      { en: 'Built [Sample Project](/projects/sample-project) from an empty repository to its first public release in six weeks.', zh: '从空仓库开始搭建 [Sample Project](/projects/sample-project)，六周后首次公开发布。' },
      { en: 'One bullet per fact worth keeping: what you did, and the number or result that shows it.', zh: '每条只写一件值得留下的事：你做了什么，以及能说明它的数字或结果。' },
    ],
  },
  {
    company: { en: 'Sample Labs', zh: '示例实验室' },
    url: 'https://example.org',
    role: { en: 'Software Engineering Intern', zh: '软件工程实习生' },
    place: { en: 'Another City', zh: '另一座城市' },
    start: 'Jun 2025',
    end: 'Dec 2025',
    bullets: [
      { en: 'Wrote the tool the team used to test every release, and cut a manual check from a day to an hour.', zh: '编写了团队用来测试每个版本的工具，把一项人工检查从一天缩短到一小时。' },
      { en: 'Shared it with two other teams, who still use it.', zh: '把它分享给另外两个团队，他们至今仍在使用。' },
    ],
  },
]

// Typed under the jobs on the same sheet.
export type School = { school: Text; degree: Text; start: string; end: string }

export const education: School[] = [
  {
    school: { en: 'University of Somewhere', zh: '某某大学' },
    degree: { en: 'B.Sc. Computer Science', zh: '计算机科学 理学学士' },
    start: 'Sep 2021',
    end: 'Jun 2025',
  },
]
