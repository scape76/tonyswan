import { auth } from "@/utils/auth/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  buttonVariants,
} from "@tonyswan/ui";
import { PlusIcon } from "@tonyswan/ui/icons";
import { notFound } from "next/navigation";
import { UserAvatar } from "../../../components/UserAvatar";
import { getBetterGoogleImage } from "@/utils/getBetterGoogleImage";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@tonyswan/utils";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) notFound();

  const { user } = session;

  console.log(user);

  return (
    <main className="wrapper">
      <div className="flex gap-6 items-center">
        {user.image && (
          <UserAvatar
            src={getBetterGoogleImage(user.image)}
            alt="logo"
            width={100}
            height={100}
            className="my-4 rounded-full"
          />
        )}
        <div className="flex flex-col">
          <p className="text-lg md:text-2xl">{user.name}</p>
        </div>
      </div>
      <hr className="border border-b border-border" />
      <section>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl text-center mt-4 inline-block">Your blog</h1>
          <Link
            href="/blog/create"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create post
          </Link>
        </div>
      </section>
    </main>
  );
}
