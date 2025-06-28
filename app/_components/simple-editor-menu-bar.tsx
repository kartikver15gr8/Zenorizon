"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Underline,
  List,
  ListOrdered,
  Quote,
  Highlighter,
  Check,
  X,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { HIGHLIGHT_COLORS } from "@/lib/constants";

interface SimpleEditorMenuBarProps {
  editor: Editor | null;
}

export function SimpleEditorMenuBar({ editor }: SimpleEditorMenuBarProps) {
  if (!editor) return null;

  return (
    <div className=" flex">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 3 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3 className="size-4" />
      </Toggle>

      <div className="bg-border/40 mx-1 h-4 w-px" />

      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className="size-4" />
      </Toggle>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Toggle
            size="sm"
            pressed={editor.isActive("highlight")}
            className="gap-2"
          >
            <Highlighter className="size-4" />
          </Toggle>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {HIGHLIGHT_COLORS.map(({ name, color }) => (
            <DropdownMenuItem
              key={color}
              onClick={() =>
                editor.chain().focus().toggleHighlight({ color }).run()
              }
              className="flex items-center gap-2"
            >
              <div
                className="size-4 rounded"
                style={{ backgroundColor: color }}
              />
              <span>{name}</span>
              {editor.isActive("highlight", { color }) && (
                <Check className="ml-auto size-4" />
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => editor.chain().focus().unsetHighlight().run()}
            className="flex items-center gap-2"
            disabled={!editor.can().unsetHighlight()}
          >
            <X className="size-4" />
            <span>Remove highlight</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="bg-border/40 mx-1 h-4 w-px" />

      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="size-4" />
      </Toggle>
    </div>
  );
}
