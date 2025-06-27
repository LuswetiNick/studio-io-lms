"use client";

import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { Loader } from "lucide-react";
import { toast } from "sonner";
const GoogleAuthBtn = () => {
  const [loading, startTransition] = useTransition();
  const googleSignIn = async () => {
    startTransition(async () => {
      await authClient.signIn.social(
        {
          provider: "google",
          callbackURL: "/dashboard",
        },
        {
          onSuccess: () => {
            toast.success("Login successful. Happy Learning!");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    });
  };
  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={loading}
      onClick={googleSignIn}
    >
      {loading ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <Image src="/google.svg" alt="Google" width={16} height={16} />
          Continue with Google
        </>
      )}
    </Button>
  );
};
export default GoogleAuthBtn;
