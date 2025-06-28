"use client";

// Helper to check if content is empty (handles empty paragraphs)
export const isContentEmpty = (content: string) => {
  return !content || content === "<p></p>" || content === "<p><br></p>";
};
