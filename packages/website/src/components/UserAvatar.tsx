"use client";

import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@tonyswan/ui";
import Image, { ImageProps } from "next/image";

interface UserAvatarProps extends ImageProps {}

const UserAvatar = ({ src, ...props }: ImageProps) => {
  return (
    <Image
      src={src}
      width={120}
      height={120}
      className="my-4 rounded-full"
      {...props}
    />
  );
};

export { UserAvatar };
