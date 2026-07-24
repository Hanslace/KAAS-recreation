"use client";

import { useState } from "react";
import { useNavigate } from "react-router";
import AttachmentImage from "@/components/ui/AttachmentImage";
import BackButton from "@/components/ui/BackButton";
import BrandButton from "@/components/ui/BrandButton";
import Input from "@/components/ui/Input";
import UploadArea from "@/components/ui/UploadArea";

export default function Page() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileSelect = (file) => {
    if (!file) return;
    setAttachments((prev) => [
      ...prev,
      { url: URL.createObjectURL(file), name: file.name },
    ]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => {
      const target = prev[index];
      if (target?.url) URL.revokeObjectURL(target.url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // TODO: wire up ticket submission
      navigate("/support");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-[2em] max-w-[35rem]">
      <BackButton>Create Ticket</BackButton>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[2em]">
        <Input
          label="Subject"
          placeholder="Enter Subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <Input
          as="textarea"
          label="Message"
          placeholder="Write a Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex flex-col gap-3">
          <h2 className="font-bold tracking-tight text-black">
            Attachments:
          </h2>

          <UploadArea label="Upload Images" iconPosition="left" onFileSelect={handleFileSelect} />

          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {attachments.map((attachment, index) => (
                <AttachmentImage
                  key={attachment.url}
                  src={attachment.url}
                  alt={attachment.name}
                  onRemove={() => removeAttachment(index)}
                />
              ))}
            </div>
          )}
        </div>

        <BrandButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </BrandButton>
      </form>
    </div>
  );
}
