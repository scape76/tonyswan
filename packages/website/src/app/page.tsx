import { AppRoutes } from "@/common/routes";
import { Button, buttonVariants } from "@tonyswan/ui";
import { cn } from "@tonyswan/utils";
import Link from "next/link";
import { auth } from "@/utils/auth/auth";
import { UserMenu } from "@/components/UserMenu";
import { LogoutButton } from "@/components/LogoutButton";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <header className="flex container p-4 px-8 items-center justify-between">
        <Link href={AppRoutes.HOME}>Tonyswan</Link>
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Link
            href={AppRoutes.LOGIN}
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            Login
          </Link>
        )}
      </header>
      <hr className="w-full border border-b border-border" />
      <main className="container py-6">
        <h1 className="text-4xl md:text-6xl text-center">Coming soon...</h1>
      </main>
    </>
  );
}
