import { prisma } from "@tonyswan/db";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { EditorRenderer } from "./Output";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params.postId),
    },
  });

  if (!post) notFound();

  return (
    <div className="wrapper px-6">
      <h1 className="text-3xl my-4">{post.name}</h1>
      <EditorRenderer body={JSON.parse(post.body as string)} />
    </div>
  );
}
