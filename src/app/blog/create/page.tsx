import { Editor } from "./Editor";

export default function CreateBlogPage() {
  return (
    <main className="wrapper max-w-[650px] px-4 mb-12">
      <h1 className="my-6 text-2xl md:text-3xl">
        Create your post
      </h1>
      <Editor />
    </main>
  );
}
