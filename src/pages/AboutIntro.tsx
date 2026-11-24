import { useLang } from '../lang'
import { site } from '../content/site'

function Playful({ text }: { text: string }) {
  return <>{text.split(/(\*\*.*?\*\*)/g).map((part, i) => part.startsWith('**') ? <em className="about-scribble" key={i}>{part.slice(2, -2)}</em> : part)}</>
}

export function AboutIntro() {
  const zh = useLang() === 'zh'
  const facts = zh ? [
    ['好戏开场', '我超级喜欢**音乐剧**，喜欢到曾认真考虑过转去读舞台设计。'],
    ['来自侨乡', '我来自**江门**，一座与海外华人有着深厚渊源的城市，也是一座有故事的“侨乡”。'],
    ['猫，含狗量很高', '我曾收养过一只**很像小狗的小猫**。她是世界上最好的小猫。如果你好奇，我很愿意把这个长故事讲给你听。'],
    ['气泡免谈', '我讨厌**一切碳酸饮料**。没错，一切。'],
    ['朋友认证', '我的 MBTI 是 **ISTJ**。我自己不太用这套标签，但朋友们对我的 T 和 J 属性倒是出奇地一致。'],
  ] : [
    ['Cue the overture', 'I love **musicals** enough to have seriously considered studying stage design.'],
    ['Where I’m from', 'I’m from **Jiangmen**, a city with deep roots in the overseas Chinese community. It’s known as a hometown of emigrants—and has plenty of stories to show for it.'],
    ['Cat, dog software', 'I once adopted **a cat with a very dog-like personality**. She\'s the best cat in the world, and if you\'re curious I\'m happy to tell you the long story.'],
    ['No fizz, please', 'I dislike **all carbonated drinks**. Yes, all of them.'],
    ['Peer-reviewed personality', 'My MBTI is **ISTJ**. I don’t put much stock in the labels myself, but my friends are remarkably unanimous about the T and the J.'],
  ]
  return <div className="about-intro" lang={zh ? 'zh-CN' : 'en'}>
    <h2>{zh ? '嗨，我是卓予蔚。' : 'Hi, I’m Emma.'}</h2>
    <p><Playful text={zh ? '我是一个热爱文学与艺术的工科生。人生愿望清单上有两件大事：做出像**大白或 JARVIS** 一样的 AI 助手；或者走到世界尽头，拍下**我人生的25号底片**。' : 'I’m an engineering student with a soft spot for literature and art. Two things on my lifetime wish list: build an AI companion like **Baymax or JARVIS**, or travel to the ends of the earth in search of **my life’s Frame 25**.'} /></p>
    <section className="about-facts">
      <h3>{zh ? 'Fun Facts' : 'A few fun facts'}{!zh && <span>a little off-script</span>}</h3>
      <ol>{facts.map(([title, body], i) => <li key={title}>
        <span className="about-facts__number">0{i + 1}</span>
        <div>{!zh && <h4>{title}</h4>}<p><Playful text={body} /></p></div>
      </li>)}</ol>
    </section>
    <section className="about-practical">
      <h3>{zh ? '"Boring" Facts' : 'The “boring” facts'}{!zh && <span>arguably useful</span>}</h3>
      <p className="about-tool-label">{zh ? '我的工具箱，持续扩容中：' : 'My toolkit, always a work in progress:'}</p>
      <ul className="about-tools" aria-label={zh ? '工具与技能' : 'Tools and skills'}>{['Python', 'SQL', 'C++', 'Tableau', 'Git', 'A/B testing', 'R', 'Canva', 'Figma', 'Photoshop', '...'].map(tool => <li key={tool}>{tool}</li>)}</ul>
      <p><Playful text={zh ? '短期内，我想成为一名**技术型产品经理**。我发现自己最适合站在技术实现与用户需求的交汇处：既愿意钻进细节弄懂系统怎么运转，也喜欢把问题讲清楚，让团队一起做出真正有用的东西。' : 'In the near term, I’m working toward **technical product management**. I’m happiest where technical possibilities meet real human needs: digging into how a system works, making a problem make sense, and helping a team build something useful.'} /></p>
    </section>
    <footer className="about-contact">
      <h3>{zh ? '来打个招呼吧。' : 'Say hello.'}</h3>
      <p>{zh ? 'AI、音乐剧、那只小猫——任何你想聊的话题都可以！' : 'AI, musicals, or that cat story—anything you would like to talk about!'}</p>
      <a href={`mailto:${site.email}`}>{site.email} ↗</a>
      <a href={site.links[0].href} target="_blank" rel="noreferrer">LinkedIn ↗</a>
    </footer>
  </div>
}
