import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useState } from 'react'
import { Vector3 } from 'three'
import { t, useLang } from '../lang'
import { LABELS, pathOf, type Route } from '../route'
import { SET } from './shots'

// The hand-written tags hanging off the objects on the wide shot. They live
// in the page's own DOM (so they are real links in tab order) and a tracker
// inside the canvas moves them onto their objects every frame. drei's <Html>
// is not used here: it rebuilds its React root when the canvas connects its
// events, and a label that does not re-render after that comes up empty.

type TagRoute = Exclude<Route, 'landing'>

const ANCHORS: Record<TagRoute, readonly [number, number, number]> = {
  resume: [.35, .69, .53],
  projects: [SET.projector[0], SET.projector[1] + 0.34, SET.projector[2]],
  // over the sheet in the machine, clear of the projector's tag and the slide
  experience: [SET.typewriter[0], SET.typewriter[1] + 0.45, SET.typewriter[2]],
  // hung on the pinboard's top edge, which leans back
  about: [SET.corkboard[0], SET.corkboard[1] + 0.32, SET.corkboard[2] - 0.07],
}

const hobbyAnchors: Record<string, readonly [number, number, number]> = {
  toggle: [-1.38, 1.49, -0.04],
  photography: [-1.38, 1.19, 0.23],
  music: [-1.38, 0.87, 0.23],
  sports: [-1.38, 0.55, 0.23],
  cooking: [-1.38, 0.23, 0.23],
}
const hobbyEls = new Map<string, HTMLElement>()
const hobbyNames = {
  photography: { en: 'Photography', zh: '摄影' },
  music: { en: 'Musicals · Film\nPop music', zh: '音乐剧 · 电影\nPop music' },
  sports: { en: 'Sports', zh: '运动' },
  cooking: { en: 'Cooking', zh: '烹饪' },
}

const els = new Map<TagRoute, HTMLAnchorElement>()

export function hoverTag(route: Route, on: boolean) {
  if (route !== 'landing') els.get(route)?.classList.toggle('tag--hover', on)
}

export function TagTracker() {
  const { camera, size } = useThree()
  const v = useMemo(() => new Vector3(), [])
  useFrame(() => {
    // On a narrow screen tags can land on each other: a tag that would
    // overlap one already placed moves up above it. The test uses the English
    // label's width, so the tags hang in the same places in either language.
    for (const [key, el] of hobbyEls) {
      v.set(...hobbyAnchors[key]).project(camera)
      const x = ((v.x + 1) / 2) * size.width
      const y = ((1 - v.y) / 2) * size.height
      if (key !== 'toggle') {
        v.set(-1.38 - 0.23, hobbyAnchors[key][1], 0.23).project(camera)
        const left = ((v.x + 1) / 2) * size.width
        v.set(-1.38 + 0.23, hobbyAnchors[key][1], 0.23).project(camera)
        const right = ((v.x + 1) / 2) * size.width
        const width = Math.abs(right - left)
        el.style.width = `${width}px`
        el.style.fontSize = `${Math.min(14, Math.max(9, width / 8.5))}px`
      }
      el.style.left = `${x}px`
      el.style.top = `${y}px`
      el.style.visibility = 'visible'
    }
    const placed: { l: number; r: number; t: number; b: number }[] = []
    for (const [route, el] of els) {
      v.set(...ANCHORS[route]).project(camera)
      const x = ((v.x + 1) / 2) * size.width
      let y = ((1 - v.y) / 2) * size.height
      const w = (el.lastElementChild as HTMLElement).offsetWidth
      const h = el.offsetHeight
      for (const p of placed) {
        if (x - w / 2 < p.r && x + w / 2 > p.l && y - h < p.b && y > p.t) y = p.t - 4
      }
      placed.push({ l: x - w / 2, r: x + w / 2, t: y - h, b: y })
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -100%)`
      el.style.visibility = 'visible'
    }
  })
  return null
}

export function Tags({ route, go }: { route: Route | 'intro'; go: (r: Route) => void }) {
  const lang = useLang()
  const [hobbiesOpen, setHobbiesOpen] = useState(false)
  useEffect(() => { setHobbiesOpen(false) }, [route])
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setHobbiesOpen(false) }
    addEventListener('keydown', close)
    return () => removeEventListener('keydown', close)
  }, [])
  return (
    <div className={`tags${route === 'landing' ? '' : ' tags--hidden'}`}>
      <button
        ref={(el) => { if (el) hobbyEls.set('toggle', el); else hobbyEls.delete('toggle') }}
        className="hobbies-toggle"
        aria-expanded={hobbiesOpen}
        aria-controls="hobby-labels"
        tabIndex={route === 'landing' ? 0 : -1}
        onClick={() => setHobbiesOpen((open) => !open)}
      >{lang === 'zh' ? '爱好' : 'Hobbies'}</button>
      <div id="hobby-labels" className={`hobby-labels${hobbiesOpen ? ' hobby-labels--open' : ''}`} aria-hidden={!hobbiesOpen}>
        {Object.entries(hobbyNames).map(([key, name], i) => (
          <span key={key} ref={(el) => { if (el) hobbyEls.set(key, el); else hobbyEls.delete(key) }} className="hobby-label" style={{ transitionDelay: hobbiesOpen ? `${i * 90}ms` : '0ms' }}>{t(name, lang)}</span>
        ))}
      </div>
      {(Object.keys(ANCHORS) as TagRoute[]).map((r) => (
        <a
          key={r}
          ref={(el) => {
            if (el) els.set(r, el)
            else els.delete(r)
          }}
          className="tag"
          href={pathOf(r)}
          tabIndex={route === 'landing' ? 0 : -1}
          onClick={(e) => {
            e.preventDefault()
            go(r)
          }}
        >
          <span>{t(LABELS[r], lang)}</span>
          <span className="tag__ghost" aria-hidden>
            {t(LABELS[r], 'en')}
          </span>
        </a>
      ))}
    </div>
  )
}
