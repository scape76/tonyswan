import { auth } from "@/utils/auth/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@tonyswan/ui";
import { notFound } from "next/navigation";
import { UserAvatar } from "./UserAvatar";
import { getBetterGoogleImage } from "@/utils/getBetterGoogleImage";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) notFound();

  const { user } = session;

  console.log(user);

  return (
    <main className="container max-w-[840px]">
      <div className="flex gap-6 items-center">
        {user.image && (
          <Image
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
        <h1 className="text-3xl text-center mt-4">Your blog</h1>
      </section>
    </main>
  );
}
