"use client";

import { trpc } from "@/app/_trpc/client";
import { Inbox, Loader2 } from "@tonyswan/ui/icons";
import Link from "next/link";

const UserBlogList = () => {
  const { data, isLoading } = trpc.blog.getUserPosts.useQuery();

  if (isLoading) {
    return <Loader2 className="w-24 h-24 mx-auto animate-spin" />;
  }

  return (
    <div className="mt-6 flex flex-col w-full gap-4">
      {!!data?.length ? (
        data.map(({ name, id }) => (
          <Link href={`/blog/${id}`} key={id}>
            <div className="px-6 py-4 border border-border w-full rounded-md cursor-pointer hover:bg-accent">
              {name}
            </div>
          </Link>
        ))
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <Inbox className="w-24 h-24 mx-auto text-muted-foreground" />
          <h2 className="text-xl text-muted-foreground">
            You don&apos;t have any posts yet.
          </h2>
        </div>
      )}
    </div>
  );
};

export { UserBlogList };
