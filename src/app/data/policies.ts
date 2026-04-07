export type PolicyTag = "重大转向" | "新表述" | "延续" | "边际强化";

export interface SectorImpact {
  name: string;
  change: string;
  changeNum: number;
  relevance: number;
  relevanceDesc: string;
}

export interface PolicyPoint {
  text: string;
  originalText: string;
}

export interface RadarScore {
  subject: string;
  score: number;
  desc: string;
}

export interface WordItem {
  text: string;
  size: "large" | "medium" | "small";
  policyIds: string[];
  // position in the cloud: 0-100 percentages (cx, cy)
  cx: number;
  cy: number;
  rotate?: number;
}

export interface HistoryPolicy {
  title: string;
  year: string;
  org: string;
  similarity: number;
}

export interface CompareRow {
  dimension: string;
  historical: string;
  current: string;
  diff: string;
  hasDiff: boolean; // whether there's a real difference to highlight
  sectorTrend?: {   // linked market-trend data, shown inline beneath this row
    sector: string;
    t20: string;
    t20Num: number;
    description: string;
  };
}

export interface SectorTrend {
  sector: string;
  t20: string;
  t20Num: number;
  description: string;
}

export interface HeatmapRow {
  title: string;
  year: string;
  sectors: { name: string; value: string; num: number }[];
}

export interface Policy {
  id: string;
  title: string;
  fullTitle: string;
  org: string;
  date: string;
  weekday: string;
  tag: PolicyTag;
  level: string;
  summary: string;
  sectors: SectorImpact[];
  stars: number;
  points: PolicyPoint[];
  keywords: string[];
  // Tab2: 力度强不强
  authorityStars: number;     // Part1 发布主体权威度 /5
  authorityNote: string;
  toolStars: number;          // Part2 政策工具效力 /5
  toolNote: string;
  innovationStars: number;    // Part3 政策创新性 /5
  innovationNote: string;
  wordingAnalysis: { word: string; strength: "强" | "中" | "弱" }[];
  wordingConclusion: string;
  policyVerdict: string;      // overall conclusion for Tab2
  verdictLabel: string;       // short label e.g. "方向明确，落地存变数"
  // Keep for radar chart
  radarScores: RadarScore[];
  overallScore: number;
  overallDesc: string;
  // Tab3: 新旧对比看影响
  changeRelation: string;     // e.g. "迭代优化" "内容重申"
  changeRelationColor: string; // tailwind bg color class
  changeConclusion: string;   // one-sentence summary
  changeSummaryPoints: string[];
  historyPolicies: HistoryPolicy[];
  compareRows: CompareRow[];
  sectorTrends: SectorTrend[];
  heatmapRows: HeatmapRow[];
}

