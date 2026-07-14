import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import BackButton from "@/components/ui/BackButton";





function ToolbarButton({
  children,
  disabled = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex border-black/10 bg-white  hover:border-brand hover:text-brand h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-medium transition  disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {children}
    </button>
  );
}

export default function SettingsContentEditor({
  slug,
  title,
  initialContent,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [savedContent, setSavedContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[420px] px-6 py-6 text-[1rem] leading-[1.9] text-black/55 outline-none sm:px-8 sm:text-[1.1rem] " +
          "[&_p]:mb-6 [&_p:last-child]:mb-0 " +
          "[&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-black " +
          "[&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-black " +
          "[&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-black " +
          "[&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 " +
          "[&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 " +
          "[&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand " +
          "[&_blockquote]:pl-4 [&_blockquote]:italic",
      },
    },
  });

  const handleEdit = () => {
    if (!editor) return;

    editor.commands.setContent(savedContent);
    editor.setEditable(true);
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (!editor) return;

    editor.commands.setContent(savedContent);
    editor.setEditable(false);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!editor) return;

    const updatedContent = editor.getHTML();

    try {
      setIsSaving(true);

      /*
       * Connect this request to your backend endpoint.
       *
       * const response = await fetch(`/api/settings-content/${slug}`, {
       *   method: "PATCH",
       *   headers: {
       *     "Content-Type": "application/json",
       *   },
       *   body: JSON.stringify({
       *     content: updatedContent,
       *   }),
       * });
       *
       * if (!response.ok) {
       *   throw new Error("Failed to update content.");
       * }
       */

      setSavedContent(updatedContent);
      editor.setEditable(false);
      setIsEditing(false);
    } catch (error) {
      console.error(`Failed to update ${slug}:`, error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!editor) {
    return null;
  }

  if (!isEditing && editor.isEditable) {
    editor.setEditable(false);
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <BackButton href="/settings">{title}</BackButton>

        {!isEditing ? (
          <button
            type="button"
            onClick={handleEdit}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-500 transition hover:scale-105 hover:bg-green-200"
            aria-label={`Edit ${title}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M16.862 3.487a1.875 1.875 0 0 1 2.651 2.651l-.776.776-2.651-2.651.776-.776ZM14.76 5.589 4.5 15.849V18.5h2.651l10.26-10.26-2.651-2.651Z" />
            </svg>
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="h-10 rounded-xl border border-black/10 bg-white px-5 text-sm font-medium text-black/60 transition hover:border-black/20 hover:text-black disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="h-10 rounded-xl bg-gradient-to-r from-brand to-brand-dark px-6 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      <div className="mt-7 overflow-hidden rounded-2xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
        {isEditing && (
          <div className="flex flex-wrap items-center gap-2 border-b border-black/10 bg-black/[0.02] p-3">
            <ToolbarButton
              active={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <strong>B</strong>
            </ToolbarButton>

            <ToolbarButton
              active={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <em>I</em>
            </ToolbarButton>

            <ToolbarButton
              active={editor.isActive("strike")}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <span className="line-through">S</span>
            </ToolbarButton>

            <span className="mx-1 h-6 w-px bg-black/10" />

            <ToolbarButton
              active={editor.isActive("paragraph")}
              onClick={() => editor.chain().focus().setParagraph().run()}
            >
              Paragraph
            </ToolbarButton>

            <ToolbarButton
              active={editor.isActive("heading", { level: 2 })}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              H2
            </ToolbarButton>

            <ToolbarButton
              active={editor.isActive("heading", { level: 3 })}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              H3
            </ToolbarButton>

            <span className="mx-1 h-6 w-px bg-black/10" />

            <ToolbarButton
              active={editor.isActive("bulletList")}
              onClick={() =>
                editor.chain().focus().toggleBulletList().run()
              }
            >
              Bullets
            </ToolbarButton>

            <ToolbarButton
              active={editor.isActive("orderedList")}
              onClick={() =>
                editor.chain().focus().toggleOrderedList().run()
              }
            >
              Numbered
            </ToolbarButton>

            <ToolbarButton
              active={editor.isActive("blockquote")}
              onClick={() =>
                editor.chain().focus().toggleBlockquote().run()
              }
            >
              Quote
            </ToolbarButton>

            <span className="mx-1 h-6 w-px bg-black/10" />

            <ToolbarButton
              disabled={!editor.can().chain().focus().undo().run()}
              onClick={() => editor.chain().focus().undo().run()}
            >
              Undo
            </ToolbarButton>

            <ToolbarButton
              disabled={!editor.can().chain().focus().redo().run()}
              onClick={() => editor.chain().focus().redo().run()}
            >
              Redo
            </ToolbarButton>
          </div>
        )}

        <div
          className={`max-h-[calc(100vh-13rem)] overflow-y-auto ${
            isEditing
              ? "ring-1 ring-inset ring-brand/30"
              : ""
          }`}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}