import type { PropsWithChildren } from "react";
import { GoBackButton } from "./GoBackButton";
import { Header } from "@/components/Header";
import { auth } from "@/lib/auth/auth";

export default async function ProfileLayout({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <>
      <Header user={session?.user} />
      <main className="wrapper relative">
        <div className="absolute -left-36">
          <GoBackButton variant={"outline"} />
        </div>
        {children}
      </main>
    </>
  );
}