export const policies: Policy[] = [
  /* ────────────── 1. 旅游入境消费 ────────────── */
  {
    id: "tourism",
    title: "促进旅行服务出口 扩大入境消费政策措施",
    fullTitle:
      "商务部、中央网信办、外交部、教育部、文化和旅游部、国家卫生健康委、广电总局、体育总局、国家移民局关于促进旅行服务出口 扩大入境消费的政策措施",
    org: "商务部等9部门",
    date: "2026-03-16",
    weekday: "周一",
    tag: "新表述",
    level: "部委级 · 第二梯队",
    summary: "9部门联合推动入境消费，首推「中国游」国家旅游品牌与赛事旅游套餐",
    sectors: [
      {
        name: "旅游出行板块",
        change: "+3.2%",
        changeNum: 3.2,
        relevance: 92,
        relevanceDesc: "政策核心指向入境旅游消费扩容",
      },
      {
        name: "免税消费板块",
        change: "+2.8%",
        changeNum: 2.8,
        relevance: 78,
        relevanceDesc: "离境退税政策扩容直接利好",
      },
      {
        name: "跨境服务板块",
        change: "+1.5%",
        changeNum: 1.5,
        relevance: 65,
        relevanceDesc: "签证便利化与国际交流带动跨境服务需求",
      },
    ],
    stars: 4,
    points: [
      {
        text: "打造「中国游」国家旅游品牌，系统推广入境旅游目的地形象",
        originalText:
          "推动打造以「中国游」为核心的国家旅游品牌，整合各省市旅游资源，形成统一对外推广矩阵，提升中国旅游目的地国际知名度与吸引力。",
      },
      {
        text: "有序扩大单方面免签国家范围，研究推出电子签证，试点网上申办",
        originalText:
          "在风险可控的前提下，有序扩大单方面免签国家和地区范围；研究推出电子签证制度，探索实施网上申办、在线审批，简化入境手续。",
      },
      {
        text: "支持「赛事+旅游」套餐产品，设立国际赛事绿色通道",
        originalText:
          "支持体育赛事主办方与旅行社合作，推出赛事观赛与旅游体验相结合的套餐产品；为国际重大赛事相关人员入境设立专属绿色通道，提升服务效率。",
      },
      {
        text: "发展智慧旅游，运用AI和数字技术改善旅游服务基础设施",
        originalText:
          "推动旅游景区、酒店等场所运用人工智能和数字技术优化服务体验，建设多语言智能导览、无感支付等基础设施，发展「智慧旅游」新模式。",
      },
      {
        text: "建设国际医疗旅游集聚区，推动健康旅游出口",
        originalText:
          "在条件成熟的地区试点建设国际医疗旅游集聚区，吸引境外人员来华接受优质医疗健康服务，将健康旅游纳入服务贸易出口统计体系。",
      },
    ],
    keywords: [
      "入境消费",
      "免签扩围",
      "国家旅游品牌",
      "赛事旅游",
      "智慧旅游",
      "医疗旅游",
      "电子签证",
      "离境退税",
    ],
    // Tab2
    authorityStars: 3,
    authorityNote: "商务部牵头，9部委联合发文，属第三梯队部委级；商务部+移民局涉及服务贸易与出入境管理，升至第二梯队",
    toolStars: 3,
    toolNote: "以「鼓励」「支持」激励引导类为主；电子签证、AI智慧旅游等为「研究」「探索」类信号，无强制约束",
    innovationStars: 4,
    innovationNote: "首次系统提出「中国游」国家品牌、「赛事+旅游」套餐、国际医疗旅游集聚区，关键词升级为「入境多维消费」，市场预期差≈+30%",
    wordingAnalysis: [
      { word: "鼓励", strength: "弱" },
      { word: "支持", strength: "弱" },
      { word: "研究推出", strength: "弱" },
      { word: "有序扩大", strength: "中" },
      { word: "明确要求", strength: "强" },
    ],
    wordingConclusion: "激励引导为主，约80%条款属建议性表述；少数落地保障条款带有明确要求，整体执行弹性较大",
    policyVerdict: "信号意义大于执行约束。9部委联合背书，方向性明确，但多数措施为「鼓励」「支持」类，最终落地效果依赖各部委后续配套政策跟进。",
    verdictLabel: "方向明确，落地存变数",
    radarScores: [
      { subject: "发布主体权威度", score: 72, desc: "9部委联合，升至第二梯队" },
      { subject: "行业覆盖广度", score: 80, desc: "旅游、文娱、健康、教育等多领域" },
      { subject: "政策表述强度", score: 55, desc: "以激励引导为主，约束类条款偏少" },
      { subject: "政策创新性", score: 82, desc: "首提「中国游」品牌等多项新表述" },
    ],
    overallScore: 76,
    overallDesc: "较强影响，高于近3年同类政策的71%",
    // Tab3
    changeRelation: "新表述",
    changeRelationColor: "bg-orange-500",
    changeConclusion: "整体框架延续历史政策，但首次系统提出「中国游」国家品牌等新概念，信号意义超出市场预期约30%",
    changeSummaryPoints: [
      "首次系统提出「中国游」国家旅游品牌，历史政策无此表述",
      "签证便利化从原则性表述细化为电子签证试点路径",
      "新增「赛事+旅游」套餐和国际赛事绿色通道",
      "核心政策目标和基本框架与历史政策高度一致",
    ],
    historyPolicies: [
      {
        title: "关于促进消费扩大内需的若干意见",
        year: "2020",
        org: "国务院办公厅",
        similarity: 82,
      },
      {
        title: "关于进一步便利外籍人员来华工作生活的若干措施",
        year: "2023",
        org: "外交部等5部委",
        similarity: 71,
      },
    ],
    compareRows: [
      {
        dimension: "政策目标",
        historical: "促进旅行服务出口，扩大入境消费，推动服务贸易和服务消费联动发展",
        current: "促进旅行服务出口，扩大入境消费，推动服务贸易和服务消费联动发展",
        diff: "无差异，目标一致",
        hasDiff: false,
      },
      {
        dimension: "签证便利化",
        historical: "提供签证便利，优化签证政策",
        current: "有序扩大单方面免签国家范围，研究推出电子签证，试点网上申办",
        diff: "当前政策明显细化，明确电子签证试点路径，操作性更强",
        hasDiff: true,
        sectorTrend: {
          sector: "旅游出行板块",
          t20: "+14.3%",
          t20Num: 14.3,
          description: "2020年同类免签扩围政策发布后：T+3开始拉升，T+10短暂回调，T+20累计涨14.3%",
        },
      },
      {
        dimension: "智慧旅游",
        historical: "运用人工智能和数字技术改善服务基础设施",
        current: "运用人工智能和数字技术改善服务基础设施，发展智慧旅游",
        diff: "新增「发展智慧旅游」独立表述，数字化方向信号更明确",
        hasDiff: true,
        sectorTrend: {
          sector: "数字文旅板块",
          t20: "+8.6%",
          t20Num: 8.6,
          description: "2023年「便利外籍来华」相关政策后：AI+旅游概念升温，T+20累计+8.6%",
        },
      },
      {
        dimension: "国际赛事",
        historical: "支持举办具有全球影响力的国际赛事",
        current: "支持举办具有全球影响力的国际赛事，设立绿色通道",
        diff: "新增绿色通道，服务保障细节更完善",
        hasDiff: true,
        sectorTrend: {
          sector: "文体赛事板块",
          t20: "+11.2%",
          t20Num: 11.2,
          description: "2022年赛事旅游相关政策后：赛事经济预期发酵，快速拉升后震荡，T+20累计+11.2%",
        },
      },
    ],
    sectorTrends: [
      { sector: "旅游出行板块", t20: "+14.3%", t20Num: 14.3, description: "T+5小幅回调后持续拉升" },
      { sector: "免税消费板块", t20: "+9.7%", t20Num: 9.7, description: "稳步上行" },
      { sector: "跨境服务板块", t20: "+6.2%", t20Num: 6.2, description: "温和正向" },
    ],
    heatmapRows: [
      {
        title: "《促消费意见》",
        year: "2020",
        sectors: [
          { name: "旅游出行", value: "+14.3%", num: 14.3 },
          { name: "免税消费", value: "+9.7%", num: 9.7 },
          { name: "跨境服务", value: "+6.2%", num: 6.2 },
        ],
      },
      {
        title: "《扩大对外开放若干措施》",
        year: "2022",
        sectors: [
          { name: "旅游出行", value: "+6.1%", num: 6.1 },
          { name: "免税消费", value: "+4.3%", num: 4.3 },
          { name: "跨境服务", value: "+8.9%", num: 8.9 },
        ],
      },
      {
        title: "《便利外籍人员来华措施》",
        year: "2023",
        sectors: [
          { name: "旅游出行", value: "+3.8%", num: 3.8 },
          { name: "免税消费", value: "+2.1%", num: 2.1 },
          { name: "跨境服务", value: "+5.4%", num: 5.4 },
        ],
      },
    ],
  },

  /* ────────────── 2. 特医食品 ────────────── */
  {
    id: "medical-food",
    title: "特殊医学用途配方食品按新国标注册问答",
    fullTitle: "国家市场监督管理总局《特殊医学用途配方食品按新国标注册问答》",
    org: "国家市场监督管理总局",
    date: "2026-03-18",
    weekday: "周三",
    tag: "延续",
    level: "部委级 · 第二梯队",
    summary: "市场监管总局细化特医食品新国标注册流程，新增临床试验硬性要求，明确变更注册路径",
    sectors: [
      {
        name: "特医食品板块",
        change: "+1.1%",
        changeNum: 1.1,
        relevance: 88,
        relevanceDesc: "政策直接规范特医食品注册流程，合规确定性提升",
      },
      {
        name: "医疗营养板块",
        change: "+0.8%",
        changeNum: 0.8,
        relevance: 62,
        relevanceDesc: "临床营养领域受临床试验新要求间接影响",
      },
    ],
    stars: 3,
    points: [
      {
        text: "自新国标发布之日起即可申请注册，无需等待过渡期结束",
        originalText:
          "根据新国标相关规定，企业可自新国标发布之日起即向主管部门提交注册申请，无需等待过渡期届满，有助于缩短产品上市周期。",
      },
      {
        text: "已注册产品须先注销原产品，再按新国标申请新产品注册",
        originalText:
          "对于已在现行标准下完成注册的产品，须在完成原产品注销手续后方可按新国标申请新产品注册，不得同时持有两个注册证书。",
      },
      {
        text: "申请材料须详细说明调整前后差异，强化透明度与可追溯性",
        originalText:
          "申请人在提交注册申请材料时，应当对照原注册版本，逐项说明产品配方、工艺、包装等方面的调整情况及理由，确保材料真实完整。",
      },
      {
        text: "一般情形下应开展临床试验，确保产品临床效果与安全性",
        originalText:
          "除特殊豁免情形外，申请人应当提交经伦理委员会审查批准的临床试验报告，证明产品对目标人群的临床适用性和安全性。",
      },
      {
        text: "调整型全营养及特定疾病人群产品均需满足新国标技术要求",
        originalText:
          "所有拟按新国标注册的调整型全营养配方食品及针对特定疾病人群的配方食品，必须在产品配方、营养成分及标签标识等方面全面符合新国标的技术要求。",
      },
    ],
    keywords: [
      "特殊医学食品",
      "注册申请",
      "新国标",
      "临床试验",
      "过渡期",
      "全营养配方",
      "注销程序",
      "标签标识",
    ],
    // Tab2
    authorityStars: 3,
    authorityNote: "国家市场监督管理总局单主体，属第三梯队；因涉及食品安全强制标准，特殊权重升至第二梯队行政级",
    toolStars: 3,
    toolNote: "政策文本多次使用「必须」「应当」等强制约束类表述，明确注册要求和变更流程，执行规范性强",
    innovationStars: 3,
    innovationNote: "在2020年政策基础上迭代优化：新增临床试验硬要求、细化材料说明要求，属预期内合理完善，无突破性变化",
    wordingAnalysis: [
      { word: "必须", strength: "强" },
      { word: "应当", strength: "强" },
      { word: "建议尽早", strength: "中" },
      { word: "可按照", strength: "弱" },
    ],
    wordingConclusion: "强制约束类表述占主导，「必须」「应当」出现频率高；适用范围聚焦特医食品注册这一细分场景，执行确定性高但市场覆盖面窄",
    policyVerdict: "这条政策「讲话算数」——强制性表述比例高，执行路径清晰，相关企业合规要求明确。但政策本身是规范性问答，无新增产业刺激，对市场整体情绪影响有限。",
    verdictLabel: "规范确定，影响范围有限",
    radarScores: [
      { subject: "发布主体权威度", score: 60, desc: "市监总局，食品安全升权重" },
      { subject: "行业覆盖广度", score: 40, desc: "局限特医食品单一细分" },
      { subject: "政策表述强度", score: 75, desc: "强制约束表述占主导" },
      { subject: "政策创新性", score: 55, desc: "迭代优化，新增临床试要求" },
    ],
    overallScore: 58,
    overallDesc: "中等影响，规范性政策为主",
    // Tab3
    changeRelation: "迭代优化",
    changeRelationColor: "bg-blue-500",
    changeConclusion: "相比2020年复函，新政策整体框架不变，核心亮点是新增临床试验硬性要求、细化差异说明材料标准——对新进入者门槛有所提高",
    changeSummaryPoints: [
      "新增：一般情形下须开展临床试验（2020年政策未明确要求）",
      "强化：申请材料须逐项说明调整前后差异（原政策允许不重复提交）",
      "调整：允许更早提交注册申请，无需等待过渡期届满",
      "核心变更机制由「停用原配方」改为「先注销再新注册」",
    ],
    historyPolicies: [
      {
        title: "市场监管总局办公厅关于特殊医学用途配方食品变更注册后产品配方和标签更替问题的复函",
        year: "2020",
        org: "国家市场监督管理总局",
        similarity: 79,
      },
    ],
    compareRows: [
      {
        dimension: "注册申请时间",
        historical: "自批准之日起3个月内完成更替",
        current: "自新国标发布之日起即可申请注册",
        diff: "当前政策允许更早申请，减少过渡期不确定性",
        hasDiff: true,
        sectorTrend: {
          sector: "特医食品板块",
          t20: "+3.2%",
          t20Num: 3.2,
          description: "2020年复函发布后：注册窗口提前明确，合规预期改善，板块温和上行，T+20累计+3.2%",
        },
      },
      {
        dimension: "变更注册要求",
        historical: "应当停用原配方和标签",
        current: "原产品注销后申请新产品注册",
        diff: "当前政策要求更彻底变更，确保完全符合新国标",
        hasDiff: true,
      },
      {
        dimension: "材料提交要求",
        historical: "未发生变化的材料不再重复提交",
        current: "应详细说明调整前后的差异",
        diff: "当前政策要求更详细的差异说明，提升可追溯性",
        hasDiff: true,
      },
      {
        dimension: "临床试验必要性",
        historical: "未明确要求",
        current: "一般应开展临床试验",
        diff: "当前政策新增临床试验要求，这是最重要的变化点",
        hasDiff: true,
        sectorTrend: {
          sector: "医疗营养板块",
          t20: "+1.8%",
          t20Num: 1.8,
          description: "2020年政策后：临床门槛提升行业准入，龙头企业受益，小厂承压，板块整体微升+1.8%",
        },
      },
    ],
    sectorTrends: [
      { sector: "特医食品板块", t20: "+3.2%", t20Num: 3.2, description: "小幅震荡微升" },
      { sector: "医疗营养板块", t20: "+1.8%", t20Num: 1.8, description: "基本平稳" },
    ],
    heatmapRows: [],
  },

  /* ────────────── 3. 西安消防 ────────────── */
  {
    id: "fire-safety",
    title: "西安市居民住宅区消防安全规定",
    fullTitle: "西安市居民住宅区消防安全规定（经陕西省人大常委会批准，2026年4月1日起实施）",
    org: "西安市人大",
    date: "2026-03-10",
    weekday: "周二",
    tag: "延续",
    level: "地方级 · 省会市",
    summary: "西安市立法规范住宅区消防安全，25项强制条款，新增电动车充电规定与AI远程监管平台",
    sectors: [
      {
        name: "消防安防板块",
        change: "+0.4%",
        changeNum: 0.4,
        relevance: 71,
        relevanceDesc: "强制约束条款推动消防设施合规采购",
      },
      {
        name: "智能家居板块",
        change: "+0.2%",
        changeNum: 0.2,
        relevance: 38,
        relevanceDesc: "电动车智能充电设施条款带动相关需求",
      },
    ],
    stars: 2,
    points: [
      {
        text: "市、区县人民政府负责落实消防工作责任制，强化层级问责",
        originalText:
          "市、区县人民政府是本行政区域居民住宅区消防安全工作的责任主体，须建立消防工作责任制，逐级落实消防安全管理职责，纳入年度绩效考核体系。",
      },
      {
        text: "物业服务人须建立消防安全制度和操作规程，依法履行消防职责",
        originalText:
          "物业服务人应当依法履行消防安全职责，建立健全消防安全管理制度和操作规程，定期组织消防安全检查和演练，配备必要的消防器材。",
      },
      {
        text: "禁止电动车在楼道、安全出口停放充电，须设集中充电区域",
        originalText:
          "严禁将电动自行车及其电池推入室内、楼道或安全出口停放、充电。住宅区应按规定设置集中停放、充电区域，并配备必要的消防设施。",
      },
      {
        text: "居民须掌握用火、用电、用油、用气及逃生技能",
        originalText:
          "居民应当积极参加消防安全教育培训，掌握安全用火、用电、用油、用气基本知识及初期火灾扑救和安全逃生技能，不得影响消防通道畅通。",
      },
      {
        text: "新增大数据与AI远程监管平台，推动消防网格化管理",
        originalText:
          "建立居民住宅区消防安全大数据平台，运用人工智能、物联网等技术实施远程火灾预警和监控，推动消防管理网格化、精细化，提升社区消防治理能力。",
      },
    ],
    keywords: [
      "消防安全",
      "电动车充电",
      "网格化监管",
      "大数据监控",
      "物业职责",
      "住宅区",
      "强制条款",
      "AI预警",
    ],
    // Tab2
    authorityStars: 2,
    authorityNote: "西安市人大单主体立法，属第四等级省会市地方性法规；消防领域无金融/财政/产业属性，不触发权重升级",
    toolStars: 4,
    toolNote: "强制约束类25项条款，涵盖5千—5万元罚款及强制执行，高强制+低激励组合；鼓励安装智能充电设施为辅助激励",
    innovationStars: 1,
    innovationNote: "与运城、驻马店、南阳等地2021—2025年同类条例高度重合，「网格化」「电动车集中停放」均为延续；仅「大数据+AI远程监管」为新增，创新度极低",
    wordingAnalysis: [
      { word: "必须", strength: "强" },
      { word: "禁止", strength: "强" },
      { word: "应当", strength: "强" },
      { word: "鼓励", strength: "弱" },
    ],
    wordingConclusion: "强制约束条款密集（25项），执行有罚款保障；但地方性法规属性决定了它只在西安市辖区内有法律效力，市场覆盖面极为有限",
    policyVerdict: "在西安市范围内，这条政策「讲话绝对算数」——25项强制条款配套罚款，落地确定性高。但对资本市场而言，地方法规的空间局限性使得板块影响微乎其微。",
    verdictLabel: "本地执行力强，市场基本无感",
    radarScores: [
      { subject: "发布主体权威度", score: 28, desc: "省会市地方性法规，权威度受限" },
      { subject: "行业覆盖广度", score: 35, desc: "局限西安住宅消防场景" },
      { subject: "政策表述强度", score: 78, desc: "25项强制条款，罚款保障" },
      { subject: "政策创新性", score: 20, desc: "高度复制历史同类法规" },
    ],
    overallScore: 32,
    overallDesc: "边际影响，地方法规属性",
    // Tab3
    changeRelation: "迭代优化",
    changeRelationColor: "bg-blue-500",
    changeConclusion: "与运城等地2025年同类法规高度重合，最大亮点是新增「大数据+AI远程监管」表述；整体属于全国消防安全立法浪潮中的常规跟进，无重大突破",
    changeSummaryPoints: [
      "最大亮点：新增大数据+AI远程监管平台要求（历史同类法规无此表述）",
      "新增用油安全知识，居民义务条款更细化",
      "物业职责从「企业」扩展为「物业服务人」，概念更广",
      "设施维护增加消防器材和安全标志，要求更全面",
    ],
    historyPolicies: [
      {
        title: "运城市居民住宅区消防安全管理条例",
        year: "2025",
        org: "运城市人大",
        similarity: 85,
      },
    ],
    compareRows: [
      {
        dimension: "政府责任",
        historical: "市、县（市、区）人民政府负责本行政区域内的居民住宅区消防安全管理工作",
        current: "市、区县人民政府负责本行政区域内居民住宅区消防工作，落实消防工作责任制",
        diff: "当前政策强调「责任制」落实，提升执行力",
        hasDiff: true,
      },
      {
        dimension: "物业管理",
        historical: "物业服务企业应当履行法律法规和物业服务合同规定的消防安全职责",
        current: "物业服务人应当依法履行消防安全职责，建立制度和操作规程",
        diff: "「企业」改为「服务人」，范围更广；新增制度化要求",
        hasDiff: true,
        sectorTrend: {
          sector: "物业管理板块",
          t20: "+0.8%",
          t20Num: 0.8,
          description: "2025年运城同类法规发布后：消防合规要求带来小额设施支出，物业板块小幅正向，T+20累计+0.8%",
        },
      },
      {
        dimension: "居民义务",
        historical: "掌握安全用火、用电、用气和防火、灭火常识及逃生技能",
        current: "掌握安全用火、用电、用油、用气和防火、灭火常识以及逃生技能",
        diff: "新增「用油」安全知识，细化居民义务",
        hasDiff: true,
      },
      {
        dimension: "设施维护",
        historical: "物业服务企业应当维护管理物业服务区域内的共用消防设施",
        current: "物业服务人应当维护管理共用消防设施、器材和消防安全标志",
        diff: "新增器材和标志维护要求，覆盖更全面",
        hasDiff: true,
        sectorTrend: {
          sector: "消防安防板块",
          t20: "+1.4%",
          t20Num: 1.4,
          description: "2025年运城条例后：器材采购需求小幅提振安防板块，高强制性但地方效力有限，T+20累计+1.4%",
        },
      },
    ],
    sectorTrends: [
      { sector: "消防安防板块", t20: "+1.4%", t20Num: 1.4, description: "微幅震荡" },
      { sector: "智能家居板块", t20: "+0.6%", t20Num: 0.6, description: "基本持平" },
    ],
    heatmapRows: [],
  },
];

