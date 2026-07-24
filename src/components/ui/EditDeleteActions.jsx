import { Icon } from "@iconify/react";

export default function EditDeleteActions({ onEdit, onDelete, label = "item" }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDelete}
        aria-label={`Delete ${label}`}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white transition duration-200 hover:scale-110 active:scale-95"
      >
        <Icon icon="lucide:trash-2" className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={onEdit}
        aria-label={`Edit ${label}`}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white transition duration-200 hover:scale-110 active:scale-95"
      >
        <Icon icon="lucide:pencil" className="h-4 w-4" />
      </button>
    </div>
  );
}
