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
      className="h-[7rem] w-[6rem] rounded-lg object-contain shadow-md"
    />
  );
}