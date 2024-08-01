import Router from "next/router";
import { useEffect, useState } from "react";
import { User } from "@/types/User";

export default function useUser({ redirectTo = "" } = {}) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
          if (redirectTo) {
            Router.push(redirectTo);
          }
        }
      } catch (error) {
        setError(error as Error);
        if (redirectTo) {
          Router.push(redirectTo);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [redirectTo]);

  return { user, isLoading, error };
}
