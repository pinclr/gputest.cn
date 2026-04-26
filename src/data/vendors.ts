export interface VendorCard {
  vendor: string;
  vendorEn: string;
  models: string[];
  ecosystem: string[];
  coverage: {
    stability: 'full' | 'standard' | 'partial';
    performance: 'full' | 'standard' | 'partial';
    quality: 'full' | 'standard' | 'partial';
  };
  hasCase: boolean;
}

export const COVERAGE_LABEL: Record<'full' | 'standard' | 'partial', string> = {
  full: '完整',
  standard: '标配',
  partial: '部分',
};

export const COVERAGE_STYLE: Record<'full' | 'standard' | 'partial', string> = {
  full: 'border-status-ok/40 text-status-ok bg-status-ok/5',
  standard: 'border-pillar-performance/40 text-pillar-performance bg-pillar-performance/5',
  partial: 'border-status-warn/40 text-status-warn bg-status-warn/5',
};

export const VENDORS: VendorCard[] = [
  {
    vendor: 'NVIDIA',
    vendorEn: 'NVIDIA',
    models: ['B200', 'H200', 'H100', 'H800', 'H20', 'A800', 'A100', 'L40S', 'L20', '5090', '4090'],
    ecosystem: ['CUDA', 'cuDNN', 'TensorRT', 'NCCL', 'PyTorch', 'Megatron-LM'],
    coverage: { stability: 'full', performance: 'full', quality: 'full' },
    hasCase: true,
  },
  {
    vendor: '昇腾',
    vendorEn: 'Ascend',
    models: ['910C', '910B', '910Pro', 'Atlas 800T A2', '310P'],
    ecosystem: ['CANN', 'MindSpore', 'PyTorch-NPU', 'HCCL', 'ATB'],
    coverage: { stability: 'full', performance: 'full', quality: 'full' },
    hasCase: true,
  },
  {
    vendor: '海光',
    vendorEn: 'Hygon DCU',
    models: ['K100', 'Z100', 'Z100L'],
    ecosystem: ['DTK', 'ROCm 派生', 'PyTorch-DCU', 'RCCL'],
    coverage: { stability: 'full', performance: 'standard', quality: 'standard' },
    hasCase: true,
  },
  {
    vendor: '寒武纪',
    vendorEn: 'Cambricon',
    models: ['MLU590', 'MLU580', 'MLU370'],
    ecosystem: ['Neuware', 'MagicMind', 'CNCL', 'BANGC'],
    coverage: { stability: 'standard', performance: 'standard', quality: 'partial' },
    hasCase: false,
  },
  {
    vendor: '摩尔线程',
    vendorEn: 'Moore Threads',
    models: ['MTT S4000', 'MTT S3000'],
    ecosystem: ['MUSA', 'MCCL', 'PyTorch-MUSA'],
    coverage: { stability: 'standard', performance: 'partial', quality: 'partial' },
    hasCase: false,
  },
];
