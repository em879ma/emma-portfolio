// One project is one tray of slides in the projector. The tray opens on the
// cover (the project at a glance), then one slide per picture, each with a
// short note, then the results. The details page holds the long version.
// Adding a project is one entry here; put its files in public/projects/<id>/.
// Text in a reader's language is a { en, zh } pair (src/lang.ts); names,
// terms and the metrics stay one string.
// Films are too heavy for the repo: host them on any server or bucket that
// serves video (Cloudflare R2, S3, a CDN) and point src at them. The Troupe
// example's films are served from the original site's bucket at MEDIA. A film
// made in both languages gives src and poster as { en, zh } pairs, and the
// reader's language picks one.

import type { Text } from '../lang'

const MEDIA = 'https://media.tianqiz.me'

type Picture = { src: string; alt: string }

export type Project = {
  id: string
  title: string
  /** where it was made: a company, a school, 'Open source' */
  org: string
  period: string
  /** one sentence: what it is */
  pitch: Text
  /** who it was made with, shown under the pitch */
  with?: { name: string; href: string }
  cover: Picture
  slides: (Picture & { title: Text; body: Text })[]
  /** a 60–90 s screen recording, shown as a slide after the cover, with a line on what it follows */
  film?: { src: Text; poster: Text; caption: Text }
  metrics: { value: string; label: string; caveat: string }[]
  results?: Picture
  /** what in the demo is illustrative rather than real */
  disclaimer?: Text
  stack: string[]
  /** the details page: background, what I did, method and trade-offs; results and links follow from the fields above */
  details: { heading: Text; body: Text[] }[]
  /** the project's own public site, when it is live */
  site?: string
  links: { label: Text; href: string }[]
}

export type Slide =
  | { kind: 'cover' }
  | { kind: 'film'; src: Text; poster: Text; caption: Text }
  | { kind: 'picture'; src: string; alt: string; title: Text; body: Text }
  | { kind: 'results' }

export function slidesOf(p: Project): Slide[] {
  return [
    { kind: 'cover' },
    ...(p.film ? [{ kind: 'film' as const, ...p.film }] : []),
    ...p.slides.map((s) => ({ kind: 'picture' as const, ...s })),
    ...(p.metrics.length ? [{ kind: 'results' as const }] : []),
  ]
}

export function contextOf(p: Project) {
  return [p.org, p.period].filter(Boolean).join(' · ')
}

