'use client';

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import ConfirmationModal from '@/components/shared/modals/ConfirmationModal';
import { Icon } from '@iconify/react';
import { Outlet } from 'react-router';



export default function ProtectedLayout({
  sidebarLinks,
  user,
}) {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    setIsOpen(false);
    // Clear auth/session here later if needed
    // localStorage.removeItem('token');
    navigate('/login');
  };

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

      {/* MOBILE BACKDROP OVERLAY */}
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
        {/* Logo */}
        <div className="relative h-[20vh] w-full  shrink-0">
          <img
            src="/logo.png"
            alt="KAAS Logo"
            className="absolute  inset-0 h-full mx-auto w-[90%] object-contain"
          />
        </div>

        {/* Scrollable nav */}
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
                        e.preventDefault();
                        setExpandedMenu(isExpanded ? null : link.name);
                      } else {
                        setIsOpen(false);
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
                      <span className="inline-block min-w-[15ch]">{link.name}</span>
                    </div>

                    {link.hasSubmenu && (
                      <Icon
                        icon="solar:alt-arrow-right-linear"
                        className={`icon transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                      />
                    )}
                  </Link>

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

        {/* Logout footer */}
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

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">

        <header className=" h-auto min-h-max gap-6 overflow-hidden bg-white flex items-center justify-between px-[1.5rem] py-[1rem] relative after:absolute after:bottom-0  after:w-[calc(100%-3rem)] after:h-[3px] after:bg-gray-100">

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-1.5 rounded-sm bg-brand/20 text-brand lg:hidden hover:bg-gray-100 rounded-lg focus:outline-none"
              onClick={() => setIsOpen(true)}
              aria-label="Open sidebar"
            >
              <Icon icon="solar:hamburger-menu-linear" className="hamburger" />
            </button>

            <h1 className="hidden lg:block font-bold text-black tracking-tight ">
              Welcome Back, {user.name}!
            </h1>
          </div>

          <div className="flex items-center gap-6 ">
            <Link
              to="/notifications"
              className="p-1.5 rounded-sm bg-brand/20 text-brand hover:bg-orange-50 transition-colors focus:outline-none inline-flex items-center justify-center"
              aria-label="View notifications"
            >
              <Icon icon="solar:bell-bing-bold-duotone" className="icon" />
            </Link>

            <div className="flex items-center gap-1 min-h-8 min-w-8  rounded-xl">
              <img
                src={user.avatar}
                alt={`${user.name} Profile Avatar`}
                className="w-[3em] h-auto aspect-square rounded-sm object-cover border border-gray-200 shadow-sm"
              />
              <div className="hidden md:flex flex-col text-left min-w-0 max-w-[12rem]">
                <span className="font-bold text-gray-900 leading-tight truncate">
                  {user.name}
                </span>
                <span className="text-gray-400 truncate" title={user.email}>
                  {user.email}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="overflow-y-auto pb-[1.5rem] px-[1.5rem] py-[1rem] custom-scrollbar">
          <Outlet />
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