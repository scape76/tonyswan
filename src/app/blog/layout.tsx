import { type PropsWithChildren } from "react";
import { Header } from "@/components/Header";
import { auth } from "@/lib/auth/auth";

export default async function BlogLayout({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <>
      <Header user={session?.user} />
      {children}
    </>
  );
}
