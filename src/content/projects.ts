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
  presentation?: string
  cover: Picture
  evidence?: (Picture & { caption: Text })[]
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
    "id": "gair-evaluation",
    "title": "GAIR Lab",
    "org": "SJTU · Research Assistant",
    "period": "Nov 2024–Jan 2025",
    "pitch": {
      "en": "Built benchmarks, automated graders, and adaptive prompts for multi-subject reasoning agents.",
      "zh": "为多学科推理智能体构建评测基准、自动评分器与自适应提示。"
    },
    "cover": {
      "src": "/projects/emma/gair-team.jpg",
      "alt": "GAIR Lab team group photo"
    },
    "slides": [
      {
        "src": "/projects/emma/gair-loop.svg",
        "alt": "Four-stage iterative enhancement loop adapted from the original portfolio",
        "title": {
          "en": "A loop driven by evaluation",
          "zh": "以评测驱动的迭代循环"
        },
        "body": {
          "en": "Evaluate, analyze failures, select targeted data, then refine the model and prompts. I connected benchmark construction with automated grading and iterative error analysis.",
          "zh": "评测、分析错答、选择针对性数据，再调整模型与提示。我将基准构建、自动评分和迭代错误分析连接成可重复的流程。"
        }
      },
      {
        "src": "/projects/emma/gair-score-comparison.svg",
        "alt": "Recorded scores: our model 140, qwq 121, deepseek-r1-lite 123, kimi 125, GLM Zero-Preview 107, out of 150",
        "title": {
          "en": "Results you can inspect",
          "zh": "可查验的实验结果"
        },
        "body": {
          "en": "Across this 22-question evaluation, our model scored 140/150; comparison-model scores ranged from 107 to 125. Explore the original scoring table and input-mode experiments in Project details.",
          "zh": "在这次 22 题评测中，我们的模型得分为 140/150，对比模型得分为 107–125。原始评分表与输入方式实验见项目详情。"
        }
      }
    ],
    "metrics": [],
    "stack": [
      "LLM evaluation",
      "Benchmarking",
      "Prompt engineering"
    ],
    "details": [
      {
        "heading": {
          "en": "Research context",
          "zh": "研究背景"
        },
        "body": [
          {
            "en": "At SJTU GAIR Lab, under Prof. Pengfei Liu, I worked on evaluating autonomous problem-solving agents across Gaokao-style multi-subject reasoning tasks.",
            "zh": "在上海交通大学 GAIR Lab，我在刘鹏飞教授指导下参与自主解题智能体评测，覆盖高考风格的多学科推理任务。"
          }
        ]
      },
      {
        "heading": {
          "en": "My contribution",
          "zh": "我的贡献"
        },
        "body": [
          {
            "en": "I built subject-specific benchmarks from historical public exam questions, developed reusable regex and rubric-guided AI graders, checked automated scores against human review, and used error analysis to adapt prompting strategies.",
            "zh": "我基于历年公开试题构建分学科基准，开发可复用的正则与规则引导 AI 评分器，用人工复核校验自动评分，并根据错误分析调整提示策略。"
          }
        ]
      },
      {
        "heading": {
          "en": "Method: a repeatable loop",
          "zh": "方法：可重复的循环"
        },
        "body": [
          {
            "en": "The original portfolio connects benchmark evaluation, error analysis, targeted data selection, and model/prompt iteration. Exact answers use rule-based grading; semantic responses use rubric-guided grading with human validation.",
            "zh": "旧作品集连接了基准评测、错误分析、针对性数据选择、模型与提示迭代四个阶段。精确答案使用规则评分，语义回答使用评分规则引导的自动评分，并结合人工校验。"
          }
        ]
      },
      {
        "heading": {
          "en": "Reading the evidence",
          "zh": "如何解读实验记录"
        },
        "body": [
          {
            "en": "The input-mode experiment examines how the representation of a question affects responses. The separate model comparison records question-level scores on 22 questions totaling 150 points. These address different questions and are interpreted separately.",
            "zh": "输入方式实验考察题目表示方式如何影响回答；另一份模型对比记录了 22 道题、共 150 分的逐题得分。两份记录回答不同的问题，因此分别解读。"
          }
        ]
      },
      {
        "heading": {
          "en": "Results & scope",
          "zh": "成果与范围"
        },
        "body": [
          {
            "en": "Deliverables included a reusable evaluation codebase and report. The model comparison records 140/150 for our model. This result describes one evaluation setup; broader comparisons require controlled model versions, prompting conditions, and repeated runs.",
            "zh": "交付包括可复用评测代码与报告。模型对比记录中，我们的模型得分为 140/150。该结果对应一次具体评测设置；更广泛的比较需要控制模型版本、提示条件，并进行重复实验。"
          }
        ]
      }
    ],
    "links": [],
    "evidence": [
      {
        "src": "/projects/emma/prompt.png",
        "alt": "25-item input-mode comparison with completeness and correctness annotations",
        "caption": {
          "en": "Input-mode experiment: 25 items compare text-only, text-plus-image, and caption inputs. Caption responses are annotated for completeness and correctness. Original blank and merged cells are retained; no aggregate accuracy is inferred.",
          "zh": "输入方式实验：25 个条目对比纯文本、文本加图像与图像描述输入，并标注描述模式回答的完整性与正确性。保留原始空白和合并单元格，不据此推算总体准确率。"
        }
      },
      {
        "src": "/projects/emma/GAIR-result.png",
        "alt": "22-question model comparison with question-level points and total scores",
        "caption": {
          "en": "10 multiple-choice, 6 fill-in-the-blank, and 6 free-response questions; 150 points total. Recorded scores: our model 140, qwq 121, deepseek-r1-lite 123, kimi 125, GLM Zero-Preview 107.",
          "zh": "10 道选择题、6 道填空题、6 道解答题，共 150 分。记录总分：我们的模型 140；qwq 121；deepseek-r1-lite 123；kimi 125；GLM Zero-Preview 107。"
        }
      }
    ]
  },
  {
    "id": "dr-compass",
    "title": "DR Compass",
    "org": "Research · Advisor: Prof. Bochao Zhao",
    "period": "Mar 2026–Present",
    "pitch": {
      "en": "From uncertain electricity prices to day-ahead demand-response decisions.",
      "zh": "将不确定的电价预测转化为日前需求响应决策。"
    },
    "cover": {
      "src": "/projects/emma/dr-cover.svg",
      "alt": "DR Compass forecast, scenarios, optimization, evaluation"
    },
    "slides": [],
    "metrics": [],
    "stack": [
      "Python",
      "XGBoost",
      "FastAPI",
      "Scenario optimization"
    ],
    "details": [],
    "links": [
      {
        "label": {
          "en": "Source Repository",
          "zh": "Source Repository"
        },
        "href": "https://github.com/em879ma/DR-Electricity-Trading-System"
      }
    ],
    "presentation": "/projects/emma/presentation.html"
  },
  {
    "id": "solar-car",
    "title": "U-M Solar Car Team",
    "org": "University of Michigan · Operations",
    "period": "Sep 2025–Apr 2026",
    "pitch": {
      "en": "Coordinating the people, resources, and logistics behind a solar racing team.",
      "zh": "协调太阳能赛车团队背后的人员、资源与赛事物流。"
    },
    "cover": {
      "src": "/projects/emma/solarcar.jpg",
      "alt": "University of Michigan solar car from the original portfolio"
    },
    "slides": [
      {
        "src": "/projects/emma/routemap.webp",
        "alt": "Route image from the original portfolio",
        "title": {
          "en": "Plan beyond the vehicle",
          "zh": "规划不止于赛车"
        },
        "body": {
          "en": "Route planning, procurement, logistics, and transport all have to work together to support a competition-grade solar vehicle.",
          "zh": "路线规划、采购、物流与运输必须协同运转，才能支持竞赛级太阳能赛车。"
        }
      },
      {
        "src": "/projects/emma/workspace.jpg",
        "alt": "Solar car team workspace",
        "title": {
          "en": "Make resources usable",
          "zh": "让资源落实到执行"
        },
        "body": {
          "en": "Supported sponsor engagement, data collection, and resource-allocation initiatives across the team.",
          "zh": "参与赞助方沟通、数据收集与资源分配，将支持转化为团队可用的资源。"
        }
      }
    ],
    "metrics": [],
    "stack": [
      "Operations",
      "Route planning",
      "Procurement",
      "Logistics"
    ],
    "details": [
      {
        "heading": {
          "en": "Context",
          "zh": "背景"
        },
        "body": [
          {
            "en": "As an Operations Team Member, I help coordinate the work surrounding the University of Michigan Solar Car Team’s competition-grade vehicle.",
            "zh": "作为密歇根大学太阳能赛车队运营成员，我参与协调围绕竞赛级赛车展开的支持工作。"
          }
        ]
      },
      {
        "heading": {
          "en": "My contribution",
          "zh": "我的贡献"
        },
        "body": [
          {
            "en": "My work spans route planning, materials procurement, logistics, transportation, sponsor engagement, and data collection. These activities connect resource planning with the team’s day-to-day execution.",
            "zh": "我的工作涉及路线规划、物资采购、物流运输、赞助方沟通和数据收集，将资源规划与团队日常执行连接起来。"
          }
        ]
      },
      {
        "heading": {
          "en": "Team-level outcome",
          "zh": "团队层面的成果"
        },
        "body": [
          {
            "en": "I contributed to sponsor and resource initiatives supporting partnerships totaling more than $2.4 million. That figure describes the wider partnership effort; it is not an amount I individually raised.",
            "zh": "我参与的赞助与资源工作支持了总额超过 240 万美元的合作伙伴关系。该数字属于整体合作成果，并非我个人独立筹集的金额。"
          }
        ]
      }
    ],
    "links": []
  },
  {
    "id": "independent-ai-studio",
    "title": "Independent AI Media Studio",
    "org": "AI Media & Community · Content & Marketing Assistant",
    "period": "May 2026–Aug 2026",
    "pitch": {
      "en": "Making AI-industry ideas accessible through content, conversations, and community.",
      "zh": "通过内容、对话与社群，让 AI 行业的新想法更易理解。"
    },
    "cover": {
      "src": "/projects/emma/studio-conversations.jpg",
      "alt": "Conversations at an in-person AI community event in Shanghai"
    },
    "slides": [],
    "metrics": [],
    "stack": [
      "Content strategy",
      "Event operations",
      "Community engagement",
      "Workflow design"
    ],
    "details": [
      {
        "heading": {
          "en": "Work & contributions",
          "zh": "工作内容与贡献"
        },
        "body": [
          {
            "en": "Produced and curated AI-industry content for a Shanghai-based media studio and technology community, translating emerging trends into accessible updates for practitioners.",
            "zh": "为上海的 AI 媒体工作室与技术社群制作、策划行业内容，将新兴趋势转化为从业者易于理解的资讯。"
          },
          {
            "en": "Coordinated end-to-end delivery of technology salons and podcasts, spanning creator scouting, guest interviews, event operations, AI news-channel management, and community engagement.",
            "zh": "协调技术沙龙与播客的全流程交付，涵盖创作者发掘、嘉宾访谈、活动运营、AI 新闻频道管理与社群互动。"
          },
          {
            "en": "Standardized recurring workflows for content sourcing, guest outreach, and event execution to improve consistency across media and community programs.",
            "zh": "为内容选题与素材搜集、嘉宾邀约、活动执行等重复工作建立标准化流程，提高媒体与社群项目交付的一致性。"
          },
          {
            "en": "Helped grow the community to 500+ active AI professionals, achieve 100% attendance across multiple industry mixers, and support B2B collaborations with major companies in Shanghai.",
            "zh": "协助社群发展至 500 多名活跃 AI 从业者，推动多场行业交流活动达到 100% 出席率，并支持与上海大型企业的 B2B 合作。"
          }
        ]
      }
    ],
    "links": [],
    "evidence": [
      {
        "src": "/projects/emma/studio-event.jpg",
        "alt": "AI After Dark event in Shanghai",
        "caption": {
          "en": "AI After Dark — an in-person AI community event in Shanghai.",
          "zh": "AI After Dark — 上海线下 AI 社群活动。"
        }
      },
      {
        "src": "/projects/emma/studio-demo.jpg",
        "alt": "Hands-on technology demonstration at a Shanghai AI event",
        "caption": {
          "en": "Hands-on technology exchanges at a Shanghai AI event.",
          "zh": "上海 AI 活动中的技术演示与交流。"
        }
      },
      {
        "src": "/projects/emma/studio-conversations.jpg",
        "alt": "Conversations at an in-person AI community event in Shanghai",
        "caption": {
          "en": "Conversations and connections within the AI community.",
          "zh": "AI 社群中的面对面交流与连接。"
        }
      }
    ]
  },
  {
    "id": "interaid-network",
    "title": "InterAid Network",
    "org": "Michigan Data Science Team · Data & Product Member",
    "period": "Sep 2026–Present",
    "pitch": {
      "en": "Making surplus medical supplies visible, discoverable, and easier to route across organizations.",
      "zh": "让医疗余量物资可见、可查找，让跨机构资源流转更顺畅。"
    },
    "cover": {
      "src": "/projects/emma/interaid-landing.png",
      "alt": "InterAid Network actual pilot website landing page"
    },
    "slides": [
      {
        "src": "/projects/emma/interaid-listings.png",
        "alt": "Actual InterAid surplus listings with fictional demonstration data",
        "title": {
          "en": "From inventory to shared visibility",
          "zh": "从分散库存到共享可见"
        },
        "body": {
          "en": "Structured listings bring item categories, quantities, locations, and status into one view. This working local pilot uses fictional demo data; public deployment is in progress.",
          "zh": "结构化列表将物资类别、数量、地点与状态放在同一视图中。图中为实际本地试点界面，使用虚构演示数据；公网部署进行中。"
        }
      },
      {
        "src": "/projects/emma/interaid-flow.svg",
        "alt": "Interactive illustrative surplus request workflow",
        "title": {
          "en": "Coordinate the handoff",
          "zh": "让资源交接有据可循"
        },
        "body": {
          "en": "Select a step to explore the workflow. The product supports discovery, requests, and notifications; organizations arrange physical pickup or delivery outside the platform.",
          "zh": "点击左侧步骤查看流程。产品支持物资发现、申请与通知，实际取货或配送由机构在线下协调。"
        }
      }
    ],
    "metrics": [],
    "stack": [
      "Inventory & listings",
      "Database design",
      "Import templates",
      "AI photo recognition"
    ],
    "details": [
      {
        "heading": {
          "en": "System overview",
          "zh": "系统介绍"
        },
        "body": [
          {
            "en": "InterAid Network is a medical-supply redistribution platform that connects hospitals, clinics, and distribution partners. It brings surplus inventory and supply needs into a shared workspace, helping organizations discover available resources and coordinate redistribution.",
            "zh": "InterAid Network 是连接医院、诊所与物资分发伙伴的医疗物资再分配平台。系统将分散的库存余量与物资需求汇集到共享工作空间，帮助机构发现可用资源并协调流转。"
          },
          {
            "en": "Organizations apply to join and are approved before their staff receive role-based access. Inventory tracks supplies on hand; Listings makes surplus available across organizations. Users can search and filter items, submit quantity-based requests, and receive notifications as coordination progresses. Organization coordinators manage team access.",
            "zh": "机构申请加入并获批后，成员通过角色权限访问系统。Inventory 管理机构持有的物资，Listings 将可供分享的余量发布给其他机构。用户可搜索筛选物资、按数量提交申请，并接收协调进展通知；机构负责人负责成员与权限管理。"
          },
          {
            "en": "The pilot supports manual entry, spreadsheet import and export, and AI-assisted item recognition from photos. Discovery and requests happen in the application, while organizations arrange pickup or delivery directly. The system uses React/Vite, FastAPI, and SQLAlchemy.",
            "zh": "试点支持手动录入、表格导入导出，以及基于照片的 AI 物资识别。物资发现与申请在应用内完成，实际取货或配送由机构直接协调。系统采用 React/Vite、FastAPI 与 SQLAlchemy。"
          }
        ]
      },
      {
        "heading": {
          "en": "My contributions",
          "zh": "我的贡献"
        },
        "body": [
          {
            "en": "Built the Inventory and Listings modules, including their field definitions, database structures, and data-entry workflows. Defined how item categories, names, quantities, units, sizes, locations, expiry dates, and notes are represented consistently across inventory records and published listings.",
            "zh": "构建 Inventory 与 Listings 两个模块，包括字段定义、数据库结构与数据录入流程；统一物资类别、名称、数量、单位、规格、地点、有效期及备注等信息在库存记录与发布列表中的表示方式。"
          },
          {
            "en": "Designed and built spreadsheet templates and import workflows for Inventory and Listings, aligning template columns with application fields and database records to support batch data entry.",
            "zh": "设计并搭建 Inventory 与 Listings 的表格模板及导入流程，将模板列与系统字段、数据库记录对应，支持批量录入物资数据。"
          },
          {
            "en": "Introduced and built the AI photo-recognition feature: users upload an item photo, the system extracts suggested item details, and users review and correct the fields before saving. Integrated recognition into the inventory-entry workflow to reduce manual transcription while keeping users in control of the final record.",
            "zh": "引入并搭建 AI 识图功能：用户上传物资照片后，系统提取建议的物资信息，用户核对、修正字段后再保存。将识别能力接入库存录入流程，减少手动转录，同时由用户确认最终记录。"
          }
        ]
      }
    ],
    "links": [],
    "evidence": [
      {
        "src": "/projects/emma/interaid-landing.png",
        "alt": "InterAid Network actual pilot website landing page",
        "caption": {
          "en": "Actual pilot landing page.",
          "zh": "实际试点网站首页。"
        }
      },
      {
        "src": "/projects/emma/interaid-listings.png",
        "alt": "Demo surplus listings",
        "caption": {
          "en": "Actual local interface with fictional organizations and quantities. Demo states do not represent real donations.",
          "zh": "实际本地界面，机构和数量均为虚构演示数据，状态不代表真实捐赠成果。"
        }
      }
    ]
  }
]
