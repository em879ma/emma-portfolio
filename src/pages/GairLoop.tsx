import { useLang } from '../lang'

// Adapted from the old portfolio's “Iterative Enhancement Loop” frontend.
// Preserve its four stages while giving the loop a consistent clockwise order.
export function GairLoop() {
  const zh = useLang() === 'zh'
  const steps = zh ? [
    ['基准评测', '运行测试集，识别弱项'],
    ['错误分析', '分析错答，定位推理缺口'],
    ['数据选择', '针对弱项选择数据'],
    ['模型与提示迭代', '运行模型，调整提示，进入下一轮'],
  ] : [
    ['Benchmark evaluation', 'Evaluate the test set; identify weaknesses'],
    ['Error analysis', 'Analyze wrong answers; locate reasoning gaps'],
    ['Data selection', 'Select data targeting weak points'],
    ['Model & prompt iteration', 'Run the model, refine prompts, repeat'],
  ]
  return <div className="gair-loop" role="img" aria-label={zh ? '基准评测、错误分析、数据选择、模型与提示迭代的四步循环' : 'Four-stage loop: benchmark evaluation, error analysis, data selection, model and prompt iteration'}>
    <p className="gair-loop__eyebrow">{zh ? '迭代改进循环' : 'Iterative enhancement loop'}</p>
    <div className="gair-loop__grid">
      <svg className="gair-loop__arrows" viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">
        <defs><marker id="gair-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7Z" fill="#a13a1e" /></marker></defs>
        {['M267 90H313', 'M465 167V213', 'M330 310H287', 'M135 230V190'].map((d) => <path key={d} d={d} fill="none" stroke="#a13a1e" strokeWidth="3" markerEnd="url(#gair-arrow)" />)}
      </svg>
      {steps.map(([title, body], i) => <div key={title} className={`gair-loop__step gair-loop__step--${i}`}><span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{body}</p></div>)}
    </div>
    <p className="gair-loop__foot">{zh ? '以评测结果指导下一次迭代' : 'Use evaluation evidence to guide the next iteration'}</p>
  </div>
}
