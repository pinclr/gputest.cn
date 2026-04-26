import { Building2, Stethoscope, FlaskConical } from 'lucide-react';
import { TestingHub } from '@/components/testing/TestingHub';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function ClusterTestingHub() {
  useDocumentTitle(
    '集群测试 · 多机协同与系统级测试',
    'AIDC 项目验收、集群健康审计、模型质量评测。覆盖多机训练 / 推理 / 稳定性的集群级测试体系。',
  );

  return (
    <TestingHub
      category="集群测试"
      categoryEn="Cluster Testing"
      title="多机协同与系统级 GPU 集群测试"
      desc="聚焦集群层:多机训练扩展效率、长时稳定性、故障注入、模型训练一致性。从新建 AIDC 验收到运行期健康审计,中立第三方完整覆盖集群生命周期。"
      tone="steel"
      scope={[
        {
          label: '集群稳定性',
          items: [
            '72–168h 真实负载 soak',
            '故障注入(拔卡 / 断链)',
            'XID 事件聚合分析',
            '集群级 ECC 趋势',
          ],
        },
        {
          label: '集群性能',
          items: [
            'NCCL / HCCL 多机扩展效率',
            '多机训练 token/s',
            '端到端 e2e 推理时延',
            'HPL / HPCG 集群基线',
          ],
        },
        {
          label: '训练一致性',
          items: [
            'loss 曲线偏离对比',
            '多机输出语义相似',
            '长上下文 NIAH / RULER',
            '跨节点确定性',
          ],
        },
        {
          label: '运行期监测',
          items: [
            '健康度评分(百分制)',
            '隐患清单(红 / 黄 / 绿)',
            'DCGM Exporter 长期采集',
            '与上次审计趋势对比',
          ],
        },
      ]}
      products={[
        {
          icon: Building2,
          title: 'AIDC 项目验收测试',
          desc: '新建智算中心 / 大规模 GPU 服务器交付的端到端综合验收,合同 KPI 逐项对账。',
          href: '/solutions/acceptance',
          range: '8 万 – 250 万',
          tag: 'primary',
        },
        {
          icon: Stethoscope,
          title: '集群健康审计',
          desc: '已上线集群的周期性诊断与隐患识别,支持订阅化交付与长期趋势归档。',
          href: '/solutions/health-audit',
          range: '5 万 – 80 万 / 次',
        },
        {
          icon: FlaskConical,
          title: '模型质量评测(集群)',
          desc: '多机训练收敛对比、跨节点输出一致性、长上下文质量评测。',
          href: '/solutions/model-quality',
          range: '3 万 – 80 万',
        },
      ]}
    />
  );
}
