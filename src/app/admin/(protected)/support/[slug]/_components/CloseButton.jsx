'use client'

import { useState } from 'react';
import SuccessModal from '@/components/shared/modals/SuccessModal';
import { useNavigate } from 'react-router';

export default function CloseButton() {
  const navigate = useNavigate();
  const [successOpen, setSuccessOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setSuccessOpen(true)}
        className="brand-button flex  items-center justify-center rounded-md bg-brand-gradient py-3 px-11  font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        Close
      </button>

      <SuccessModal
        open={successOpen}
        title="Successfully!"
        description="Ticket has been closed successfully."
        buttonText="Done"
        onDone={() => {
          setSuccessOpen(false);
          navigate('/support');
        }}
      />
    </>
  );
}