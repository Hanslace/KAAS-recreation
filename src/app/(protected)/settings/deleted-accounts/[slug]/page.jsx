'use client';

import { useState } from 'react';
import BackButton from '@/components/ui/BackButton';
import BrandPill from '@/components/ui/BrandPill';
import ConfirmationModal from '@/components/shared/ConfirmationModal';
import InfoGrid from '@/components/shared/InfoGrid';

import deletedAccountsData from '@/data/deleted-accounts.json';
import DocumentsSection from '@/components/shared/DocumentsSection';
import { useNavigate, useParams } from 'react-router';
import NotFound from '@/components/ui/NotFound';

export default function DeletedAccountDetailsPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [restoreModalOpen, setRestoreModalOpen] = useState(false);

  const currentAccount = deletedAccountsData.tableData.find(
    (item) => item.slug === params.slug,
  );

  if (!currentAccount) {
    return(<NotFound/>);
  }

  const isAbcLogistics = currentAccount.slug.startsWith(
    'abc-logistics-llc',
  );

  const isPatriotEscort = currentAccount.slug.startsWith(
    'patriot-escort-services',
  );

  const handleRestore = () => {
    setRestoreModalOpen(false);


    navigate('/settings/deleted-accounts');
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
          className="brand-button flex  items-center justify-center rounded-md bg-brand-gradient py-3 px-11  font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          Restore
        </button>
      </div>

      <div className="space-y-3 details-layout w-full overflow-y-auto rounded-2xl bg-white p-4 shadow-lg">
        {/* Personal information heading */}
        <div className="flex items-start justify-between gap-4">
          <h2 className="main-heading font-bold tracking-tight text-black">
            Personal Info
          </h2>

          <BrandPill>{currentAccount.status}</BrandPill>
        </div>

        {/* Profile */}
        <div className="relative flex flex-col items-center sm:items-start sm:flex-row gap-3 pb-3 after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-gray-100">
          <div className="flex h-[5em] w-[5em] shrink-0 items-center justify-center overflow-hidden rounded-full">
            <img
              src={currentAccount.logo || '/images/company-logo.png'}
              alt={
                currentAccount.companyName ||
                currentAccount.name
              }
              width={120}
              height={120}
              fetchPriority='high'
              className="h-full w-full rounded-full object-contain"
            />
          </div>

          <div className="flex min-w-0  items-center sm:items-start flex-col justify-center ">
            <h3 className="truncate main-heading font-bold tracking-tight text-black">
              {currentAccount.companyName}
            </h3>

            <p className="truncate tracking-tight text-black/50">
              {currentAccount.email}
            </p>

            <p className="tracking-tight text-black/50">
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
        icon="fa7-solid:trash-restore"
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