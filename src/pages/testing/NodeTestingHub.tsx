import { Boxes, Sparkles, Cpu } from 'lucide-react';
import { TestingHub } from '@/components/testing/TestingHub';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function NodeTestingHub() {
  useDocumentTitle(
    '节点测试 · 单机层 GPU 服务器测试',
    '覆盖单台 GPU 服务器的硬件健康、单机性能与单机模型推理质量。Field Diag / DCGM Diag / gpu-burn / cuda_memtest 全套。',
  );

  return (
    <TestingHub
      category="节点测试"
      categoryEn="Node Testing"
      title="单台 GPU 服务器的全维度测试"
      desc="聚焦单机层:硬件健康、单卡算力、HBM 与 PCIe / NVLink 性能、单机推理精度。从经销商到货验收到企业 RMA 复测,标准化高频次的节点测试服务。"
      tone="amber"
      scope={[
        {
          label: '硬件健康',
          items: [
            'NVIDIA Field Diag · DCGM Diag Level 3',
            'gpu-burn 8h 满载',
            'cuda_memtest 全 HBM 扫描',
            'IPMI / Redfish 整机数据',
          ],
        },
        {
          label: '单机性能',
          items: [
            'FP16 / BF16 / FP8 算力实测',
            'HBM 带宽 / PCIe / NVLink 对称性',
            '单机训练 / 推理吞吐',
            '与厂商标称对账',
          ],
        },
        {
          label: '单机模型质量',
          items: [
            'MMLU / GSM8K 抽测',
            'FP16 / INT8 / INT4 量化精度',
            '与 H100 参考的输出 diff',
            '单机推理一致性',
          ],
        },
        {
          label: '稳定性事件',
          items: [
            'XID 事件全程捕获',
            'ECC 错误趋势',
            '降频与温度异常',
            '风扇 / PSU 健康',
          ],
        },
      ]}
      products={[
        {
          icon: Boxes,
          title: '单机批量测试',
          desc: '到货验收 / RMA 复测 / 二手交易,工程化流水线交付,48h 报告 SLA,量贩制。',
          href: '/solutions/single-node',
          range: '¥1,200 起 / 台',
          tag: 'primary',
        },
        {
          icon: Sparkles,
          title: '免费自测 + 50 元解读',
          desc: '免费下载工具包,本地 3 小时完成测试。可选 50 元升级专家书面解读。',
          href: '/self-serve',
          range: '免费起步',
          tag: 'intro',
        },
        {
          icon: Cpu,
          title: '国产卡专项(节点层)',
          desc: '昇腾 / 海光 / 寒武纪 / 摩尔线程的单机层评测,与 NVIDIA 参考可对照。',
          href: '/solutions/domestic-gpu',
          range: '定制',
        },
      ]}
    />
  );
}
