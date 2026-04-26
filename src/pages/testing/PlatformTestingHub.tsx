import { ShieldCheck, Container, Layers, Workflow } from 'lucide-react';
import { TestingHub } from '@/components/testing/TestingHub';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function PlatformTestingHub() {
  useDocumentTitle(
    '平台测试 · 编排 / 调度 / 多租户 / 安全合规',
    'Kubernetes 平台、GPU Operator、多租户调度、容器运行时、安全合规与等保对照测试。',
  );

  return (
    <TestingHub
      category="平台测试"
      categoryEn="Platform Testing"
      title="编排 · 调度 · 多租户 · 安全合规的平台层测试"
      desc="聚焦平台层:Kubernetes / GPU Operator / 多租户隔离 / 容器运行时 / 调度策略 / 安全合规。智算平台对外提供服务的可靠性与合规性核验。"
      tone="amber"
      scope={[
        {
          label: '编排与运行时',
          items: [
            'Kubernetes API 行为',
            'NVIDIA GPU Operator 配置正确性',
            '容器运行时 (containerd / Docker)',
            'CRI / CNI 兼容性',
          ],
        },
        {
          label: '调度与隔离',
          items: [
            'Volcano / Slurm 调度公平性',
            'MIG / vGPU 资源切分',
            '多租户命名空间隔离',
            'GPU 资源 QoS / 抢占',
          ],
        },
        {
          label: '安全与合规',
          items: [
            '等保 2.0 三级对照',
            'RBAC / IAM / SSO',
            '容器镜像漏洞与签名',
            '供应链 SBOM 审计',
          ],
        },
        {
          label: '可观测与运维',
          items: [
            'Prometheus / DCGM Exporter',
            '告警规则可靠性',
            '日志聚合与审计',
            '事件追踪与定位',
          ],
        },
      ]}
      products={[
        {
          icon: ShieldCheck,
          title: '安全与合规测试',
          desc: '等保 2.0 / 信创合规、网络隔离、漏洞扫描、GPU 多租户隔离、容器与供应链审计。',
          href: '/solutions/security-testing',
          range: '10 万 – 80 万',
          tag: 'primary',
        },
        {
          icon: Container,
          title: 'Kubernetes 平台测试',
          desc: 'K8s 控制面、GPU Operator、CRD / Webhook、调度公平性与资源 QoS 的端到端测试。',
          href: '/contact',
          range: '15 万 – 50 万',
          tag: 'coming',
        },
        {
          icon: Layers,
          title: '多租户隔离测试',
          desc: 'MIG / vGPU 切分、命名空间隔离、租户间数据残留、QoS 抢占公平性验证。',
          href: '/contact',
          range: '12 万 – 40 万',
          tag: 'coming',
        },
        {
          icon: Workflow,
          title: 'GPU 资源调度测试',
          desc: 'Volcano / Slurm 调度策略、抢占恢复、断点续训、Gang Scheduling 行为验证。',
          href: '/contact',
          range: '10 万 – 35 万',
          tag: 'coming',
        },
      ]}
    />
  );
}
