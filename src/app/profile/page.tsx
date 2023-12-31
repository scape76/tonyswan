import { auth } from "@/lib/auth/auth";
import { buttonVariants } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { UserAvatar } from "@/components/UserAvatar";
import { getBetterGoogleImage } from "@/utils/getBetterGoogleImage";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { UserBlogList } from "./UserBlogList";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) notFound();

  const { user } = session;

  return (
    <div className="px-6">
      <div className="flex gap-6 items-center my-4">
        {user.image && (
          <UserAvatar
            src={getBetterGoogleImage(user.image)}
            alt="logo"
            width={100}
            height={100}
            className="rounded-full"
          />
        )}
        <div className="flex flex-col">
          <p className="text-lg md:text-2xl">{user.name}</p>
        </div>
      </div>
      <hr className="border border-b border-border" />
      <section>
        <div className="flex items-center justify-between my-4">
          <h1 className="text-3xl text-center inline-block">Your blog</h1>
          <Link
            href="/blog/create"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create post
          </Link>
        </div>
        <UserBlogList />
      </section>
    </div>
  );
}
