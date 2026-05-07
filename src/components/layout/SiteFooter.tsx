import { Link } from 'react-router-dom';
import { BrandMark } from '@/components/BrandMark';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg-surface">
      <div className="container-x grid gap-10 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-sm">
            <BrandMark size={28} className="text-accent-amber" />
            <span className="font-semibold">GPUTest · 核芯</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-ink-muted">
            核验每一颗芯。
            <br />
            GPU 集群测试与验收。
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-ink">解决方案</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>
              <Link to="/solutions/acceptance" className="hover:text-ink">
                AIDC 项目验收综合测试
              </Link>
            </li>
            <li>
              <Link to="/solutions/health-audit" className="hover:text-ink">
                GPU 集群健康审计
              </Link>
            </li>
            <li>
              <Link to="/solutions/model-quality" className="hover:text-ink">
                模型质量评测
              </Link>
            </li>
            <li>
              <Link to="/solutions/network-testing" className="hover:text-ink">
                IB / RoCE 网络测试
              </Link>
            </li>
            <li>
              <Link to="/solutions/storage-testing" className="hover:text-ink">
                智算存储测试
              </Link>
            </li>
            <li>
              <Link to="/solutions/security-testing" className="hover:text-ink">
                安全与合规测试
              </Link>
            </li>
            <li>
              <Link to="/solutions/single-node" className="hover:text-ink">
                单机批量测试
              </Link>
            </li>
            <li>
              <Link to="/solutions/domestic-gpu" className="hover:text-ink">
                国产卡专项
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-ink">资源</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>
              <Link to="/methodology" className="hover:text-ink">
                方法学与测试体系
              </Link>
            </li>
            <li>
              <Link to="/articles" className="hover:text-ink">
                技术文章
              </Link>
            </li>
            <li>
              <Link to="/cases" className="hover:text-ink">
                客户案例
              </Link>
            </li>
            <li>
              <Link to="/published" className="hover:text-ink">
                公开测试结果
              </Link>
            </li>
            <li>
              <Link to="/resources" className="hover:text-ink">
                白皮书与样例报告
              </Link>
            </li>
            <li>
              <Link to="/self-serve" className="hover:text-ink">
                免费自测 + 50 元解读
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-ink">联系</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>
              <Link to="/contact" className="hover:text-ink">
                项目咨询
              </Link>
            </li>
            <li>邮箱：sales@gputest.cn</li>
            <li>公众号：GPUTest 核芯</li>
            <li>视频号：GPUTest 核芯</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <div className="grid h-16 w-16 place-items-center rounded border border-border bg-bg text-[10px] text-ink-dim">
              公众号
            </div>
            <div className="grid h-16 w-16 place-items-center rounded border border-border bg-bg text-[10px] text-ink-dim">
              企微
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-ink-dim md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} 北京品晰科技有限公司 · GPUTest 核芯</div>
          <div className="flex gap-4">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink"
            >
              京ICP备2021037485号-6
            </a>
            <span>gputest.cn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
