'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react'; // Import Iconify component
import Image from 'next/image';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  // Navigation config updated to use custom Iconify icon string tokens
  const sidebarLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: 'solar:widget-4-linear', hasSubmenu: false },
    { name: 'Bookings', href: '/bookings', icon: 'solar:calendar-minimalistic-linear', hasSubmenu: false },
    { name: 'Carriers Management', href: '/carriers', icon: 'solar:bus-linear', hasSubmenu: false },
    { name: 'Pilot Car Management', href: '/pilot-cars', icon: 'ph:car-fill', hasSubmenu: true },
    { name: 'Subscription', href: '/subscription', icon: 'solar:card-transfer-linear', hasSubmenu: false },
    { name: 'Support', href: '/support', icon: 'solar:chat-square-call-linear', hasSubmenu: false },
    { name: 'Settings', href: '/settings', icon: 'solar:settings-linear', hasSubmenu: false },
  ];

  return (
    <div className="flex min-h-screen  font-sans antialiased text-white">
      
      {/* ========================================================================= */}
      {/* SIDEBAR                                                                   */}
      {/* ========================================================================= */}
      <aside className="lg:w-[20vw] md:w-[30vw] overflow-hidden bg-black flex flex-col">
     
          
          {/* KAAS Branding Header Logo Area */}
          <div className="  flex flex-col p-15 items-center justify-center ">
              <Image
                src="/logo.png"
                alt="Kaas Logo"
                width={520}
                height={220}
                priority
                className="h-auto w-full max-w-[520px] object-contain"
              />
          </div>

          <div className='flex flex-col p-10 flex-1 justify-between'>
          {/* Nav Item Menu Stack */}
            <nav className="space-y-1.5 ">
              {sidebarLinks.map((link) => {
                // Check if current route is active
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`group w-full flex items-center justify-between p-3 px-5  rounded-md text-sub-text font-medium transition-all duration-150 ease-in-out
                      ${isActive 
                        ? 'bg-brand-gradient font-semibold' 
                        : ''
                      }`}
                  >
                    <div className="flex items-center overflow-hidden gap-3">
                      {/* Iconify integration for menu links */}
                      <Icon icon={link.icon} className="w-5 h-5" />
                      <span className=''>{link.name}</span>
                    </div>
                    
                    {link.hasSubmenu && (
                      /* Iconify integration for menu chevrons */
                      <Icon icon="solar:alt-arrow-right-linear" className="w-8 h-8" />
                    )}
                  </Link>
                );
              })}
            </nav>
            

            <Link href="/login"  className='w-[7vw] min-w-fit p-3 inline-flex items-center justify-center gap-2 rounded-md bg-brand-gradient text-sub-text ' >
              {/* Fixed: Iconify integration for the logout button icon */}
              <Icon icon="majesticons:logout-half-circle" className="w-5 h-5" />
              Logout
            </Link>
          </div>

      </aside>

      {/* ========================================================================= */}
      {/* MAIN DASHBOARD CONTENT AREA                                               */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP NAVBAR */}
        <header className="h-fit overflow-hidden bg-white flex items-center justify-between p-10 relative after:absolute after:bottom-0 after:left-10  after:w-[calc(100%-80px)] after:h-[3px] after:bg-gray-100">

          
          {/* Greeting Welcome Segment */}
          <div>
            <h1 className="text-heading font-bold text-black tracking-tight">
              Welcome Back, Admin!
            </h1>
          </div>

          {/* User Interface Context Blocks (Notification & Profile) */}
          <div className="flex items-center gap-10">
            
            {/* Soft Circular Alert Container */}
            <button 
              type="button" 
              className="p-2.5 rounded-xl bg-brand/20 text-brand hover:bg-orange-50 transition-colors focus:outline-none relative"
              aria-label="View notifications"
            >
              {/* Iconify integration for the notification bell */}
              <Icon icon="solar:bell-bing-bold-duotone" className="w-6 h-6" />
              {/* Optional Active Unread Counter Pulse Dot */}
            </button>

            {/* Profile Avatar Card Wrapper */}
            <div className="flex items-center gap-3  text-label rounded-xl ">
              <img 
                src="https://images.unsplash.com/photo-1783095627526-25c08072893f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D" 
                alt="Admin Profile Avatar Picture" 
                className="w-16 h-16 rounded-xl object-cover border border-gray-200 shadow-sm"
              />
              <div className="flex flex-col text-left">
                <span className=" font-bold text-gray-900 leading-tight">
                  Admin
                </span>
                <span className=" text-gray-400">
                  admin.admin@gmail.com
                </span>
              </div>
            </div>

          </div>
        </header>

        {/* PRIMARY VIEW CONTENT VIEWPORT SLOT */}
        <main className="flex-1 overflow-y-auto p-10">
          {children}
        </main>

      </div>
    </div>
  );
}
