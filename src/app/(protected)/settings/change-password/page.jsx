'use client';

import { useState } from 'react';
import AuthInput from '@/components/ui/auth/AuthInput';
import ConfirmationModal from '@/components/shared/ConfirmationModal';
import BackButton from '@/components/ui/BackButton';
import { useNavigate } from 'react-router';

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    
    setConfirmModalOpen(true);
  };

  const handleUpdatePassword = () => {
    setConfirmModalOpen(false);



    // Optional: clear fields after success
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    navigate("/settings")
  };

  return (
    <>
      <BackButton href='/settings'>Change Password</BackButton>
      <div className='flex flex-col items-center justify-center lg:block '>
      <div className="w-full max-w-[32rem] mt-[2rem]">
        <form onSubmit={handleSubmit} className="space-y-7 ">
          <AuthInput
            label="Current Password"
            placeholder="Enter your password"
            type="password"
            icon="solar:lock-password-linear"
            showToggle
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />

          <AuthInput
            label="New Password"
            placeholder="Enter your password"
            type="password"
            icon="solar:lock-password-linear"
            showToggle
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />

          <AuthInput
            label="Confirm Password"
            placeholder="Enter your password"
            type="password"
            icon="solar:lock-password-linear"
            showToggle
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          <button
            type="submit"
            className="mt-9 flex h-[3.8rem] w-full items-center justify-center rounded-lg bg-brand-gradient text-[1rem] font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            Update Password
          </button>
        </form>
      </div>

      <ConfirmationModal
        open={confirmModalOpen}
        icon="solar:lock-password-bold"
        title="Update Password!"
        description="Are you sure you want to update your password?"
        cancelText="No"
        confirmText="Yes"
        onCancel={() => setConfirmModalOpen(false)}
        onConfirm={handleUpdatePassword}
      />
    </div>
    </>
  );
}