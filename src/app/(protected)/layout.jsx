'use client';

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import ConfirmationModal from '@/components/shared/ConfirmationModal';
import { Icon } from '@iconify/react'; 
import { Outlet } from 'react-router';



export default function Layout() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    setIsOpen(false);

    // Clear auth/session here later if needed
    // localStorage.removeItem('token');

    navigate('/login');
  };
  // State to manage mobile sidebar visibility
  const [isOpen, setIsOpen] = useState(false);
  // State to track which menu item's submenu is currently open
  const [expandedMenu, setExpandedMenu] = useState(null);

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

  const isPathActive = (href) => {
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

      <aside
        className={`
          sidebar
          fixed inset-y-0 left-0 z-50
          flex h-full w-max max-w-[85vw] flex-col
          gap-5 overflow-x-hidden
          bg-black text-white
          transition-transform duration-300 ease-in-out

          lg:static lg:max-w-none lg:translate-x-0

          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
          
          {/* KAAS Branding Header Logo Area */}
    
          {/* Logo does not control the sidebar width */}
          <div className="relative h-[20vh] w-full  shrink-0">
            <img
              src="/logo.png"
              alt="KAAS Logo"
              className="absolute  inset-0 h-full mx-auto w-[90%] object-contain"
            />
          </div>

          {/* Scrollable Container for Navigation Menu Links */}
          <div className="
            flex min-h-0 flex-1 flex-col
            overflow-y-auto
            [&::-webkit-scrollbar]:hidden
            [-ms-overflow-style:none]
            [scrollbar-width:none]
          ">
            <nav className="w-max space-y-1.5">
              {sidebarLinks.map((link) => {
                const isSubmenuActive = link.submenuItems?.some((sub) =>
                  isPathActive(sub.href)
                );

                const isActive = isPathActive(link.href) || isSubmenuActive;

                const isExpanded = expandedMenu === link.name || isSubmenuActive;

                return (
                  <div key={link.name} className="w-full flex flex-col">
                    <Link
                      to={link.href}
                      onClick={(e) => {
                        if (link.hasSubmenu) {
                          e.preventDefault(); // Stop navigation if submenu exists
                          setExpandedMenu(isExpanded ? null : link.name);
                        } else {
                          setIsOpen(false); // Close menu on link click (mobile)
                        }
                      }}
                      className={`group flex w-full min-w-max items-center justify-between
                        whitespace-nowrap rounded-[0.5em] px-[1em] py-[0.7em] gap-2
                         transition-all duration-150 ease-in-out
                        ${isActive
                          ? 'bg-brand-gradient font-semibold'
                          : 'hover:bg-zinc-900'
                        }
                      `}
                    >
                      <div className="flex items-center overflow-hidden gap-3">
                        <Icon icon={link.icon} className="icon" />
                        <span>{link.name}</span>
                      </div>
                      
                      {link.hasSubmenu && (
                        <Icon 
                          icon="solar:alt-arrow-right-linear" 
                          className={`icon transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
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
                              to={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className={`w-full min-w-max whitespace-nowrap rounded-[0.5em] px-[1em] py-[0.7em] text-left  transition-colors
                                ${isSubActive
                                  ? 'bg-brand/40 font-semibold'
                                  : 'hover:text-gray'
                                }
                              `}
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
                className="w-fit py-1.5 px-4 inline-flex items-center justify-center gap-1 rounded-sm bg-brand-gradient "
              >
                <Icon icon="majesticons:logout-half-circle" className="icon" />
                Logout
              </button>
            </div>
          

      </aside>

      {/* ========================================================================= */}
      {/* MAIN DASHBOARD CONTENT AREA                                               */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* TOP NAVBAR */}
         <header className=" h-auto min-h-max gap-6 overflow-hidden bg-white flex items-center justify-between px-[1.5rem] py-[1rem] relative after:absolute after:bottom-0  after:w-[calc(100%-3rem)] after:h-[3px] after:bg-gray-100">
          
          {/* Greeting Segment + Mobile Trigger Burger Icon */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 text-black lg:hidden hover:bg-gray-100 rounded-lg focus:outline-none"
              onClick={() => setIsOpen(true)}
              aria-label="Open sidebar"
            >
              <Icon icon="solar:hamburger-menu-linear" className="icon" />
            </button>


            <h1 className="hidden lg:block font-bold text-black tracking-tight ">
              Welcome Back, Admin!
            </h1>
          </div>

          {/* User Interface Context Blocks (Notification & Profile) */}
          <div className="flex items-center gap-6 ">
            
            <Link
              to="/notifications"
              className="p-1.5 rounded-sm bg-brand/20 text-brand hover:bg-orange-50 transition-colors focus:outline-none inline-flex items-center justify-center"
              aria-label="View notifications"
            >
              <Icon icon="solar:bell-bing-bold-duotone" className="icon" />
            </Link>

            {/* Profile Avatar Card Wrapper */}
            <div className="flex items-center gap-1 min-h-8 min-w-8  rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1783095627526-25c08072893f?w=900&auto=format&fit=crop&q=60" 
                alt="Admin Profile Avatar" 
                className="w-[3.5em] h-auto aspect-square rounded-sm object-cover border border-gray-200 shadow-sm"
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
        <main className="overflow-y-auto pb-[1.5rem] px-[1.5rem] py-[1rem] custom-scrollbar">
          
          
          <Outlet/>
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
