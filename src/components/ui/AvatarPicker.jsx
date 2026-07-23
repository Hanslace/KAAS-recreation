import { useState } from "react";
import { Icon } from "@iconify/react";

export default function AvatarPicker({ onChange }) {
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
      onChange?.(file);
    }
  };

  return (
    <div className="avatar-picker flex  mb-6">
      <label className="relative cursor-pointer">
        <div className="w-[6em] h-[6em] rounded-full bg-brand flex items-center justify-center overflow-hidden">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon icon="pepicons-pencil:person" className="w-[3em] h-[3em] text-white" />
          )}
        </div>
        <span className="absolute bottom-0 right-0 w-[2em] h-[2em] rounded-full bg-brand border-2 border-white flex items-center justify-center">
          <Icon icon="mdi:camera" className="w-[1em] h-[1em] text-white" />
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </label>
    </div>
  );
}