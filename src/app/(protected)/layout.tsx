'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ConfirmationModal from '@/components/shared/ConfirmationModal';
import { Icon } from '@iconify/react'; 
import Image from 'next/image';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    setIsOpen(false);

    // Clear auth/session here later if needed
    // localStorage.removeItem('token');

    router.push('/login');
  };
  // State to manage mobile sidebar visibility
  const [isOpen, setIsOpen] = useState(false);
  // State to track which menu item's submenu is currently open
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const sidebarLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: 'ic:baseline-home', hasSubmenu: false },
    { name: 'Bookings', href: '/bookings', icon: 'uis:calendar', hasSubmenu: false },
    { name: 'Carriers Management', href: '/carrier-management', icon: 'fa6-solid:truck-moving', hasSubmenu: false },
    { 
      name: 'Pilot Car Management', 
      href: '/pilot-cars', 
      icon: 'ph:car-fill', 
      hasSubmenu: true,
      submenuItems: [
        { name: 'Managers', href: '/pilot-car-management/managers' },
        { name: 'Company Drivers', href: '/pilot-car-management/company-drivers' },
        { name: 'Individual Drivers', href: '/pilot-car-management/individual-drivers' }
      ]
    },
    { name: 'Subscription', href: '/subscriptions', icon: 'material-symbols:subscriptions', hasSubmenu: false },
    { name: 'Support', href: '/support', icon: 'fluent:person-support-32-filled', hasSubmenu: false },
    { name: 'Settings', href: '/settings', icon: 'material-symbols:settings', hasSubmenu: false },
  ];

  const isPathActive = (href: string) => {
    const cleanHref = href.replace(/\/$/, '') || '/';
    const cleanPathname = pathname.replace(/\/$/, '') || '/';

    if (cleanHref === '/') {
      return cleanPathname === '/';
    }

    return (
      cleanPathname === cleanHref ||
      cleanPathname.startsWith(`${cleanHref}/`)
    );
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans antialiased ">
      
      {/* ========================================================================= */}
      {/* MOBILE BACKDROP OVERLAY                                                   */}
      {/* ========================================================================= */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`max-w-[17rem] xs:max-w-[20rem] lg:max-w-[15rem]  xl:max-w-[22.5rem] 2xl:max-w-[25rem]
        fixed inset-y-0 left-0 z-50 flex flex-col h-full bg-black transition-transform duration-300 text-white ease-in-out p-[1.5rem] xl:p-[2rem] gap-5
        w-fit   lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
          
          {/* KAAS Branding Header Logo Area */}
    
          <img
            src="/logo.png"
            alt="Logo"
            className=" aspect-[9/5] px-5 object-contain transition-transform duration-300 group-hover:scale-105 "
          />

          {/* Scrollable Container for Navigation Menu Links */}
          <div className='flex flex-col  py-10 flex-1  overflow-y-auto min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            <nav className="space-y-1.5 ">
              {sidebarLinks.map((link) => {
                const isSubmenuActive = link.submenuItems?.some((sub) =>
                  isPathActive(sub.href)
                );

                const isActive = isPathActive(link.href) || isSubmenuActive;

                const isExpanded = expandedMenu === link.name || isSubmenuActive;

                return (
                  <div key={link.name} className="w-full flex flex-col">
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        if (link.hasSubmenu) {
                          e.preventDefault(); // Stop navigation if submenu exists
                          setExpandedMenu(isExpanded ? null : link.name);
                        } else {
                          setIsOpen(false); // Close menu on link click (mobile)
                        }
                      }}
                      className={`group w-full flex items-center justify-between p-3 px-5 rounded-md text-[0.8rem] xl:text-[1.1rem] font-medium transition-all duration-150 ease-in-out
                        ${isActive ? 'bg-brand-gradient font-semibold' : 'hover:bg-zinc-900'}`}
                    >
                      <div className="flex items-center overflow-hidden gap-3">
                        <Icon icon={link.icon} className="w-5 h-5" />
                        <span>{link.name}</span>
                      </div>
                      
                      {link.hasSubmenu && (
                        <Icon 
                          icon="solar:alt-arrow-right-linear" 
                          className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
                        />
                      )}
                    </Link>

                    {/* Submenu rendering logic */}
                    {link.hasSubmenu && isExpanded && link.submenuItems && (
                      <div className="flex flex-col  mt-1 space-y-1">
                        {link.submenuItems.map((subItem) => {
                          const isSubActive = isPathActive(subItem.href);
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className={`w-full p-2.5 px-4 rounded-md text-sm font-medium transition-colors text-left
                                ${isSubActive 
                                  ? ' bg-brand/40 font-semibold' 
                                  : ' hover:text-gray'}`}
                            >
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            </div>
            
            {/* Logout Action Button Footer */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => setLogoutModalOpen(true)}
                className="w-fit p-3 px-5 inline-flex items-center justify-center gap-2 rounded-md bg-brand-gradient text-sub-text font-medium"
              >
                <Icon icon="majesticons:logout-half-circle" className="w-5 h-5" />
                Logout
              </button>
            </div>
          

      </aside>

      {/* ========================================================================= */}
      {/* MAIN DASHBOARD CONTENT AREA                                               */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* TOP NAVBAR */}
         <header className="h-auto min-h-max gap-6 overflow-hidden bg-white flex items-center justify-between p-[1.5rem] lg:p-[2.5rem] relative after:absolute after:bottom-0 after:left-10 after:w-[calc(100%-80px)] after:h-[3px] after:bg-gray-100">
          
          {/* Greeting Segment + Mobile Trigger Burger Icon */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 text-black lg:hidden hover:bg-gray-100 rounded-lg focus:outline-none"
              onClick={() => setIsOpen(true)}
              aria-label="Open sidebar"
            >
              <Icon icon="solar:hamburger-menu-linear" className="w-8 h-8" />
            </button>
            <div className="flex flex-col lg:hidden items-center justify-center ">
              <Image
                src="/logo.png"
                alt="Kaas Logo"
                width={520}
                height={220}
                priority
                className="h-auto w-full max-w-[10rem] object-contain"
              />
          </div>

            <h1 className="text-[1rem] lg:text-[2rem] 2xl:text-[3rem] font-bold text-black tracking-tight hidden md:block">
              Welcome Back, Admin!
            </h1>
          </div>

          {/* User Interface Context Blocks (Notification & Profile) */}
          <div className="flex items-center gap-6 lg:gap-10">
            
            <Link
              href="/notifications"
              className="p-2.5 rounded-xl bg-brand/20 text-brand hover:bg-orange-50 transition-colors focus:outline-none inline-flex items-center justify-center"
              aria-label="View notifications"
            >
              <Icon icon="solar:bell-bing-bold-duotone" className="w-6 h-6" />
            </Link>

            {/* Profile Avatar Card Wrapper */}
            <div className="flex items-center gap-3 min-h-16 min-w-16 text-[1rem] 2xl:text-[1.5rem] rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1783095627526-25c08072893f?w=900&auto=format&fit=crop&q=60" 
                alt="Admin Profile Avatar" 
                className="w-11 md:w-16 h-auto aspect-square rounded-xl object-cover border border-gray-200 shadow-sm"
              />
              <div className="hidden md:flex flex-col text-left min-w-0 max-w-[12rem]">
                <span className="font-bold text-gray-900 leading-tight truncate">
                  Admin
                </span>
                {/* Replaced overflow-x-auto with truncate to clip long emails cleanly */}
                <span className="text-gray-400 truncate" title="admin.admin@gmail.com">
                  admin.admin@gmail.com
                </span>
              </div>
            </div>

          </div>
     
        </header>
     

        {/* PRIMARY VIEW CONTENT VIEWPORT SLOT */}
        <main className="overflow-y-auto p-[2.5rem]">
          
          
          {children}
        </main>

      </div>
      <ConfirmationModal
        open={logoutModalOpen}
        icon="majesticons:logout-half-circle"
        title="Logout!"
        description="Are you sure you want to logout your account?"
        cancelText="No"
        confirmText="Yes"
        onCancel={() => setLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}
