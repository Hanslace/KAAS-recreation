'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react'; 
import Image from 'next/image';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
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

      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col h-full bg-black transition-transform duration-300 text-white ease-in-out
        w-fit   lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
          
          {/* KAAS Branding Header Logo Area */}
          <div className="flex flex-col p-15 items-center justify-center ">
              <Image
                src="/logo.png"
                alt="Kaas Logo"
                width={520}
                height={220}
                priority
                className="h-auto w-full max-w-[15rem] object-contain"
              />
          </div>

          {/* Scrollable Container for Navigation Menu Links */}
          <div className='flex flex-col px-10 pb-10 flex-1 justify-between overflow-y-auto min-h-0'>
            <nav className="space-y-1.5">
              {sidebarLinks.map((link) => {
                const isSubmenuActive = link.submenuItems?.some(sub => pathname === sub.href);
                const isActive = pathname === link.href || isSubmenuActive;
                const isExpanded = expandedMenu === link.name;

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
                      className={`group w-full flex items-center justify-between p-3 px-5 rounded-md text-[1.1rem] font-medium transition-all duration-150 ease-in-out
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
                          const isSubActive = pathname === subItem.href;
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
            
            {/* Logout Action Button Footer */}
            <div className="pt-4 shrink-0">
              <Link 
                href="/login"  
                className='w-fit  p-3 px-5 inline-flex items-center justify-center gap-2 rounded-md bg-brand-gradient text-sub-text font-medium'
              >
                <Icon icon="majesticons:logout-half-circle" className="w-5 h-5" />
                Logout
              </Link>
            </div>
          </div>

      </aside>

      {/* ========================================================================= */}
      {/* MAIN DASHBOARD CONTENT AREA                                               */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* TOP NAVBAR */}
         <header className="h-fit gap-6 overflow-hidden bg-white flex items-center justify-between p-[2.5rem] relative after:absolute after:bottom-0 after:left-10 after:w-[calc(100%-80px)] after:h-[3px] after:bg-gray-100">
          
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

            <h1 className="text-xl lg:text-heading font-bold text-black tracking-tight hidden md:block">
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
            <div className="flex items-center gap-3 min-h-16 min-w-16 text-label rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1783095627526-25c08072893f?w=900&auto=format&fit=crop&q=60" 
                alt="Admin Profile Avatar" 
                className="w-11 md:w-16 h-auto aspect-square rounded-xl object-cover border border-gray-200 shadow-sm"
              />
              <div className="hidden md:flex flex-col text-left">
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
        <h1 className="text-xl px-[2.5rem] lg:text-heading font-bold text-black tracking-tight  md:hidden">
              Welcome Back, Admin!
            </h1>

        {/* PRIMARY VIEW CONTENT VIEWPORT SLOT */}
        <main className="flex-1 overflow-y-auto p-[2.5rem]">
          
          {children}
        </main>

      </div>
    </div>
  );
}
