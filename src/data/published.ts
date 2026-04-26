/**
 * 公开测试结果登记表 (Public Testing Registry)
 *
 * 仅含**经客户书面授权**对外可见的元信息:
 *   - 编号 / 时间 / 维度 / 卡型 / 规模区间(粒度化) / 行业(脱敏) / 结论摘要
 *
 * 严禁包含的信息:
 *   - 客户全称 / 客户内部代号 / 项目名
 *   - 精确卡数(只给区间)
 *   - 具体 KPI 数值(只给"达标项 / 整改项 / 不达标项"计数)
 *   - 原始 telemetry 截图与日志片段
 *   - 任何可定位至单一节点 / 主机的标识
 */

export type TestCategory = 'node' | 'cluster' | 'network' | 'storage' | 'platform' | 'model';
export type Vendor = 'NVIDIA' | '昇腾' | '海光' | '寒武纪' | '摩尔线程' | '混合';
export type ScaleRange = '单机' | '<64' | '64–256' | '256–1024' | '1024+';
export type Industry =
  | '智算 / IDC'
  | '金融'
  | '政企 / 央企'
  | '互联网'
  | '服务器经销'
  | '算力出租'
  | '高校 / 科研';
export type TestStatus = 'pass' | 'partial' | 'remediated';

export interface PublishedResult {
  /** 报告编号 (GPUTEST-YYYY-MM-NNN) */
  id: string;
  /** 报告发布日期 */
  publishDate: string;
  /** 测试维度 */
  category: TestCategory;
  /** 具体测试类型 */
  testType: string;
  /** GPU 厂商 */
  vendor: Vendor;
  /** 卡型(系列名,不含 SN) */
  models: string[];
  /** 规模区间(不给具体数) */
  scaleRange: ScaleRange;
  /** 行业(脱敏代称) */
  industry: Industry;
  /** 结论摘要(只给条目计数) */
  resultSummary: string;
  /** 整体状态 */
  status: TestStatus;
  /** 工期(天) */
  durationDays: number;
}

export const CATEGORY_LABEL: Record<TestCategory, string> = {
  node: '节点测试',
  cluster: '集群测试',
  network: '网络测试',
  storage: '存储测试',
  platform: '平台测试',
  model: '模型测试',
};

export const STATUS_LABEL: Record<TestStatus, string> = {
  pass: '一次通过',
  partial: '部分达标',
  remediated: '整改后达标',
};

export const STATUS_STYLE: Record<TestStatus, string> = {
  pass: 'border-status-ok/40 text-status-ok bg-status-ok/5',
  partial: 'border-status-warn/40 text-status-warn bg-status-warn/5',
  remediated: 'border-pillar-performance/40 text-pillar-performance bg-pillar-performance/5',
};

