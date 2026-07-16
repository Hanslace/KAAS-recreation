'use client';

import { useState } from 'react';
import { Link } from 'react-router';



const settingsCards = [
  {
    id: 1,
    title: 'Change Password',
    href: '/settings/change-password',
  },
  {
    id: 2,
    title: 'Deleted Accounts',
    href: '/settings/deleted-accounts',
  },
  {
    id: 3,
    title: 'Terms & Conditions',
    href: '/settings/terms-conditions',
  },
  {
    id: 4,
    title: 'Privacy Policy',
    href: '/settings/privacy-policy',
  },
  {
    id: 5,
    title: 'About Us',
    href: '/settings/about-us',
  },
];

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="w-full settings">
      <h2 className="main-heading font-bold text-black tracking-tight">
        Settings
      </h2>

      <div className="mt-8 grid w-full  max-w-[55em] grid-cols-1 gap-3 md:grid-cols-2">
        {/* Notifications Card */}
        <div className="flex min-h-[4em] items-center justify-between rounded-xl bg-white px-7 shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
          <span className=" font-semibold text-black">
            Notifications
          </span>

          <button
            type="button"
            onClick={() => setNotificationsEnabled((prev) => !prev)}
            className={`relative flex h-[1.5rem] w-[3.4rem] items-center rounded-full border transition-all duration-300 ${
              notificationsEnabled
                ? 'border-brand bg-brand'
                : 'border-black/20 bg-black/10'
            }`}
            aria-label="Toggle notifications"
          >
            {notificationsEnabled && (
              <span className="absolute left-2 text-[0.7em] font-bold text-white">
                ON
              </span>
            )}

            <span
              className={`absolute h-[1.25rem] w-[1.25rem] rounded-full bg-white shadow-sm transition-all duration-300 ${
                notificationsEnabled ? 'right-[0.12rem]' : 'left-[0.12rem]'
              }`}
            />
          </button>
        </div>

        {/* Other Cards */}
        {settingsCards.map((item) => (
          <Link
            key={item.id}
            to={item.href || '#'}
            className="flex min-h-[4em] items-center rounded-xl bg-white px-7 shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)]"
          >
            <span className=" font-semibold text-black">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}