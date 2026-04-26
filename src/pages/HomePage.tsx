import { Hero } from '@/components/home/Hero';
import { PillarsBand } from '@/components/home/PillarsBand';
import { FreeToolBand } from '@/components/home/FreeToolBand';
import { SolutionsBand } from '@/components/home/SolutionsBand';
import { CtaBand } from '@/components/home/CtaBand';
import { useDocumentTitle } from '@/lib/useDocumentTitle';

export function HomePage() {
  useDocumentTitle(
    'GPUTest · 核芯 — GPU 集群测试与验收',
    '稳定性 · 性能 · 模型质量,单机与集群两层级。AIDC 项目验收 / 集群健康审计 / 模型质量评测 / 单机批量测试。第三方独立、方法学公开。',
  );
  return (
    <>
      <Hero />
      <PillarsBand />
      <FreeToolBand />
      <SolutionsBand />
      <CtaBand />
    </>
  );
}
