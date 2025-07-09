"use client";

import React, { useState, useEffect } from "react";
import { useSimpleTiptapEditor } from "@/lib/hooks/use-simple-tiptap-editor";
import { SimpleEditor } from "@/app/_components/simple-editor";
import { isContentEmpty } from "@/app/_components/tiptap-editor";

import DOMPurify from "dompurify";

export default function SimplePage() {
  const [content, setContent] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const { state: editorState } = useSimpleTiptapEditor({
    content,
    documentId: "simple-editor",
    onUpdate: setContent,
    editable: true,
    offline: true,
  });

  // const handleImageUpload = (imageUrl: string) => {
  //   setUploadedImage(imageUrl);
  // };

  // const handleImageRemove = () => {
  //   if (uploadedImage) {
  //     URL.revokeObjectURL(uploadedImage);
  //     setUploadedImage(null);
  //   }
  // };

  // const handlePresetChange = (preset: string) => {
  //   setSelectedPreset(preset);
  // };

  // const handlePreviewClose = (open: boolean) => {
  //   if (!open) {
  //     setShowImagePreview(false);
  //     if (generatedImageUrl) {
  //       URL.revokeObjectURL(generatedImageUrl);
  //     }
  //     setGeneratedImageUrl(null);
  //   }
  // };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  if (!editorState.editor) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading editor...</div>
      </div>
    );
  }

  const isEmpty = isContentEmpty(content);

  const cleanContent = DOMPurify.sanitize(content);

  console.log(cleanContent);

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* Header */}

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-[1000px] px-4 py-6 sm:px-8 lg:px-12">
          {/* Simple Editor */}
          <SimpleEditor editor={editorState.editor} />
          <div
            className="editor-content"
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          ></div>
        </div>
      </main>
      <footer className="py-8" />
    </div>
  );
}
