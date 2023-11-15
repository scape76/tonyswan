"use client";

import dynamic from "next/dynamic";
let Output = dynamic(() => import("editorjs-react-renderer"), { ssr: false });

const EditorRenderer = ({ body }: { body: string }) => {
  return <Output data={body} />;
};

export { EditorRenderer };
