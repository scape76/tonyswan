"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

const LoginButton = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      return signIn("google", { callbackUrl: "/" });
    },
  });
  return (
    <Button
      variant={"outline"}
      className="w-full"
      onClick={() => mutate()}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Icons.google className="mr-2" />
      )}
      Google
    </Button>
  );
};

export { LoginButton };
