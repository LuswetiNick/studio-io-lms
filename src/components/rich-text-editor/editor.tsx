"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";

const RichTextEditor = ({ field }: { field: any }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-lg dark:prose-invert min-h-[300px] w-full max-w-none p-4 border border-input border-t-0 rounded-md bg-input/30 focus:outline-none focus:ring-0 [&_p]:text-sm [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm [&_li]:text-sm [&_blockquote]:text-sm",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? (() => {
      try {
        return JSON.parse(field.value);
      } catch {
        // If it's not valid JSON, treat it as plain text
        return field.value;
      }
    })() : "",
  });

  return (
    <div className="w-full">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
