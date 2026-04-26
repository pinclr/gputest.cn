import type { CellKey } from './matrix';

export type Industry = 'aidc' | 'finance' | 'gov' | 'internet' | 'reseller' | 'cloud';
export type Vendor = 'NVIDIA' | '昇腾' | '海光' | '寒武纪' | '摩尔线程' | '混合';

export interface CaseStudy {
  slug: string;
  /** 行业脱敏代称 */
  customer: string;
  industry: Industry;
  vendor: Vendor;
  /** 卡数 / 节点数 描述 */
  scale: string;
  /** 业务线对应 */
  product: 'acceptance' | 'health-audit' | 'model-quality' | 'single-node' | 'domestic';
  hit: CellKey[];
  /** 一句话故事 */
  headline: string;
  /** 关键发现 (3-5 条) */
  findings: string[];
  /** 整改后效果 */
  outcome: string;
  /** 客户原话(已授权) */
  quote?: { text: string; role: string };
  publishedAt: string;
  /** 是否经客户书面授权公开 */
  authorized: boolean;
}

export const INDUSTRY_LABEL: Record<Industry, string> = {
  aidc: '智算中心 / IDC',
  finance: '金融',
  gov: '政企 / 央企',
  internet: '互联网',
  reseller: '服务器经销商',
  cloud: '云 / 算力出租',
};

/**
 * 案例列表 — 真实案例素材到位后,逐个填充并由客户书面授权后 authorized: true 才会上线。
 * 当前为占位结构,等待第一批 3 个真实案例。
 */
export const CASES: CaseStudy[] = [
  {
    slug: 'tier1-aidc-acceptance',
    customer: '某 Top3 智算中心运营方',
    industry: 'aidc',
    vendor: 'NVIDIA',
    scale: '1024 卡 H100 · 128 节点 · 400G IB',
    product: 'acceptance',
    hit: [
      'stability.single',
      'stability.cluster',
      'performance.single',
      'performance.cluster',
      'quality.single',
      'quality.cluster',
    ],
    headline: '千卡集群验收:在 168h soak 中找出 7 张降速卡',
    findings: [
      '初验:NCCL 多机扩展效率 81%,低于合同 KPI 88%',
      '定位 7 张 H100 在长时跑测中持续降频,温度比群均高 12℃',
      '排查为机柜热点,与机房气流组织有关',
      '质量评测:Llama2 70B 推理与参考输出余弦相似 99.7%,达标',
    ],
    outcome: '整改气流组织 + 替换 4 张确实异常的卡 → 复测扩展效率 89.3%,签收。',
    quote: {
      text: '原本以为 burn-in 通过就稳了,168h 真实负载暴露的问题让我们至少省了上线后的一波客户投诉。',
      role: '运营负责人',
    },
    publishedAt: '占位',
    authorized: false,
  },
  {
    slug: 'domestic-gpu-migration',
    customer: '某金融机构 AI 平台',
    industry: 'finance',
    vendor: '昇腾',
    scale: '256 卡 Atlas 800T A2 · 32 节点',
    product: 'model-quality',
    hit: ['quality.single', 'quality.cluster'],
    headline: '原 H100 上的风控大模型迁到昇腾,如何证明输出没退化',
    findings: [
      '与 H100 FP32 参考逐 prompt diff 1.2 万条,语义相似 99.4%',
      'INT8 量化在 GSM8K 退化 0.7 分,在合同允许的 1 分以内',
      '长上下文 NIAH 4–32k 全段命中率 100%',
      '发现 1 个 kernel 在特定 batch size 下时延异常,卡厂家配合优化',
    ],
    outcome: '迁移评估通过,模型上线昇腾集群,推理成本下降 38%。',
    publishedAt: '占位',
    authorized: false,
  },
  {
    slug: 'reseller-monthly-batch',
    customer: '某头部服务器经销商',
    industry: 'reseller',
    vendor: 'NVIDIA',
    scale: '月度 ~150 台 · H100/A100/L40S 混合',
    product: 'single-node',
    hit: ['stability.single', 'performance.single', 'quality.single'],
    headline: '月度送测 150 台,平均 RMA 率从 3.2% 降到 0.8%',
    findings: [
      '6 个月累计 880 台送测,初筛失败率 3.2%',
      '失败件按 DCGM Diag + Field Diag 输出走 RMA,不再扯皮',
      '健康度报告挂在产品页后,客户验收纠纷下降 70%',
      '量贩 8 折 + 月度合约 7 折,经销商 ROI 显著',
    ],
    outcome: '月度合约长期续签,我方现金流稳定,经销商客户复购率 95%。',
    publishedAt: '占位',
    authorized: false,
  },
];

export function getAuthorized(): CaseStudy[] {
  return CASES.filter((c) => c.authorized);
}
