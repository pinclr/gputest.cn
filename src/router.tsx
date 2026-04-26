import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { SelfServePage } from '@/pages/SelfServePage';
import { AcceptancePage } from '@/pages/solutions/AcceptancePage';
import { HealthAuditPage } from '@/pages/solutions/HealthAuditPage';
import { ModelQualityPage } from '@/pages/solutions/ModelQualityPage';
import { SingleNodePage } from '@/pages/solutions/SingleNodePage';
import { DomesticGpuPage } from '@/pages/solutions/DomesticGpuPage';
import { NetworkTestingPage } from '@/pages/solutions/NetworkTestingPage';
import { StorageTestingPage } from '@/pages/solutions/StorageTestingPage';
import { SecurityTestingPage } from '@/pages/solutions/SecurityTestingPage';
import { NodeTestingHub } from '@/pages/testing/NodeTestingHub';
import { ClusterTestingHub } from '@/pages/testing/ClusterTestingHub';
import { PlatformTestingHub } from '@/pages/testing/PlatformTestingHub';
import { MethodologyPage } from '@/pages/MethodologyPage';
import { CasesPage } from '@/pages/CasesPage';
import { PublishedResultsPage } from '@/pages/PublishedResultsPage';
import { ResourcesPage } from '@/pages/ResourcesPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// 文章页用 markdown / 代码高亮库较重,首屏不需要,懒加载
const ArticlesListPage = lazy(() =>
  import('@/pages/ArticlesListPage').then((m) => ({ default: m.ArticlesListPage })),
);
const ArticleDetailPage = lazy(() =>
  import('@/pages/ArticleDetailPage').then((m) => ({ default: m.ArticleDetailPage })),
);

// Admin 后台只对内部使用,严格懒加载
const AdminGate = lazy(() =>
  import('@/pages/admin/AdminGate').then((m) => ({ default: m.AdminGate })),
);
const AdminLayout = lazy(() =>
  import('@/pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })),
);
const AdminLoginPage = lazy(() =>
  import('@/pages/admin/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage })),
);
const AdminArticlesPage = lazy(() =>
  import('@/pages/admin/AdminArticlesPage').then((m) => ({ default: m.AdminArticlesPage })),
);
const AdminArticleDetailPage = lazy(() =>
  import('@/pages/admin/AdminArticleDetailPage').then((m) => ({
    default: m.AdminArticleDetailPage,
  })),
);

function PageFallback() {
  return (
    <div className="container-x py-22">
      <div className="surface grid place-items-center p-12">
        <div className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
          loading…
        </div>
      </div>
    </div>
  );
}

const lazyWrap = (el: React.ReactNode) => (
  <Suspense fallback={<PageFallback />}>{el}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'self-serve', element: <SelfServePage /> },
      {
        path: 'solutions',
        children: [
          { path: 'acceptance', element: <AcceptancePage /> },
          { path: 'health-audit', element: <HealthAuditPage /> },
          { path: 'model-quality', element: <ModelQualityPage /> },
          { path: 'single-node', element: <SingleNodePage /> },
          { path: 'network-testing', element: <NetworkTestingPage /> },
          { path: 'storage-testing', element: <StorageTestingPage /> },
          { path: 'security-testing', element: <SecurityTestingPage /> },
          { path: 'domestic-gpu', element: <DomesticGpuPage /> },
        ],
      },
      // 测试分类一级菜单 hub
      {
        path: 'testing',
        children: [
          { path: 'node', element: <NodeTestingHub /> },
          { path: 'cluster', element: <ClusterTestingHub /> },
          { path: 'network', element: <NetworkTestingPage /> },
          { path: 'storage', element: <StorageTestingPage /> },
          { path: 'platform', element: <PlatformTestingHub /> },
        ],
      },
      { path: 'methodology', element: <MethodologyPage /> },
      { path: 'cases', element: <CasesPage /> },
      { path: 'published', element: <PublishedResultsPage /> },
      { path: 'resources', element: <ResourcesPage /> },
      { path: 'articles', element: lazyWrap(<ArticlesListPage />) },
      { path: 'articles/:slug', element: lazyWrap(<ArticleDetailPage />) },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  // Admin 区域:不走主站 RootLayout
  {
    path: '/admin/login',
    element: lazyWrap(<AdminLoginPage />),
  },
  {
    path: '/admin',
    element: lazyWrap(
      <AdminGate>
        <AdminLayout />
      </AdminGate>,
    ),
    children: [
      { index: true, element: lazyWrap(<AdminArticlesPage />) },
      { path: 'articles', element: lazyWrap(<AdminArticlesPage />) },
      { path: 'articles/:slug', element: lazyWrap(<AdminArticleDetailPage />) },
    ],
  },
]);
