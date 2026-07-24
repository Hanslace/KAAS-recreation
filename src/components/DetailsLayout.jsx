import { ReactNode, useState } from 'react';
import BackButton from '@/components/ui/BackButton';
import BrandButton from '@/components/ui/BrandButton';
import BrandPill from '@/components/ui/BrandPill';
import ReasonModal from '@/components/shared/modals/InputModal';
import { useNavigate } from 'react-router';
import InputModal from '@/components/shared/modals/InputModal';
import ConfirmationModal from '@/components/shared/modals/ConfirmationModal';




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

}) {
     const navigate = useNavigate();
  const [reasonAction, setReasonAction] = useState(null);
  const [restoreOpen, setRestoreOpen] = useState(false);

  const headingId = `${slugName}-personal-info`;

  const handleReasonSubmit = async () => {


    setReasonAction(null);
    navigate(-1);
  };

  const handleRestoreConfirm = async () => {
    setRestoreOpen(false);
    navigate(-1);
  };

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3">
        <BackButton>Details</BackButton>

        {status === 'Pending' && (
          <div className="min-[26.56rem]:mx-0 mx-auto flex  gap-3">
            <BrandButton onClick={() => navigate(-1)}>
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
          <div className="min-[26.56rem]:mx-0 mx-auto flex w-fit gap-3">
            <BrandButton
              type="button"
              onClick={() => setReasonAction('block')}
            >
              Block
            </BrandButton>

            {manager && (
              <BrandButton
                to={`/pilot-car-management/managers/${slugName}/escorts`}
                className="bg-black"
              >
                View Escorts
              </BrandButton>
            )}
          </div>
        )}

        {status === 'Deleted' && (
          <div className="min-[26.56rem]:mx-0 mx-auto flex w-fit gap-3">
            <BrandButton
              type="button"
              onClick={() => setRestoreOpen(true)}
            >
              Restore
            </BrandButton>


          </div>
        )}
      </div>

      <section
        aria-labelledby={headingId}
        className=" w-full space-y-3 details-layout rounded-2xl p-5 shadow-lg "
      >
        <div className="flex items-center justify-between gap-4">
          <h2
            id={headingId}
            className="main-heading font-bold tracking-tight text-black"
          >
            Personal Info
          </h2>

          {status && <BrandPill>{status}</BrandPill>}
        </div>

        <div className="relative flex flex-col items-center sm:items-start sm:flex-row gap-3 pb-3 after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-gray-100">
          <div className="flex h-[5em] w-[5em] shrink-0 items-center justify-center overflow-hidden rounded-full">
            <img
              src={logoSrc}
              alt={logoAlt ?? companyName}
              width={96}
              height={96}
              fetchPriority='high'
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex min-w-0  items-center sm:items-start  flex-col justify-center ">
            <h3 className="truncate main-heading font-bold tracking-tight text-black">
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

      <InputModal
        open={reasonAction !== null}
        onClose={() => setReasonAction(null) }
        onSubmit={handleReasonSubmit}
        inputProps={{ as: "textarea", maxLength: 500, label: "Reason", className: "h-[12rem]"}}

      />

      <ConfirmationModal
        open={restoreOpen}
        icon="ic:baseline-restore-from-trash"
        title="Restore!"
        description="Are you sure you want to restore this account?"
        cancelText="No"
        confirmText="Yes"
        onCancel={() => setRestoreOpen(false)}
        onConfirm={handleRestoreConfirm}
      />
    </>
  );
}