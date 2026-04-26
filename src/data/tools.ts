export type ToolSource = 'official' | 'open-source' | 'in-house';
export type ToolTier = 'T1' | 'T2' | 'T3';
export type ToolPlatform =
  | 'nvidia'
  | 'ascend'
  | 'hygon'
  | 'cambricon'
  | 'moore'
  | 'common';
export type ToolPillar = 'stability' | 'performance' | 'quality';
export type ToolScale = 'single' | 'cluster';

export interface Tool {
  name: string;
  desc: string;
  source: ToolSource;
  tier: ToolTier;
  platforms: ToolPlatform[];
  pillars: ToolPillar[];
  scales: ToolScale[];
}

export const SOURCE_LABEL: Record<ToolSource, string> = {
  official: '厂商官方',
  'open-source': '开源',
  'in-house': '自研',
};

export const SOURCE_STYLE: Record<ToolSource, string> = {
  official: 'border-pillar-performance/40 text-pillar-performance bg-pillar-performance/5',
  'open-source': 'border-pillar-stability/40 text-pillar-stability bg-pillar-stability/5',
  'in-house': 'border-pillar-quality/40 text-pillar-quality bg-pillar-quality/5',
};

export const TIER_LABEL: Record<ToolTier, string> = {
  T1: 'T1 必跑',
  T2: 'T2 标配',
  T3: 'T3 加项',
};

export const PLATFORM_LABEL: Record<ToolPlatform, string> = {
  nvidia: 'NVIDIA',
  ascend: '昇腾',
  hygon: '海光',
  cambricon: '寒武纪',
  moore: '摩尔线程',
  common: '通用',
};

