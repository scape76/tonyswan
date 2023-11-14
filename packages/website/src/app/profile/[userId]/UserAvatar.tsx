"use client";

import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@tonyswan/ui";
import Image from "next/image";

const UserAvatar = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <Image
      src={imageUrl}
      alt="logo"
      width={120}
      height={120}
      className="my-4 rounded-full"
    />
  );
};

export { UserAvatar };