export const hotWords: WordItem[] = [
  // Large (center cluster)
  { text: "入境消费", size: "large", policyIds: ["tourism"], cx: 28, cy: 32, rotate: -3 },
  { text: "免签扩围", size: "large", policyIds: ["tourism"], cx: 56, cy: 28, rotate: 2 },
  { text: "智慧旅游", size: "large", policyIds: ["tourism"], cx: 22, cy: 60, rotate: -5 },
  { text: "国家旅游品牌", size: "large", policyIds: ["tourism"], cx: 52, cy: 62, rotate: 3 },
  // Medium (middle ring)
  { text: "特殊医学食品", size: "medium", policyIds: ["medical-food"], cx: 4, cy: 16, rotate: -8 },
  { text: "注册申请", size: "medium", policyIds: ["medical-food"], cx: 68, cy: 12, rotate: 5 },
  { text: "新国标", size: "medium", policyIds: ["medical-food"], cx: 74, cy: 48, rotate: -4 },
  { text: "临床试验", size: "medium", policyIds: ["medical-food"], cx: 6, cy: 82, rotate: 6 },
  // Small (outer edges)
  { text: "消防安全", size: "small", policyIds: ["fire-safety"], cx: 38, cy: 4, rotate: 3 },
  { text: "电动车充电", size: "small", policyIds: ["fire-safety"], cx: 58, cy: 88, rotate: -5 },
  { text: "网格化监管", size: "small", policyIds: ["fire-safety"], cx: 2, cy: 50, rotate: 8 },
  { text: "大数据监控", size: "small", policyIds: ["fire-safety"], cx: 66, cy: 78, rotate: -6 },
];