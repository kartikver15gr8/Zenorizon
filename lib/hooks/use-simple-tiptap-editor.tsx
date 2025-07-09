"use client";

import { useCallback, useEffect, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { cn } from "@/lib/utils";
import {
  UseTiptapEditorReturn,
  TiptapEditorOptions,
} from "@/types/editor-types";

export function useSimpleTiptapEditor(
  options: Pick<
    TiptapEditorOptions,
    "content" | "documentId" | "onUpdate" | "editable" | "offline"
  >
): UseTiptapEditorReturn {
  const [isReady, setIsReady] = useState(false);

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
        Underline,
        Highlight.configure({
          multicolor: true,
          HTMLAttributes: {
            class: "rounded px-0.5 -mx-0.5",
          },
        }),
        TextStyle,
        CharacterCount,
        Placeholder.configure({
          placeholder: "Start writing…",
          emptyEditorClass: "is-editor-empty",
          emptyNodeClass: "is-empty",
          showOnlyWhenEditable: true,
          showOnlyCurrent: true,
        }),
      ],
      content: options.content,
      autofocus: true,
      editorProps: {
        attributes: {
          class: cn(
            "editor-content focus:outline-none",
            "max-w-none p-4",
            "min-h-[400px] w-full"
          ),
          "data-dashlane-ignore": "true",
          "data-form-type": "other",
          "data-lpignore": "true",
          autocomplete: "off",
          role: "textbox",
          "aria-label": "Rich text editor",
        },
      },
      onUpdate: ({ editor }) => {
        options.onUpdate?.(editor.getHTML());
      },
      editable: options.editable,
      immediatelyRender: false,
    },
    [options.documentId]
  );

  useEffect(() => {
    if (editor) {
      setIsReady(true);
    }
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  const setContent = useCallback(
    (content: string) => {
      if (editor && editor.getHTML() !== content) {
        editor.commands.setContent(content);
      }
    },
    [editor]
  );

  return {
    state: {
      editor,
      isReady,
    },
    actions: {
      setContent,
    },
  };
}
