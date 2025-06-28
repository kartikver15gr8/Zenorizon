import { Editor } from "@tiptap/react";

export interface TiptapEditorState {
  editor: Editor | null;
  isReady: boolean;
}

export interface TiptapEditorActions {
  setContent: (content: string) => void;
}

export interface UseTiptapEditorReturn {
  state: TiptapEditorState;
  actions: TiptapEditorActions;
}

export interface TiptapEditorOptions {
  content: string;
  documentId: string;
  editable?: boolean;
  offline?: boolean;
  onUpdate?: (html: string) => void;
  onSelectionUpdate?: (editor: Editor) => void;
  onAccept?: (editor: Editor) => void;
  onReject?: (editor: Editor) => void;
}
