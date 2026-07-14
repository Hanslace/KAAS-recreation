import AttachmentImage from '@/components/ui/AttachmentImage';

export default function DocumentsSection() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-8 border-b border-gray-100 pb-8 md:grid-cols-[1fr_2fr_2fr] xl:grid-cols-4">
      <div>
        <h3 className="mb-4 text-[1.25rem] font-bold tracking-tight text-black">
          Insurance:
        </h3>

        <div className="flex flex-wrap items-start gap-4">
          <AttachmentImage
            src="/images/liability-doc.jpg"
            alt="Insurance document"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-[1.25rem] font-bold tracking-tight text-black">
          License:
        </h3>

        <div className="flex flex-wrap items-start justify-between gap-4 sm:justify-start">
          <AttachmentImage
            src="/images/id-front.jpg"
            alt="Driver license front"
          />

          <AttachmentImage
            src="/images/id-back.jpg"
            alt="Driver license back"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-[1.25rem] font-bold tracking-tight text-black">
          Certificate:
        </h3>

        <div className="flex flex-wrap items-start justify-between gap-4 sm:justify-start">
          <AttachmentImage
            src="/images/permit-1.jpg"
            alt="Carrier certificate"
          />

          <AttachmentImage
            src="/images/permit-2.jpg"
            alt="Training certificate"
          />
        </div>
      </div>
    </div>
  );
}