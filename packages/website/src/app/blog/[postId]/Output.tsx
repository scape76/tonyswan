"use client";

import dynamic from "next/dynamic";
import edjsHTML from "editorjs-html";
import { useMemo } from "react";
import { type OutputData } from "@editorjs/editorjs";

const EditorRenderer = ({ body }: { body: OutputData }) => {
  const edjsParser = useMemo(() => edjsHTML(), [edjsHTML]);

  const html = useMemo(() => edjsParser.parse(body), [body]);
  
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export { EditorRenderer };