export const projects: Project[] = [
  {
    id: 'troupe',
    title: 'Troupe',
    org: 'Open source',
    period: 'Oct–Nov 2026',
    pitch: { en: 'Puts Claude Code and Codex on one team: you agree a plan with an orchestrator, then each role builds in its own terminal, worktree and branch, and a reviewer checks every branch before it is merged.', zh: '让 Claude Code 和 Codex 组成一支队伍：先和 orchestrator 商定计划，然后每个角色在自己的终端、worktree 和分支里开工，每个分支合并前都有 reviewer 把关。' },
    cover: { src: '/projects/troupe/01-panel.jpg', alt: 'The orchestrator\'s terminal beside the troupe panel: roles, stages, activity, and a flow of the team with search done and theme working' },
    film: {
      src: { en: `${MEDIA}/troupe/film-en.mp4`, zh: `${MEDIA}/troupe/film-zh.mp4` },
      poster: { en: '/projects/troupe/film-poster-en.jpg', zh: '/projects/troupe/film-poster-zh.jpg' },
      caption: { en: 'One task from plan to cleanup: the plan approved in the panel, Claude Code and Codex building side by side, a reviewer on each branch, and your yes before the pull request. 68 seconds.', zh: '一个任务从计划走到收尾：在面板里批准计划，Claude Code 和 Codex 并排开工，reviewer 逐个检查分支，开 pull request 之前等你点头。68 秒。' },
    },
    slides: [
      {
        src: '/projects/troupe/02-plan.jpg',
        alt: 'The plan in the troupe panel: goal, done-when items, three roles with their agents and files, and the decisions taken',
        title: { en: 'Agree on the plan first', zh: '先把计划谈妥' },
        body: { en: 'The orchestrator reads the code and writes the plan with you: the goal, when it is done, the roles, and which files each may touch. One key approves it or sends it back with changes; nothing starts before the yes.', zh: 'orchestrator 先读代码，再和你一起写计划：目标、怎样算完成、分哪些角色、每个角色能动哪些文件。按一个键批准，或者提出修改退回；你点头之前，什么都不会开始。' },
      },
      {
        src: '/projects/troupe/03-roles.jpg',
        alt: 'Three terminals: a Claude Code builder, a Codex builder editing files, and the reviewer\'s report on a branch',
        title: { en: 'Each role in a real terminal', zh: '每个角色一个真实终端' },
        body: { en: 'Every role is an ordinary Claude Code or Codex session in its own tmux window, git worktree and branch. You can read along in any of them, or type into one.', zh: '每个角色都是一个普通的 Claude Code 或 Codex 会话，各自占一个 tmux 窗口、一个 git worktree 和一条分支。你可以随时旁观任何一个，也可以直接在里面打字。' },
      },
      {
        src: '/projects/troupe/04-waits.jpg',
        alt: 'The panel highlighting a builder that waits on you, with its goal, agent, branch and the files it may touch',
        title: { en: 'One panel says who needs you', zh: '一个面板告诉你谁在等你' },
        body: { en: 'The panel beside the orchestrator shows who is working, who is waiting, and on what. When an agent asks a question, it lights up; jump into that window and answer it.', zh: 'orchestrator 旁边的面板显示谁在干活、谁在等、等什么。哪个 agent 提了问题，它就会亮起来；跳进那个窗口回答就好。' },
      },
      {
        src: '/projects/troupe/05-handoff.jpg',
        alt: 'The merge gate in the panel, with every role done and the stages up to "Merged?" checked off',
        title: { en: 'You approve the handoff', zh: '交付由你批准' },
        body: { en: 'A reviewer checks each branch as it lands and sends findings back to the same builder. Opening the pull request and the merge wait for you; only then are the windows closed and the worktrees removed.', zh: 'reviewer 在每个分支完成时检查，发现的问题退回给同一个 builder 修改。开 pull request 和合并都要等你确认；之后才会关掉窗口、清理 worktree。' },
      },
    ],
    metrics: [],
    disclaimer: { en: 'The mission in the film and pictures is a small sample repository (a bookshelf page), run for real and recorded for the demo.', zh: '演示片和图片里的任务是一个小的示例仓库（一个书架页面），真实运行并录制下来。' },
    stack: ['TypeScript', 'Node.js', 'tmux', 'git worktrees', 'Claude Code', 'Codex'],
    details: [
      {
        heading: { en: 'Background', zh: '背景' },
        body: [
          { en: 'A coding agent is good at one change at a time. A bigger change wants several of them at once, and then the hard part is keeping track: who is doing what, on which branch, and who is stuck waiting for an answer. Troupe is built for that, and is open source under MIT.', zh: '一个编程 agent 一次做好一个改动没问题。改动一大，就需要好几个同时干，难点变成了跟踪：谁在做什么、在哪条分支上、谁卡住了在等回答。Troupe 就是为此而做的，以 MIT 协议开源。' },
        ],
      },
      {
        heading: { en: 'What I did', zh: '我的工作' },
        body: [
          { en: 'I wrote it, and use it to lead an agent team: an orchestrator I plan with, builders, and a reviewer.', zh: '它由我编写，我也用它带领 agent 团队：一个和我一起做计划的 orchestrator、几个 builder、一个 reviewer。' },
        ],
      },
      {
        heading: { en: 'Method and trade-offs', zh: '方法与取舍' },
        body: [
          { en: 'Real sessions, not a framework: each role is the same Claude Code or Codex you would open by hand, so any agent can be mixed in per role, with its own model and effort, and a person can step into any window.', zh: '用真实会话，而不是另造框架：每个角色就是你平时手动打开的那个 Claude Code 或 Codex，所以每个角色都可以选不同的 agent、模型和力度，人也可以随时进入任何一个窗口。' },
          { en: 'Git keeps the roles apart: every role works in its own worktree and branch off the mission branch, and your own checkout stays where it was. The plan declares which files each role touches, and two roles on the same files need an explicit order.', zh: '用 git 把角色隔开：每个角色在从任务分支拉出的独立 worktree 和分支里工作，你自己的工作区原地不动。计划里写明每个角色会动哪些文件，两个角色动同一批文件时必须明确先后。' },
          { en: 'People decide at the gates: approving the plan, opening the pull request and confirming the merge. The CLI enforces the gates, dependencies and permissions; the workflow around them is a skill you can edit or replace.', zh: '关键节点由人决定：批准计划、开 pull request、确认合并。CLI 负责守住这些关口、依赖和权限；围绕它们的工作流是一个 skill，可以改，也可以整个换掉。' },
          { en: 'Small on purpose: TypeScript, tmux and git, with no runtime npm dependencies.', zh: '刻意保持小巧：TypeScript、tmux 和 git，没有任何运行时 npm 依赖。' },
        ],
      },
    ],
    links: [{ label: { en: 'Source on GitHub', zh: 'GitHub 源码' }, href: 'https://github.com/hitianqi/troupe' }],
  },
  {
    // A placeholder tray that uses every field. Replace it with your own project.
    id: 'sample-project',
    title: 'Sample Project',
    org: 'Example Studio',
    period: 'Jan–Jun 2026',
    with: { name: 'A collaborator', href: 'https://example.com' },
    pitch: { en: 'One sentence on what the project is and who it is for.', zh: '用一句话说明这个项目是什么、为谁而做。' },
    cover: { src: '/projects/sample-project/01-cover.jpg', alt: 'Placeholder: the project at a glance' },
    // A film plays as the slide after the cover. Host the video elsewhere and
    // uncomment this; a poster is the still shown before it plays.
    // film: {
    //   src: 'https://media.example.com/sample-project/film.mp4',
    //   poster: '/projects/sample-project/film-poster.jpg',
    //   caption: { en: 'What the film follows, and how long it is.', zh: '演示片讲了什么，时长多少。' },
    // },
    slides: [
      {
        src: '/projects/sample-project/02-step.jpg',
        alt: 'Placeholder: the first thing to show',
        title: { en: 'The first thing to show', zh: '第一件要展示的事' },
        body: { en: 'One picture and two or three sentences per slide: what the reader is looking at, and why it matters.', zh: '每张幻灯片一张图、两三句话：读者看到的是什么，为什么重要。' },
      },
      {
        src: '/projects/sample-project/03-step.jpg',
        alt: 'Placeholder: the second thing to show',
        title: { en: 'The second thing to show', zh: '第二件要展示的事' },
        body: { en: 'Keep the long story for the details page; a slide says one thing.', zh: '长篇留给详情页；一张幻灯片只说一件事。' },
      },
    ],
    metrics: [
      { value: '3×', label: 'faster than before', caveat: 'how it was measured, and on what' },
      { value: '42', label: 'people using it', caveat: 'where the number comes from' },
    ],
    results: { src: '/projects/sample-project/04-results.jpg', alt: 'Placeholder: a chart of the results' },
    disclaimer: { en: 'Say here what in the pictures is illustrative rather than real, for example invented data.', zh: '在这里说明图片中哪些内容是示意而非真实的，比如虚构的数据。' },
    stack: ['TypeScript', 'React', 'Python'],
    details: [
      {
        heading: { en: 'Background', zh: '背景' },
        body: [{ en: 'The problem, and the situation it came up in.', zh: '要解决的问题，以及它出现的场景。' }],
      },
      {
        heading: { en: 'What I did', zh: '我的工作' },
        body: [{ en: 'Your part in it, in a few plain sentences.', zh: '你在其中做了什么，用几句平实的话说清楚。' }],
      },
      {
        heading: { en: 'Method and trade-offs', zh: '方法与取舍' },
        body: [
          { en: 'One paragraph per decision: what you chose, and what you gave up for it.', zh: '每个决定一段：选了什么，为此放弃了什么。' },
        ],
      },
    ],
    site: 'https://example.com',
    links: [{ label: { en: 'Source on GitHub', zh: 'GitHub 源码' }, href: 'https://github.com' }],
  },
]
