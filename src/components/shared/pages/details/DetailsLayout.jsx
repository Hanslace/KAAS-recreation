import { ReactNode, useState } from 'react';
import BackButton from '@/components/ui/BackButton';
import BrandButton from '@/components/ui/BrandButton';
import BrandPill from '@/components/ui/BrandPill';
import ReasonModal from '@/components/shared/modals/InputModal';
import { useLocation, useNavigate, useParams } from 'react-router';
import InputModal from '@/components/shared/modals/InputModal';
import ConfirmationModal from '@/components/shared/modals/ConfirmationModal';
import EditDeleteActions from '@/components/ui/EditDeleteActions';
import driversData from '@/data/company-drivers.json';




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
  const { pathname } = useLocation();
  const role = import.meta.env.VITE_APP_ROLE ?? 'admin';
  const [reasonAction, setReasonAction] = useState(null);
  const [restoreOpen, setRestoreOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

  const { id } = useParams();
  const currentDriver = driversData.tableData.find((driver) => driver.slug === id);
  const [isAvailable, setIsAvailable] = useState(currentDriver?.availability === 'Online');

  const headingId = `${slugName}-personal-info`;

  const handleReasonSubmit = async () => {


    setReasonAction(null);
    navigate(-1);
  };

  const handleRestoreConfirm = async () => {
    setRestoreOpen(false);
    navigate(-1);
  };

  const handleDeleteAccountConfirm = async () => {
    setDeleteAccountOpen(false);
    navigate(-1);
  };

  return (
    <div className='details-layout'>
      <div className="flex flex-wrap justify-between gap-3">
        <BackButton>Details</BackButton>
        {role === 'pilot-car-manager' && status === 'Approved' && (
          <>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="font-bold text-black">Availability:</span>

              <button
                type="button"
                role="switch"
                aria-checked={isAvailable}
                onClick={() => setIsAvailable((previous) => !previous)}
                className={`relative inline-flex h-[1.2em] w-[2.2em] shrink-0 items-center rounded-full transition-colors ${
                  isAvailable ? 'bg-green-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-[1em] w-[1em] transform rounded-full bg-white shadow transition-transform ${
                    isAvailable ? 'translate-x-[1em]' : 'translate-x-[0.1em]'
                  }`}
                />
              </button>
            </label>
          </>
        )}
        {role === 'admin' && (
          <>
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
          </>
        )}
      </div>

      <section
        aria-labelledby={headingId}
        className=" w-full space-y-3  rounded-2xl p-5 shadow-lg "
      >
        <div className="flex items-center justify-between gap-4">
          <h2
            id={headingId}
            className="main-heading font-bold tracking-tight text-black"
          >
            Personal Info
          </h2>

          <div className='items-center flex gap-2'>
            {role === 'pilot-car-manager' && currentDriver?.status === 'Approved' && (
              <EditDeleteActions
                label="account"
                onDelete={() => setDeleteAccountOpen(true)}
                onEdit={() => navigate(`${pathname}/edit`)}
              />
            )}

            {status && <BrandPill>{status}</BrandPill>}
          </div>
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

      <ConfirmationModal
        open={deleteAccountOpen}
        icon="lucide:trash-2"
        title="Delete!"
        description="Are you sure you want to delete this account?"
        cancelText="No"
        confirmText="Yes"
        onCancel={() => setDeleteAccountOpen(false)}
        onConfirm={handleDeleteAccountConfirm}
      />
    </div>
  );
}