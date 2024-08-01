import { useRouter } from "next/router";
import { useEffect } from "react";
import useUser from "@/hooks/useUser";
import { ComponentType, PropsWithChildren } from "react";

interface WithRoleGuardProps {
  requiredRoles: string[];
  fallbackUrl?: string;
}

export function withRoleGuard<P extends PropsWithChildren<{}>>(
  WrappedComponent: ComponentType<P>,
  { requiredRoles, fallbackUrl = "/" }: WithRoleGuardProps
) {
  return function RoleGuardedComponent(props: P) {
    const { user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && user) {
        const hasRequiredRole = requiredRoles.includes(user.role);
        if (!hasRequiredRole) {
          router.push(fallbackUrl);
        }
      }
    }, [user, isLoading, requiredRoles, router, fallbackUrl]);

    if (isLoading || !user || !requiredRoles.includes(user.role)) {
      return null; // or a loading spinner, etc.
    }

    return <WrappedComponent {...props} />;
  };
}
