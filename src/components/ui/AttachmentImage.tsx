import Image from 'next/image';

interface AttachmentImageProps {
  src: string;
  alt: string;
}

export default function AttachmentImage({
  src,
  alt,
}: AttachmentImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={130}
      height={105}
      className="h-[7rem] min-h-[6rem] w-[6rem] min-w-[5rem] rounded-lg object-contain shadow-md"
    />
  );
}