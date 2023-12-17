"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const GoBackButton = (props: ButtonProps) => {
  const router = useRouter();

  useEffect(() => {
    console.log("rendered");
  }, []);

  return (
    <Button {...props} onClick={() => router.back()}>
      <ArrowLeft className="w-4 h-4 mr-2" />
      Go Back
    </Button>
  );
};

export { GoBackButton };
