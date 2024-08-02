import Router, { useRouter } from "next/router";
import { useEffect, useState, ComponentType, PropsWithChildren } from "react";
import { User } from "@/types/User";

interface WithRoleGuardProps {
  requiredRoles: string[];
  fallbackUrl?: string;
  redirectTo?: string;
}

export function withRoleGuard<P extends PropsWithChildren<{}>>(
  WrappedComponent: ComponentType<P>,
  {
    requiredRoles,
    fallbackUrl = "/",
    redirectTo = "/login",
  }: WithRoleGuardProps
) {
  return function RoleGuardedComponent(props: P) {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const router = useRouter();

    useEffect(() => {
      const fetchUser = async () => {
        setIsLoading(true);
        try {
          const response = await fetch("/api/auth/user");
          const result = await response.json();
          if (result.success) {
            const user = {
              storecode: result.storecode || "",
              id: result.id || "",
              userName: result.userName || "",
              email: result.email || "",
              role: result.role || "",
            };
            setUser(user);
          } else {
            setUser(undefined);
            Router.push(redirectTo);
          }
        } catch (error) {
          setError(error as Error);
          Router.push(redirectTo);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUser();
    }, [redirectTo]);

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
