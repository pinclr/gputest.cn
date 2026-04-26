export type Pillar = 'stability' | 'performance' | 'quality';
export type Scale = 'single' | 'cluster';
export type CellKey = `${Pillar}.${Scale}`;

export interface MatrixCell {
  key: CellKey;
  pillar: Pillar;
  scale: Scale;
  title: string;
  summary: string;
  items: string[];
  tools: string[];
}

export const PILLAR_LABEL: Record<Pillar, string> = {
  stability: '稳定性',
  performance: '性能',
  quality: '模型质量',
};

export const PILLAR_EN: Record<Pillar, string> = {
  stability: 'Stability',
  performance: 'Performance',
  quality: 'Model Quality',
};

export const SCALE_LABEL: Record<Scale, string> = {
  single: '单机',
  cluster: '集群',
};

export const PILLAR_COLOR: Record<Pillar, { bg: string; border: string; text: string; dot: string }> = {
  stability: {
    bg: 'bg-pillar-stability/8',
    border: 'border-pillar-stability/30',
    text: 'text-pillar-stability',
    dot: 'bg-pillar-stability',
  },
  performance: {
    bg: 'bg-pillar-performance/8',
    border: 'border-pillar-performance/30',
    text: 'text-pillar-performance',
    dot: 'bg-pillar-performance',
  },
  quality: {
    bg: 'bg-pillar-quality/8',
    border: 'border-pillar-quality/30',
    text: 'text-pillar-quality',
    dot: 'bg-pillar-quality',
  },
};

export const MATRIX: MatrixCell[] = [
  {
    key: 'stability.single',
    pillar: 'stability',
    scale: 'single',
    title: '单机硬件健康',
    summary: '把每一台服务器烧到极限，看哪颗芯先掉队。',
    items: ['HBM ECC 全扫描', '满载温度 / 功耗 / 降频', '风扇 · PSU · 整机风冷'],
    tools: ['NVIDIA Field Diag', 'DCGM Diag', 'gpu-burn', 'cuda_memtest'],
  },
  {
    key: 'stability.cluster',
    pillar: 'stability',
    scale: 'cluster',
    title: '集群韧性',
    summary: '168 小时真实负载 + 故障注入，暴露集群级隐患。',
    items: ['72–168h 训练 soak', '拔卡 / 断链 / 断电演练', 'IB / RoCE 链路抖动'],
    tools: ['NCCL-tests soak', 'ibdiagnet', 'Chaos 注入器', 'DCGM Exporter'],
  },
  {
    key: 'performance.single',
    pillar: 'performance',
    scale: 'single',
    title: '单机算力',
    summary: '与厂商标称对账,落地真实性能上限。',
    items: ['FP16 / BF16 / FP8 实测', 'HBM 带宽 / PCIe / NVLink', '单机训练 / 推理吞吐'],
    tools: ['nvbandwidth', 'cuBLAS bench', 'NCCL P2P', 'MLPerf 单机'],
  },
  {
    key: 'performance.cluster',
    pillar: 'performance',
    scale: 'cluster',
    title: '集群吞吐',
    summary: '多机扩展效率与端到端时延,集群价值的核心 KPI。',
    items: ['NCCL / HCCL 扩展效率', '多机训练 token/s', 'e2e 推理时延'],
    tools: ['nccl-tests', 'perftest', 'Llama2 多机 harness', 'HPL'],
  },
  {
    key: 'quality.single',
    pillar: 'quality',
    scale: 'single',
    title: '单机推理精度',
    summary: '量化与硬件差异是否影响输出 — 国产卡选型的关键。',
    items: ['MMLU · CMMLU · GSM8K', 'FP16 / FP8 / INT8 / INT4 退化', '与 H100 参考的输出 diff'],
    tools: ['lm-eval-harness', 'OpenCompass', '自研 diff harness'],
  },
  {
    key: 'quality.cluster',
    pillar: 'quality',
    scale: 'cluster',
    title: '集群训练一致性',
    summary: '多机训练能否收敛到与参考一致的结果。',
    items: ['loss 曲线偏离', '多机输出余弦相似', '长上下文 (NIAH / RULER)'],
    tools: ['TensorBoard 比对', 'RULER', 'LongBench', '自研 diff'],
  },
];

export function getCell(key: CellKey): MatrixCell {
  const cell = MATRIX.find((c) => c.key === key);
  if (!cell) throw new Error(`Unknown cell: ${key}`);
  return cell;
}
