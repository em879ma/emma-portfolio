import { useLang } from '../lang'
import { resumePaper } from '../scene/ResumeDrawer'
export function Resume() {
  const zh = useLang() === 'zh'
  return <section className="resume-view" aria-label={zh ? '个人简历' : 'Resume'}>
    <div className="resume-paper" ref={el => { resumePaper.element = el }}>
      <a href="/resume/Yuwei-Zhuo-Resume.pdf" target="_blank" rel="noreferrer" aria-label={zh ? '打开完整简历 PDF' : 'Open full resume PDF'}><img src="/resume/resume.png" alt={zh ? '卓予蔚的简历，点击打开完整 PDF' : 'Yuwei Zhuo’s resume. Click to open the full PDF.'} /></a>
    </div>
    <div className="resume-actions"><span>{zh ? '我的简历' : 'My résumé'}</span><a href="/resume/Yuwei-Zhuo-Resume.pdf" target="_blank" rel="noreferrer">{zh ? '放大阅读 ↗' : 'Read full size ↗'}</a><a href="/resume/Yuwei-Zhuo-Resume.pdf" download>{zh ? '下载 PDF ↓' : 'Download PDF ↓'}</a></div>
  </section>
}
