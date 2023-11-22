"use client";

import { Button, ButtonProps } from "@tonyswan/ui";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "@tonyswan/ui/icons";

const GoBackButton = (props: ButtonProps) => {
  const router = useRouter();

  return (
    <Button {...props} onClick={() => router.back()}>
      <ArrowLeft className="w-4 h-4 mr-2" />
      Go Back
    </Button>
  );
};

export { GoBackButton };
