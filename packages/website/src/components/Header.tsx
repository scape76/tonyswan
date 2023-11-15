import { AppRoutes } from "@/common/routes";
import { User } from "next-auth";
import Link from "next/link";
import { UserMenu } from "./UserMenu";
import { ProfileNavigation } from "./ProfileNavigation";
import { buttonVariants } from "@tonyswan/ui";
import { cn } from "@tonyswan/utils";

const Header = ({ user }: { user?: User }) => {
  return (
    <>
      <header className="flex container p-4 px-4 md:px-8 items-center justify-between">
        <Link href={AppRoutes.HOME}>Tonyswan</Link>
        {user ? (
          <div className="flex items-center gap-2">
            <UserMenu user={user} />
            <ProfileNavigation user={user} />
          </div>
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
    </>
  );
};

export { Header };
