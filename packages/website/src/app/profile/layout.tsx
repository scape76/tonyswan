import { Button } from "@tonyswan/ui";
import type { PropsWithChildren } from "react";
import { GoBackButton } from "./GoBackButton";

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="wrapper relative">
        <div className="absolute -left-36">
          <GoBackButton variant={"outline"} />
        </div>
        {children}
      </main>
    </>
  );
}