export const STABILITY_TOOLS: Tool[] = [
  {
    name: 'NVIDIA Field Diag',
    desc: '官方现场硬件诊断,RMA 依据,授权分发',
    source: 'official',
    tier: 'T1',
    platforms: ['nvidia'],
    pillars: ['stability'],
    scales: ['single'],
  },
  {
    name: 'DCGM Diag',
    desc: '数据中心级标准诊断,Level 1–4 强度可选',
    source: 'official',
    tier: 'T1',
    platforms: ['nvidia'],
    pillars: ['stability', 'performance'],
    scales: ['single'],
  },
  {
    name: 'gpu-burn',
    desc: '满负载 matmul 压测,温度 / 功耗 / ECC 触发',
    source: 'open-source',
    tier: 'T1',
    platforms: ['nvidia', 'hygon'],
    pillars: ['stability'],
    scales: ['single'],
  },
  {
    name: 'cuda_memtest',
    desc: 'HBM 显存深度扫描,逐 bit 校验',
    source: 'open-source',
    tier: 'T1',
    platforms: ['nvidia'],
    pillars: ['stability'],
    scales: ['single'],
  },
  {
    name: 'dcgmi health watch',
    desc: '实时健康事件订阅,捕获 XID / ECC / Thermal',
    source: 'official',
    tier: 'T1',
    platforms: ['nvidia'],
    pillars: ['stability'],
    scales: ['single', 'cluster'],
  },
  {
    name: 'NCCL-tests soak',
    desc: '多机 All-Reduce 长时跑,降速 / 抖动发现',
    source: 'official',
    tier: 'T1',
    platforms: ['nvidia'],
    pillars: ['stability', 'performance'],
    scales: ['cluster'],
  },
  {
    name: 'ibdiagnet / perftest',
    desc: 'IB fabric 拓扑误码扫描 + 链路带宽时延实测',
    source: 'official',
    tier: 'T1',
    platforms: ['common'],
    pillars: ['stability', 'performance'],
    scales: ['cluster'],
  },
  {
    name: 'nvbandwidth',
    desc: 'PCIe / NVLink 带宽与对称性',
    source: 'official',
    tier: 'T2',
    platforms: ['nvidia'],
    pillars: ['performance'],
    scales: ['single'],
  },
  {
    name: 'HPL-NVIDIA / HPCG',
    desc: 'HPC 级长时压测,兼性能基准',
    source: 'official',
    tier: 'T2',
    platforms: ['nvidia', 'hygon'],
    pillars: ['stability', 'performance'],
    scales: ['cluster'],
  },
  {
    name: 'Llama2 / GPT 训练 soak',
    desc: '真实负载 72–168h soak,含 loss spike / NaN 监控',
    source: 'in-house',
    tier: 'T1',
    platforms: ['common'],
    pillars: ['stability', 'quality'],
    scales: ['cluster'],
  },
  {
    name: 'Chaos 注入器',
    desc: '拔卡 / 断网 / 断 PSU / 网卡 down 演练',
    source: 'in-house',
    tier: 'T2',
    platforms: ['common'],
    pillars: ['stability'],
    scales: ['cluster'],
  },
  {
    name: 'DCGM Exporter + Prometheus',
    desc: '集群 telemetry 全程采集,趋势归档',
    source: 'open-source',
    tier: 'T1',
    platforms: ['nvidia', 'common'],
    pillars: ['stability', 'performance'],
    scales: ['cluster'],
  },
  {
    name: 'lm-eval-harness',
    desc: 'MMLU / GSM8K / HumanEval 等标准能力测试',
    source: 'open-source',
    tier: 'T1',
    platforms: ['common'],
    pillars: ['quality'],
    scales: ['single', 'cluster'],
  },
  {
    name: 'OpenCompass',
    desc: 'CMMLU / CEval / MMBench 等中文 / 多模态评测',
    source: 'open-source',
    tier: 'T1',
    platforms: ['common'],
    pillars: ['quality'],
    scales: ['single', 'cluster'],
  },
  {
    name: '自研 diff harness',
    desc: '与 H100 FP32 参考的逐层 logits / 输出 diff',
    source: 'in-house',
    tier: 'T1',
    platforms: ['common'],
    pillars: ['quality'],
    scales: ['single', 'cluster'],
  },
  {
    name: 'RULER / LongBench',
    desc: '长上下文 NIAH 与摘要质量',
    source: 'open-source',
    tier: 'T2',
    platforms: ['common'],
    pillars: ['quality'],
    scales: ['cluster'],
  },
  {
    name: 'IPMI / Redfish 采集',
    desc: 'BMC 级温度 / 功耗时间序列',
    source: 'open-source',
    tier: 'T1',
    platforms: ['common'],
    pillars: ['stability'],
    scales: ['single', 'cluster'],
  },
  // 国产卡平台对应
  {
    name: 'npu-smi / Ascend Field Diag',
    desc: '昇腾 NPU 健康检查与诊断',
    source: 'official',
    tier: 'T1',
    platforms: ['ascend'],
    pillars: ['stability'],
    scales: ['single'],
  },
  {
    name: 'HCCL-tests',
    desc: '昇腾集群通信压测,对应 NCCL-tests',
    source: 'official',
    tier: 'T1',
    platforms: ['ascend'],
    pillars: ['stability', 'performance'],
    scales: ['cluster'],
  },
  {
    name: 'rocm-smi / RCCL-tests',
    desc: '海光 DCU 健康与多机通信压测',
    source: 'official',
    tier: 'T1',
    platforms: ['hygon'],
    pillars: ['stability', 'performance'],
    scales: ['single', 'cluster'],
  },
  {
    name: 'cnmon / CNCL-tests',
    desc: '寒武纪健康与多机通信压测',
    source: 'official',
    tier: 'T1',
    platforms: ['cambricon'],
    pillars: ['stability', 'performance'],
    scales: ['single', 'cluster'],
  },
  {
    name: 'mthreads-gmi',
    desc: '摩尔线程健康与诊断',
    source: 'official',
    tier: 'T1',
    platforms: ['moore'],
    pillars: ['stability'],
    scales: ['single'],
  },
];
