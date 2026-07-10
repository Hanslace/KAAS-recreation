'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import BrandPill from '@/components/ui/BrandPill';
import ConfirmationModal from '@/components/shared/ConfirmationModal';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import deletedAccountsData from '@/data/deleted-accounts.json';
import { notFound } from 'next/navigation';

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="relative py-[1.25rem] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray-100">
      <p className="text-[0.95rem] font-bold tracking-tight text-black">
        {label}
      </p>
      <p className="mt-1 text-[0.9rem] tracking-tight text-brand">
        {value}
      </p>
    </div>
  );
}

export default function DeletedAccountDetailsPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();

  const [restoreModalOpen, setRestoreModalOpen] = useState(false);

  const currentAccount = deletedAccountsData.tableData.find(
    (item) => item.slug === params.slug
  );

  if (!currentAccount) {
    notFound();
  }

  const handleRestore = () => {
    setRestoreModalOpen(false);

    // Later you can call restore API here
    // await restoreAccount(currentAccount.id)

    router.push('/settings/deleted-accounts');
  };

  const detailFields = [
    {
      label: 'Country',
      value: currentAccount.country || 'United State',
    },
    {
      label: 'State',
      value: currentAccount.state || 'California',
    },
    {
      label: 'City',
      value: currentAccount.city || 'Los Angeles',
    },
    {
      label: 'Address',
      value: currentAccount.address,
    },
  ];

  return (
    <>
      <div className="flex  gap-5 items-center justify-between">
        <BackButton href="/settings/deleted-accounts">
          Details
        </BackButton>

          <button
            type="button"
            onClick={() => setRestoreModalOpen(true)}
            className="flex max-w-fit text-[0.875rem] aspect-[3/1] p-[1rem] md:text-[1rem] md:aspect-[5/1] md:p-[1.35rem] w-full items-center justify-center rounded-xl bg-brand-gradient  tracking-wide font-bold text-white shadow-md transition duration-300 "
          >
            Restore
          </button>
   
      </div>

      <div className="mt-[1.5rem] h-full min-h-[32rem] w-full overflow-y-auto rounded-2xl bg-white p-[1.5rem] shadow-lg xl:h-[calc(80vh-11rem)]">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-[1.5rem] font-bold tracking-tight text-black lg:text-[1.75rem]">
            Personal Info
          </h2>

          <BrandPill>
            {currentAccount.status}
          </BrandPill>
        </div>

        <div className="relative flex items-center gap-4 py-[1.5rem] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-gray-100">
          <div className="flex h-[5rem] w-[5rem] shrink-0 items-center justify-center overflow-hidden rounded-full bg-black">
            <Image
              src={currentAccount.logo || '/images/company-logo.png'}
              alt={currentAccount.name}
              width={120}
              height={120}
              priority
              className="h-full w-full rounded-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <h3 className="text-[1.45rem] font-bold tracking-tight text-black lg:text-[1.75rem]">
              {currentAccount.companyName || 'ABC Logistics LLC'}
            </h3>

            <p className="mt-1 truncate text-[0.95rem] tracking-tight text-black/50">
              {currentAccount.email}
            </p>

            <p className="mt-1 text-[0.95rem] tracking-tight text-black/50">
              {currentAccount.phoneNumber}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {detailFields.map((field) => (
            <InfoRow
              key={field.label}
              label={field.label}
              value={field.value}
            />
          ))}
        </div>
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