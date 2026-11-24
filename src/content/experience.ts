import type { Text } from '../lang'

export type Job = { company: Text; url?: string; role: Text; place?: Text; start: string; end: Text; bullets: Text[] }
export type School = { school: Text; degree: Text; end: Text; coursework?: Text; research?: { title: Text; description: Text }; honors?: Text[] }

export const experience: Job[] = [
  {
    "company": {
      "en": "SenseTime",
      "zh": "商汤科技"
    },
    "role": {
      "en": "Technical Product Manager Intern",
      "zh": "技术产品经理实习生"
    },
    "start": "May 2026",
    "end": "Aug 2026",
    "bullets": [
      {
        "en": "Translated Shanghai Electric’s shop-floor reporting delays into requirements for an AI quality-management system using OCR, anomaly detection, and real-time alerts, reducing reporting latency from hours to minutes.",
        "zh": "将上海电气车间报告延迟问题转化为 AI 质量管理系统需求，结合 OCR、异常检测与实时告警，将报告延迟从小时级缩短至分钟级。"
      },
      {
        "en": "Defined a multimodal input-audit product across OpenAI, Anthropic, and DeepSeek APIs; translated stakeholder needs into 5 user stories and 21 acceptance criteria.",
        "zh": "定义面向 OpenAI、Anthropic 与 DeepSeek API 的多模态输入审计产品，将利益相关方需求转化为 5 个用户故事和 21 项验收标准。"
      },
      {
        "en": "Authored the SG-001 architecture proposal for an AIGC-watermarking module, translating labeling requirements into product scope and integration requirements.",
        "zh": "撰写 AIGC 水印模块 SG-001 架构方案，将标识要求转化为产品范围与集成需求。"
      }
    ]
  },
  {
    "company": "YOOZOO Games",
    "role": {
      "en": "Data Analyst Intern",
      "zh": "数据分析实习生"
    },
    "start": "Jun 2025",
    "end": "Aug 2025",
    "bullets": [
      {
        "en": "Built SQL-driven BI dashboards for ROI, CPA, Pay_CVR, channel performance, and conversion funnels, supporting daily monitoring and anomaly attribution.",
        "zh": "构建基于 SQL 的 BI 仪表盘，跟踪 ROI、CPA、Pay_CVR、渠道表现与转化漏斗，支持日常监控和异常归因。"
      },
      {
        "en": "Investigated a campaign ROI of 0.85 versus a 1.42 baseline using hypothesis testing and decision-tree analysis; identified creative-content mismatch as the leading driver.",
        "zh": "通过假设检验与决策树分析，调查活动 ROI 为 0.85、低于 1.42 基线的原因，识别出创意内容不匹配是主要驱动因素。"
      },
      {
        "en": "Designed a 2 × 2 audience-and-creative A/B test that reduced CPA to RMB 68 and increased Month-1 ROI by 14.2% to 0.97 (p < 0.05).",
        "zh": "设计受众与创意策略的 2 × 2 A/B 测试，将 CPA 降至 68 元，并使首月 ROI 提升 14.2% 至 0.97（p < 0.05）。"
      }
    ]
  }
]

export const education: School[] = [
  {
    "school": {
      "en": "University of Michigan",
      "zh": "密歇根大学"
    },
    "degree": {
      "en": "B.E. Industrial & Operations Engineering",
      "zh": "工业与运筹工程 工学学士"
    },
    "end": {
      "en": "Expected May 2027",
      "zh": "预计 2027 年 5 月毕业"
    },
    "coursework": {
      "en": "Data Analysis · Statistical Modeling · Optimization · Simulation · Markov Processes · UI/UX Design · Ergonomics",
      "zh": "数据分析 · 统计建模 · 优化 · 仿真 · 马尔可夫过程 · UI/UX 设计 · 人因工程"
    },
    "research": {
      "title": "Kidney Transplant Queuing System",
      "description": {
        "en": "Research Assistant · Prof. Mariel Lavieri.\nReviewed evidence on donor viability, organ allocation, and metabolic risks to inform assumptions and constraints for a kidney transplant queuing model.",
        "zh": "研究助理 · 导师 Mariel Lavieri 教授。\n梳理供体可用性、器官分配及代谢风险相关文献，为肾移植排队模型整理建模假设与约束。"
      }
    },
    "honors": [
      {
        "en": "Roger King Scholarship",
        "zh": "Roger King 奖学金"
      },
      {
        "en": "Dean’s Honor List",
        "zh": "院长荣誉名单（Dean’s Honor List）"
      }
    ]
  },
  {
    "school": {
      "en": "Shanghai Jiao Tong University",
      "zh": "上海交通大学"
    },
    "degree": {
      "en": "B.E. Electrical & Computer Engineering",
      "zh": "电子与计算机工程 工学学士"
    },
    "end": {
      "en": "Expected July 2027",
      "zh": "预计 2027 年 7 月毕业"
    },
    "coursework": {
      "en": "Deep Learning · Programming · Computer Systems",
      "zh": "深度学习 · 编程 · 计算机系统"
    },
    "honors": [
      {
        "en": "Mathematical Contest in Modeling (MCM) — Team Captain, Honorable Mention",
        "zh": "美国大学生数学建模竞赛（MCM）— 队长，M奖"
      }
    ]
  }
]
