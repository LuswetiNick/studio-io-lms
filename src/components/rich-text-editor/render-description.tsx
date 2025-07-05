"use client";

import TextAlign from "@tiptap/extension-text-align";
import { type JSONContent } from "@tiptap/react";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import parse from "html-react-parser";
import { useMemo } from "react";

export function RenderDescription({ json }: { json: JSONContent }) {
  const output = useMemo(() => {
    return generateHTML(json, [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ]);
  }, [json]);

  return (
    <div className="prose prose-li:marker:text-primary dark:prose-invert">
      {parse(output)}
    </div>
  );
}
