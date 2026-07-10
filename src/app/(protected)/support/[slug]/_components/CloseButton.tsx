'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SuccessModal from '@/components/shared/SuccessModal';

export default function CloseButton() {
  const router = useRouter();
  const [successOpen, setSuccessOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setSuccessOpen(true)}
        className="flex h-[3.25rem]  aspect-[6/3] w-fit items-center justify-center rounded-lg bg-brand-gradient text-[0.95rem] font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
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
          router.push('/support');
        }}
      />
    </>
  );
}