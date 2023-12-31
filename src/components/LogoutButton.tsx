"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      variant="destructive"
      onClick={() => {
        signOut();
      }}
      {...props}
    >
      Logout
    </Button>
  );
};

export { LogoutButton };
