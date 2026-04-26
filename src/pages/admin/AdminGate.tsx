import { useEffect, useState, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthed } from '@/lib/adminAuth';

/**
 * Admin 路由守卫:未登录跳转 /admin/login,登录后渲染 children。
 * 用 state(location.pathname)记住来源,登录成功后跳回。
 */
export function AdminGate({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [authed, setAuthed] = useState(() => isAuthed());

  useEffect(() => {
    setAuthed(isAuthed());
  }, [location.pathname]);

  if (!authed) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}
