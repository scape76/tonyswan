"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import "@/styles/editor.css";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@tonyswan/ui";
import { Loader2 } from "@tonyswan/ui/icons";
import { trpc } from "@/app/_trpc/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "@/utils/schema/blog";
import * as z from "zod";
import { redirect } from "next/navigation";

type Inputs = z.infer<typeof blogSchema>;

const Editor = () => {
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [name, setName] = useState<string>("");

  const { isLoading, mutate } = trpc.blog.create.useMutation({
    onSuccess(data, variables, context) {
      redirect("/profile");
    },
  });

  const form = useForm<Inputs>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      name: "",
    },
  });

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const LinkTool = (await import("@editorjs/link")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "container",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  if (!isMounted) {
    return (
      <Loader2 className="w-24 h-24 md:w-32 md:h-32 animate-spin my-12 mx-auto animate-pulse" />
    );
  }

  const saveBlog = async ({ name }: Inputs) => {
    try {
      const body = await ref.current?.save();

      mutate({ name, body: JSON.stringify(body) });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(saveBlog)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Name your post..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div id="container" className="prose-stone mx-auto my-6" />
          <div className="flex w-full justify-end">
            <Button className="self-end" variant={"outline"} type="submit">
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export { Editor };
