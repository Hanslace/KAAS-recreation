'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound, useParams, useRouter } from 'next/navigation';

import BackButton from '@/components/ui/BackButton';
import BrandPill from '@/components/ui/BrandPill';
import ConfirmationModal from '@/components/shared/ConfirmationModal';
import InfoGrid from '@/components/shared/InfoGrid';
import AttachmentImage from '@/components/ui/AttachmentImage';

import deletedAccountsData from '@/data/deleted-accounts.json';
import DocumentsSection from '@/components/shared/DocumentsSection';

export default function DeletedAccountDetailsPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();

  const [restoreModalOpen, setRestoreModalOpen] = useState(false);

  const currentAccount = deletedAccountsData.tableData.find(
    (item) => item.slug === params.slug,
  );

  if (!currentAccount) {
    notFound();
  }

  const isAbcLogistics = currentAccount.slug.startsWith(
    'abc-logistics-llc',
  );

  const isPatriotEscort = currentAccount.slug.startsWith(
    'patriot-escort-services',
  );

  const handleRestore = () => {
    setRestoreModalOpen(false);

    // Call the restore API here:
    // await restoreAccount(currentAccount.id);

    router.push('/settings/deleted-accounts');
  };

  return (
    <>
      <div className="flex items-center justify-between gap-5">
        <BackButton href="/settings/deleted-accounts">
          Details
        </BackButton>

        <button
          type="button"
          onClick={() => setRestoreModalOpen(true)}
          className="flex aspect-[3/1] w-full max-w-fit items-center justify-center rounded-xl bg-brand-gradient p-[1rem] text-[0.875rem] font-bold tracking-wide text-white shadow-md transition duration-300 md:aspect-[5/1] md:p-[1.35rem] md:text-[1rem]"
        >
          Restore
        </button>
      </div>

      <div className="mt-[1.5rem] h-full min-h-[32rem] w-full overflow-y-auto rounded-2xl bg-white p-[1.5rem] shadow-lg xl:h-[calc(80vh-11rem)]">
        {/* Personal information heading */}
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-[1.5rem] font-bold tracking-tight text-black lg:text-[1.75rem]">
            Personal Info
          </h2>

          <BrandPill>{currentAccount.status}</BrandPill>
        </div>

        {/* Profile */}
        <div className="relative flex items-center gap-4 py-[1.5rem] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-gray-100">
          <div className="flex h-[5rem] w-[5rem] shrink-0 items-center justify-center overflow-hidden rounded-full bg-black">
            <Image
              src={currentAccount.logo || '/images/company-logo.png'}
              alt={
                currentAccount.companyName ||
                currentAccount.name
              }
              width={120}
              height={120}
              priority
              className="h-full w-full rounded-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <h3 className="text-[1.45rem] font-bold tracking-tight text-black lg:text-[1.75rem]">
              {currentAccount.companyName}
            </h3>

            <p className="mt-1 truncate text-[0.95rem] tracking-tight text-black/50">
              {currentAccount.email}
            </p>

            <p className="mt-1 text-[0.95rem] tracking-tight text-black/50">
              {currentAccount.phoneNumber}
            </p>
          </div>
        </div>

        {/* ABC Logistics details */}
        {isPatriotEscort && (
          <div className="mt-6 space-y-8">
            <InfoGrid
              fields={[
                {
                  label: 'Country',
                  value:
                    currentAccount.country ||
                    'United States',
                },
                {
                  label: 'State',
                  value:
                    currentAccount.state || 'California',
                },
                {
                  label: 'City',
                  value:
                    currentAccount.city || 'Los Angeles',
                },
                {
                  label: 'Address',
                  value: currentAccount.address,
                },
              ]}
            />

            <InfoGrid
              heading="Company Info"
              fields={[
                {
                  label: 'MC Number',
                  value: currentAccount.mcNumber,
                },
                {
                  label: 'DOT Number',
                  value: '01234567',
                },
                {
                  label: 'License Plate Number',
                  value:
                    currentAccount.licensePlateNumber,
                },
              ]}
            />

            <DocumentsSection/>

            <InfoGrid
              heading="Fares Info"
              fields={[
                {
                  label: 'Per Day',
                  value: '$600',
                },
                {
                  label: 'Per Mile',
                  value: '$2.5',
                },
                {
                  label: 'Overnight',
                  value: '$800',
                },
                {
                  label: 'Custom',
                  value: '$200',
                },
              ]}
            />
          </div>
        )}

        {/* Patriot Escort details */}
        {isAbcLogistics && (
          <div className="mt-6 space-y-8">
            <InfoGrid
              fields={[
                { label: 'Country', value: currentAccount.country || 'United State', }, { label: 'State', value: currentAccount.state || 'California', }, { label: 'City', value: currentAccount.city || 'Los Angeles', }, { label: 'Address', value: currentAccount.address, },
              ]}
            />

         
          </div>
        )}
      </div>

      <ConfirmationModal
        open={restoreModalOpen}
        icon="solar:refresh-bold"
        title="Restore!"
        description="Are you sure you want to restore this account?"
        cancelText="No"
        confirmText="Yes"
        onCancel={() => setRestoreModalOpen(false)}
        onConfirm={handleRestore}
      />
    </>
  );
}