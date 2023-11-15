"use client";

import { trpc } from "@/app/_trpc/client";
import Link from "next/link";

const UserBlogList = () => {
  const { data } = trpc.blog.getUserPosts.useQuery();

  return (
    <div className="mt-6 flex flex-col w-full gap-4">
      {data?.map(({ name, id }) => (
        <Link href={`/blog/${id}`} key={id}>
          <div className="px-6 py-4 border border-border w-full rounded-md cursor-pointer hover:bg-accent">
            {name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export { UserBlogList };
