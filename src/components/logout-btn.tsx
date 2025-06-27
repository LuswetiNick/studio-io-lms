"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
export const LogoutBtn = () => {
  const router = useRouter();
  async function logout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  }
  return (
    <Button onClick={logout} variant="outline">
      Logout
    </Button>
  );
};
