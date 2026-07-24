import { Icon } from "@iconify/react";

export default function EditButton({ onEdit, label = "item" }) {
  return (
    <button
      type="button"
      onClick={onEdit}
      aria-label={`Edit ${label}`}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white transition duration-200 hover:scale-110 active:scale-95"
    >
      <Icon icon="lucide:pencil" className="h-4 w-4" />
    </button>
  );
}
