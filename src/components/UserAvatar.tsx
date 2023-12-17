"use client";

import Image, { ImageProps } from "next/image";

interface UserAvatarProps extends ImageProps {}

const UserAvatar = ({ src, alt = "", ...props }: ImageProps) => {
  return (
    <Image
      src={src}
      width={120}
      height={120}
      className="my-4 rounded-full"
      alt={alt}
      {...props}
    />
  );
};

export { UserAvatar };
