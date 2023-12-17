import { Header } from "@/components/Header";
import { auth } from "@/utils/auth/auth";
import React from "react";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Header user={session?.user} />
      <main className="container py-6">
        <h1 className="text-4xl md:text-6xl text-center">Coming soon...</h1>
      </main>
    </>
  );
}
