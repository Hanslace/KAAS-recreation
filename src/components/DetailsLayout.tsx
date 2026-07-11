'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';

import BackButton from '@/components/ui/BackButton';
import BrandButton from '@/components/ui/BrandButton';
import BrandPill from '@/components/ui/BrandPill';
import ReasonModal from '@/components/shared/ReasonModal';
import { useRouter } from 'next/navigation';

type ReasonAction = 'block' | 'cancel' | null;

interface DetailsLayoutProps {
  slugName: string;
  status: string;
  companyName: string;
  email: string;
  phone: string;
  logoSrc: string;
  logoAlt?: string;
  children: ReactNode;
  manager?: boolean;
}

export default function DetailsLayout({
  slugName,
  status,
  companyName,
  email,
  phone,
  logoSrc,
  logoAlt,
  children,
  manager = false,

}: DetailsLayoutProps) {
     const router = useRouter();
  const [reasonAction, setReasonAction] = useState<ReasonAction>(null);

  const headingId = `${slugName}-personal-info`;

  const handleReasonSubmit = async (reason: string) => {


    setReasonAction(null);
    router.back()
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-10 sm:flex-row">
        <BackButton>Details</BackButton>

        {status === 'Pending' && (
          <div className="ml-auto flex w-fit gap-5">
            <BrandButton onClick={() => router.back()}>
              Approve
            </BrandButton>

            <BrandButton
              type="button"
              onClick={() => setReasonAction('cancel')}
              className="bg-black"
            >
              Cancel
            </BrandButton>
          </div>
        )}

        {status === 'Approved' && (
          <div className="ml-auto flex w-fit gap-5">
            <BrandButton
              type="button"
              onClick={() => setReasonAction('block')}
            >
              Block
            </BrandButton>

            {manager && (
              <BrandButton
                href={`/pilot-car-management/managers/${slugName}/escorts`}
                className="bg-black"
              >
                View Escorts
              </BrandButton>
            )}
          </div>
        )}
      </div>

      <section
        aria-labelledby={headingId}
        className="mt-[1.5rem] h-full w-full space-y-10 overflow-y-auto rounded-2xl p-[1.5rem] shadow-lg xl:h-[calc(80vh-11rem)]"
      >
        <div className="flex items-center justify-between gap-4">
          <h2
            id={headingId}
            className="text-[1rem] xs:text-[1.5rem] sm:text-[1.75rem] font-bold tracking-tight text-black"
          >
            Personal Info
          </h2>

          <BrandPill>{status}</BrandPill>
        </div>

        <div className="relative flex flex-col items-center sm:items-start sm:flex-row gap-4 pb-[1.5rem] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-gray-100">
          <div className="flex h-[6rem] w-[6rem] shrink-0 items-center justify-center overflow-hidden rounded-full">
            <Image
              src={logoSrc}
              alt={logoAlt ?? companyName}
              width={96}
              height={96}
              priority
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex min-w-0  items-center sm:items-start  flex-col justify-center gap-1">
            <h3 className="truncate text-[1.75rem] font-bold tracking-tight text-black">
              {companyName}
            </h3>

            <p className="break-all tracking-tight text-black/50">
              {email}
            </p>

            <p className="tracking-tight text-black/50">
              {phone}
            </p>
          </div>
        </div>

        {children}
      </section>

      <ReasonModal
        open={reasonAction !== null}
        onClose={() => setReasonAction(null) }
        onSubmit={handleReasonSubmit}

      />
    </>
  );
}