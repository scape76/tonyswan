import { AppRoutes } from "@/common/routes";
import { buttonVariants } from "@tonyswan/ui";
import { cn } from "@tonyswan/utils";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="flex container p-4 px-8 items-center justify-between">
        <Link href={AppRoutes.HOME}>Tonyswan</Link>
        <Link
          href={AppRoutes.LOGIN}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          Login
        </Link>
      </header>
    </>
  );
}
