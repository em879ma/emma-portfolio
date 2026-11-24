import { useState } from 'react'
import { useLang } from '../lang'

export function InteraidFlow() {
  const zh = useLang() === 'zh'
  const [step, setStep] = useState(0)
  const steps = zh ? [
    ['发布余量', '医院登记物资、数量、有效期与地点，让可用资源被看见。', 'Willow Creek Hospital · 500 个口罩'],
    ['发现与申请', '合作机构筛选物资并提交所需数量；申请占用相应余量。', 'Maple Grove Clinic · 申请 200 个'],
    ['通知与协调', '发布方收到申请通知；双方通过邮件安排交接。', '200 个已申请 · 线下协调交接'],
  ] : [
    ['Post surplus', 'A hospital records supplies, quantities, expiry dates, and location so available resources can be discovered.', 'Willow Creek Hospital · 500 masks'],
    ['Discover & request', 'A partner filters listings and requests an amount. A live request holds that quantity.', 'Maple Grove Clinic · Request 200'],
    ['Notify & coordinate', 'The posting organization is notified. Both parties arrange the handoff by email.', '200 requested · Handoff coordinated offline'],
  ]
  return <div className="interaid-flow">
    <p className="interaid-flow__eyebrow">INTERAID NETWORK · {zh ? '交互流程示意' : 'INTERACTIVE WORKFLOW'}</p>
    <div className="interaid-flow__steps" aria-label={zh ? '选择流程步骤' : 'Choose a workflow step'}>
      {steps.map(([title], i) => <button key={title} type="button" aria-pressed={step === i} onClick={() => setStep(i)}><span>0{i + 1}</span>{title}</button>)}
    </div>
    <div key={step} className="interaid-flow__card" aria-live="polite">
      <span className="interaid-flow__status">{steps[step][2]}</span>
      <h3>{steps[step][0]}</h3><p>{steps[step][1]}</p>
      <div className="interaid-flow__quantity"><strong>{step === 0 ? '500' : '300'}</strong><span>{zh ? '可用口罩 · 演示数量' : 'masks available · demo quantity'}</span></div>
    </div>
    <p className="interaid-flow__note">{zh ? '点击步骤浏览 · 虚构演示数据 · 此处为流程示意，非实时系统' : 'Select a step · Fictional demo data · Workflow illustration, not a live system'}</p>
  </div>
}
