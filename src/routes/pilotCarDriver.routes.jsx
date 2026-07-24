import { Navigate, Route, Routes } from "react-router";

// Auth layout and pages
import AuthLayout from "@/components/shared/layouts/AuthLayout.jsx";
import LoginPage from "@/app/(auth)/login/page.jsx";
import ForgotPasswordPage from "@/app/(auth)/forgot-password/page.jsx";
import ForgotPasswordOtpPage from "@/app/(auth)/forgot-password/otp/page.jsx";
import ResetPasswordPage from "@/app/(auth)/forgot-password/reset/page.jsx";

// Protected layout
import ProtectedLayout from "@/components/shared/layouts/ProtectedLayout.jsx";

// Dashboard
import DashboardPage from "@/app/admin/dashboard/page.jsx";

// Bookings
import BookingsPage from "@/app/admin/bookings/page.jsx";
import BookingDetailsPage from "@/app/admin/bookings/[bookingId]/page.jsx";

// Carrier management
import CarrierManagementPage from "@/app/admin/carrier-management/page.jsx";
import CarrierDetailsPage from "@/app/admin/carrier-management/CarrierDetailsPage.jsx";
import TruckDetailsPage from "@/app/admin/carrier-management/TruckDetailsPage.jsx";

// Notifications
import NotificationsPage from "@/components/shared/pages/notification";

// Pilot car management
import CompanyDriversPage from "@/app/admin/pilot-car-management/company-drivers/page.jsx";
import CompanyDriverDetailsPage from "@/app/admin/pilot-car-management/company-drivers/[driverid]/page.jsx";
import IndividualDriversPage from "@/app/admin/pilot-car-management/individual-drivers/page.jsx";
import IndividualDriverDetailsPage from "@/app/admin/pilot-car-management/individual-drivers/[driverid]/page.jsx";
import ManagersPage from "@/app/admin/pilot-car-management/managers/page.jsx";
import ManagerDetailsPage from "@/app/admin/pilot-car-management/managers/[managerid]/page.jsx";
import ManagerEscortsPage from "@/app/admin/pilot-car-management/managers/[managerid]/escorts/page.jsx";
import ManagerEscortDetailsPage from "@/app/admin/pilot-car-management/managers/[managerid]/escorts/[escortId]/page.jsx";

// Settings
import SettingsPage from "@/components/shared/pages/settings/page";
import ChangePasswordPage from "@/components/shared/pages/settings/change-password/page";
import DeletedAccountsPage from "@/components/shared/pages/settings/deleted-accounts/page";
import DeletedAccountDetailsPage from "@/components/shared/pages/settings/deleted-accounts/[slug]/page";
import SettingsContentPage from "@/components/shared/pages/settings/[slug]/page";

// Subscriptions
import SubscriptionsPage from "@/app/admin/subscriptions/page.jsx";
import SubscriptionDetailsPage from "@/app/admin/subscriptions/[slug]/page.jsx";
import SubscriptionEarningPage from "@/app/admin/subscriptions/earning/page.jsx";

// Support
import SupportPage from "@/app/admin/support/page.jsx";
import SupportDetailsPage from "@/app/admin/support/[slug]/page.jsx";
import userData from "@/data/user.json";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-black">404</h1>
        <p className="mt-3 text-black/50">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}

const sidebarLinks = [
  { name: 'Home', href: '/home', icon: 'ic:baseline-home', hasSubmenu: false },
  { name: 'Escort', href: '/escort', icon: 'mdi:car-side', hasSubmenu: false },
  { name: 'Profile', href: '/profile', icon: 'ic:baseline-person', hasSubmenu: false },
  { name: 'Support', href: '/support', icon: 'fluent:person-support-32-filled', hasSubmenu: false },
  { name: 'Settings', href: '/settings', icon: 'material-symbols:settings', hasSubmenu: false },
];

const currentUser = userData.users.find((u) => u.id === "admin");
  

export const pilotCarDriverRoutes =  (
    <Routes>
      {/* Root redirect to Dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Authentication routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password">
          <Route index element={<ForgotPasswordPage />} />
          <Route path="otp" element={<ForgotPasswordOtpPage />} />
          <Route path="reset" element={<ResetPasswordPage />} />
        </Route>
      </Route>

      {/* Protected/admin routes */}
      <Route element={
        <ProtectedLayout
          sidebarLinks={sidebarLinks}
          user={currentUser}
        />
      }>
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/bookings">
          <Route index element={<BookingsPage />} />
          <Route path=":bookingId" element={<BookingDetailsPage />} />
        </Route>

        <Route path="/carrier-management">
          <Route index element={<CarrierManagementPage />} />
          <Route path=":carrierid" element={<CarrierDetailsPage />} />
          <Route path=":carrierid/truck/:truckid" element={<TruckDetailsPage />} />
        </Route>

        <Route path="/notifications" element={<NotificationsPage />} />

        <Route path="/pilot-car-management">
          <Route path="company-drivers">
            <Route index element={<CompanyDriversPage />} />
            <Route path=":driverid" element={<CompanyDriverDetailsPage />} />
          </Route>

          <Route path="individual-drivers">
            <Route index element={<IndividualDriversPage />} />
            <Route path=":driverid" element={<IndividualDriverDetailsPage />} />
          </Route>

          <Route path="managers">
            <Route index element={<ManagersPage />} />
            <Route path=":managerid" element={<ManagerDetailsPage />} />
            <Route path=":managerid/escorts" element={<ManagerEscortsPage />} />
            <Route path=":managerid/escorts/:escortid" element={<ManagerEscortDetailsPage />} />
          </Route>
        </Route>

        <Route path="/settings">
          <Route index element={<SettingsPage />} />
          {/* ✅ CRITICAL FIX: Static subroutes placed ABOVE dynamic params */}
          <Route path="change-password" element={<ChangePasswordPage />} />
          <Route path="deleted-accounts">
            <Route index element={<DeletedAccountsPage />} />
            <Route path=":slug" element={<DeletedAccountDetailsPage />} />
          </Route>
          <Route path=":slug" element={<SettingsContentPage />} />
        </Route>

        <Route path="/subscriptions">
          <Route index element={<SubscriptionsPage />} />
          <Route path="earning" element={<SubscriptionEarningPage />} />
          <Route path=":slug" element={<SubscriptionDetailsPage />} />
        </Route>

        <Route path="/support">
          <Route index element={<SupportPage />} />
          <Route path=":slug" element={<SupportDetailsPage />} />
        </Route>
      </Route>

      {/* Catch-all 404 handler */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );

