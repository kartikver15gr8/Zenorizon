"use client";

import { EditorContent, Editor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { SimpleEditorMenuBar } from "./simple-editor-menu-bar";

import "../simple-editor.css";

interface SimpleEditorProps {
  className?: string;
  editor: Editor;
}

export function SimpleEditor({ className, editor }: SimpleEditorProps) {
  if (!editor) return null;

  const words = editor.storage.characterCount?.words() ?? 0;
  const characters = editor.storage.characterCount?.characters() ?? 0;

  return (
    <div className={cn("bg-background rounded-lg border shadow-sm", className)}>
      {/* Menu Bar */}
      <div className="border-border/40 border-b px-4 py-2">
        <SimpleEditorMenuBar editor={editor} />
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="simple-editor" />

      {/* Word Count Footer */}
      <div className="border-border/40 text-muted-foreground border-t px-4 py-2 text-sm">
        {words} words, {characters} characters
      </div>
    </div>
  );
}
