import { Icon } from '@iconify/react';
import React, { useState, DragEvent, ChangeEvent } from 'react';



export const UploadArea = ({
  iconPosition = 'top',
  CustomIcon,
  label = 'Upload Truck Photo',
  onFileSelect,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const iconName = "solar:upload-broken";

  // Handle drag states
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  // Process dropped files
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect?.(e.dataTransfer.files[0]);
    }
  };

  // Process clicked/selected files
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect?.(e.target.files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`
        relative w-full  upload-area px-6 py-4
        flex rounded-xl border border-dashed bg-white
        transition-all duration-200 cursor-pointer shadow-md
        ${isDragActive ? 'border-brand bg-brand/10 scale-[1.01]' : 'border-brand hover:bg-brand/5'}
        ${iconPosition === 'top' ? 'flex-col items-center justify-center gap-3' : 'flex-row items-center justify-center gap-4'}
      `}
    >
      {/* Hidden native input overlaying the container to handle clicks */}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />

      <Icon
        className={`text-brand w-7 h-7 stroke-[1.5] transition-transform ${isDragActive ? 'scale-110' : ''} ${iconPosition === 'right' ? 'order-last' : ''}`} 
        icon={iconName}
      />
      
      <span className="text-black/60 font-medium  select-none text-center">
        {isDragActive ? 'Drop your photo here' : label}
      </span>
    </div>
  );
};

export default UploadArea;
