import React from 'react';
import { useLocation } from '@docusaurus/router';
import { useAuth, type UserRole } from '@site/src/contexts/AuthContext';
import { loginUrlWithReturnTo } from '@site/src/lib/authRedirect';

/**
 * Client-side gate for `/app/admin/*` pages (Spec 002, T042).
 *
 * ⚠️ COSMETIC ONLY (Constitution Art. IX.2). This component decides what to
 * *render*, nothing more — it has no bearing on what data the page can
 * actually fetch. A bug here degrades UX, not security: every admin query
 * still runs through RLS (`is_admin()`), which is the real enforcement point
 * and denies unauthorized reads/writes regardless of what this component does
 * or fails to do. Never treat passing this gate as proof of authorization.
 */
export default function AuthGuard({
  children,
  requireRole,
  requireVerifiedTeacher,
}: {
  children: React.ReactNode;
  requireRole?: UserRole | UserRole[];
  requireVerifiedTeacher?: boolean;
}): React.ReactElement {
  const location = useLocation();
  const { loading, session, role, verifiedTeacher } = useAuth();

  if (loading) return <p>Loading…</p>;

  if (!session) {
    if (typeof window !== 'undefined') {
      window.location.assign(loginUrlWithReturnTo(location.pathname, 'login'));
    }
    return <p>Redirecting to sign in…</p>;
  }

  const allowedRoles = requireRole
    ? Array.isArray(requireRole) ? requireRole : [requireRole]
    : null;
  const roleOk = !allowedRoles || (role !== null && allowedRoles.includes(role));
  const verifiedOk = !requireVerifiedTeacher || verifiedTeacher;

  if (!roleOk || !verifiedOk) {
    return (
      <div className="alert alert--danger" role="alert">
        <p>You don&apos;t have access to this page.</p>
      </div>
    );
  }

  return <>{children}</>;
}