export const PUBLISHED_RESULTS: PublishedResult[] = [
  {
    id: 'GPUTEST-2026-04-008',
    publishDate: '2026-04-22',
    category: 'cluster',
    testType: 'AIDC 项目验收',
    vendor: 'NVIDIA',
    models: ['H100', 'H200'],
    scaleRange: '1024+',
    industry: '智算 / IDC',
    resultSummary: '14 项合同 KPI · 14 项达标',
    status: 'pass',
    durationDays: 14,
  },
  {
    id: 'GPUTEST-2026-04-007',
    publishDate: '2026-04-18',
    category: 'network',
    testType: 'IB / RoCE 网络专项验收',
    vendor: 'NVIDIA',
    models: ['H100'],
    scaleRange: '256–1024',
    industry: '互联网',
    resultSummary: '6 维度 · 5 项达标 / 1 项整改后达标',
    status: 'remediated',
    durationDays: 9,
  },
  {
    id: 'GPUTEST-2026-04-006',
    publishDate: '2026-04-15',
    category: 'model',
    testType: '模型质量评测 · 国产卡迁移',
    vendor: '昇腾',
    models: ['910B'],
    scaleRange: '256–1024',
    industry: '金融',
    resultSummary: '7 维度 · 7 项达标(diff < 0.6%)',
    status: 'pass',
    durationDays: 12,
  },
  {
    id: 'GPUTEST-2026-04-005',
    publishDate: '2026-04-12',
    category: 'storage',
    testType: '智算存储测试 · 并行文件系统',
    vendor: '混合',
    models: ['H100', 'A100'],
    scaleRange: '256–1024',
    industry: '政企 / 央企',
    resultSummary: '6 维度 · 5 项达标 / 1 项不达标(已提交厂家)',
    status: 'partial',
    durationDays: 10,
  },
  {
    id: 'GPUTEST-2026-04-004',
    publishDate: '2026-04-08',
    category: 'node',
    testType: '单机批量测试',
    vendor: 'NVIDIA',
    models: ['H100', 'A100', 'L40S'],
    scaleRange: '64–256',
    industry: '服务器经销',
    resultSummary: '128 台单机 · 124 台达标 / 4 台 RMA',
    status: 'remediated',
    durationDays: 5,
  },
  {
    id: 'GPUTEST-2026-04-003',
    publishDate: '2026-04-03',
    category: 'cluster',
    testType: '集群健康审计 · 季度',
    vendor: 'NVIDIA',
    models: ['A100'],
    scaleRange: '256–1024',
    industry: '算力出租',
    resultSummary: '健康度 87 / 100 · 6 项隐患',
    status: 'partial',
    durationDays: 4,
  },
  {
    id: 'GPUTEST-2026-03-012',
    publishDate: '2026-03-28',
    category: 'platform',
    testType: '安全与合规测试',
    vendor: '混合',
    models: ['H100', '昇腾 910B'],
    scaleRange: '256–1024',
    industry: '政企 / 央企',
    resultSummary: '8 维度 · 等保 2.0 三级对照 / 6 项达标 / 2 项整改后达标',
    status: 'remediated',
    durationDays: 12,
  },
  {
    id: 'GPUTEST-2026-03-011',
    publishDate: '2026-03-22',
    category: 'model',
    testType: '模型质量评测 · 量化损失',
    vendor: 'NVIDIA',
    models: ['H100'],
    scaleRange: '<64',
    industry: '互联网',
    resultSummary: 'FP16 / FP8 / INT8 / INT4 退化曲线',
    status: 'pass',
    durationDays: 7,
  },
  {
    id: 'GPUTEST-2026-03-010',
    publishDate: '2026-03-15',
    category: 'cluster',
    testType: 'AIDC 项目验收 · 国产卡',
    vendor: '海光',
    models: ['K100'],
    scaleRange: '256–1024',
    industry: '政企 / 央企',
    resultSummary: '12 项合同 KPI · 11 项达标 / 1 项整改后达标',
    status: 'remediated',
    durationDays: 16,
  },
  {
    id: 'GPUTEST-2026-03-009',
    publishDate: '2026-03-08',
    category: 'node',
    testType: '单机批量测试 · 二手验机',
    vendor: 'NVIDIA',
    models: ['A100'],
    scaleRange: '64–256',
    industry: '服务器经销',
    resultSummary: '64 台二手 · 58 台达标 / 6 台 RMA / 退货',
    status: 'remediated',
    durationDays: 4,
  },
  {
    id: 'GPUTEST-2026-03-008',
    publishDate: '2026-03-05',
    category: 'network',
    testType: '网络厂商认证测试',
    vendor: 'NVIDIA',
    models: ['H100'],
    scaleRange: '64–256',
    industry: '互联网',
    resultSummary: '6 维度 · 6 项达标',
    status: 'pass',
    durationDays: 7,
  },
  {
    id: 'GPUTEST-2026-02-007',
    publishDate: '2026-02-25',
    category: 'cluster',
    testType: '集群健康审计 · 故障复测',
    vendor: 'NVIDIA',
    models: ['H100'],
    scaleRange: '1024+',
    industry: '算力出租',
    resultSummary: '健康度 92 / 100 · 故障件已 RMA',
    status: 'pass',
    durationDays: 6,
  },
];
