import { Navigate, Route, Routes } from "react-router";
import userData from "@/data/user.json";

// Auth layout and pages
import AuthLayout from "@/components/shared/layouts/AuthLayout.jsx";
import LoginPage from "@/app/(auth)/login/page.jsx";
import ForgotPasswordPage from "@/app/(auth)/forgot-password/page.jsx";
import ForgotPasswordOtpPage from "@/app/(auth)/forgot-password/otp/page.jsx";
import ResetPasswordPage from "@/app/(auth)/forgot-password/reset/page.jsx";
import SignUpPage from "@/app/(auth)/sign-up/page.jsx";
import SignUpOtpPage from "@/app/(auth)/sign-up/otp/page";
import RoleSelectPage from "@/app/(auth)/sign-up/role-select/page";
import CompanyDetailsPage from "@/app/(auth)/sign-up/company-details/page";
import CreateProfilePage from "@/app/(auth)/sign-up/create-profile/page";
import FaresPage from "@/app/(auth)/sign-up/fares/page";
import AddVehiclesPage from "@/app/(auth)/sign-up/add-vehicles/page";


// Protected layout
import ProtectedLayout from "@/components/shared/layouts/ProtectedLayout.jsx";


// Bookings
import BookingsPage from "@/components/shared/pages/bookings/bookings";
import BookingDetailPage from "@/components/shared/pages/bookings/bookingsDetail";
import BookingReschedulePage from "@/components/shared/pages/bookings/rescheduleBooking.jsx";

// Notifications
import NotificationsPage from "@/components/shared/pages/notification";

// Payments

// Profile
import ProfilePage from "@/app/pilot-car-manager/profile/page.jsx";
import EditProfilePage from "@/app/pilot-car-manager/profile/edit/page.jsx";

// Settings
import SettingsPage from "@/components/shared/pages/settings/page.jsx";
import SettingsContentPage from "@/components/shared/pages/settings/[slug]/page.jsx";
import ChangePasswordPage from "@/components/shared/pages/settings/change-password/page.jsx";

// Subscriptions
import PlansPage from "@/components/shared/pages/subscription/plans";
import PaymentPage from "@/components/shared/pages/subscription/payment";

// Support
import SupportPage from "@/components/shared/pages/support/support.jsx";
import CreateTicketPage from "@/components/shared/pages/support/create-ticket.jsx";

// Escorts
import EscortsPage from "@/app/pilot-car-manager/escorts/page.jsx";
import EscortDetailsPage from "@/app/pilot-car-manager/escorts/[escortId]/page.jsx";
import EditEscortPage from "@/app/pilot-car-manager/escorts/[escortId]/edit/page.jsx";
import AddEscortPage from "@/app/pilot-car-manager/escorts/add/page.jsx";
import NotFound from "@/components/ui/NotFound";
import ManagerDashboard from "@/app/pilot-car-manager/dashboard/page";
import EarningsPage from "@/app/pilot-car-manager/earnings/page";
import EarningDetailPage from "@/components/shared/pages/earningDetail";
import DriversPage from "@/app/pilot-car-manager/driver/page";
import DriverDetailPage from "@/app/pilot-car-manager/driver/[driverId]/page";
import DriverAddPage from "@/app/pilot-car-manager/driver/add/page";
import DriverEditPage from "@/app/pilot-car-manager/driver/[driverId]/edit/page";
import CompanyDetailsEditPage from "@/app/pilot-car-manager/profile/edit/company-details/page";
import FaresEditPage from "@/app/pilot-car-manager/profile/edit/fares/page";


const sidebarLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: 'ic:baseline-home', hasSubmenu: false },
  { name: 'Bookings', href: '/bookings', icon: 'uis:calendar', hasSubmenu: false },
  { name: 'Escorts', href: '/escorts', icon: 'mdi:car-side', hasSubmenu: false },
  { name: 'Subscription', href: '/subscriptions', icon: 'material-symbols:subscriptions', hasSubmenu: false },
  { name: 'Drivers', href: '/drivers', icon: 'mdi:account-group', hasSubmenu: false },
  { name: 'Earnings', href: '/earnings', icon: 'solar:wallet-money-bold', hasSubmenu: false },
  { name: 'Profile', href: '/profile', icon: 'ic:baseline-person', hasSubmenu: false },
  { name: 'Support', href: '/support', icon: 'fluent:person-support-32-filled', hasSubmenu: false },
  { name: 'Settings', href: '/settings', icon: 'material-symbols:settings', hasSubmenu: false },
];

const currentUser = userData.users.find((u) => u.id === "john-smith");

export const pilotCarManagerRoutes = (
  <Routes>
    {/* Root redirect to Home */}
    <Route path="/" element={<Navigate to="/home" replace />} />

    {/* Authentication routes */}
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password">
        <Route index element={<ForgotPasswordPage />} />
        <Route path="otp" element={<ForgotPasswordOtpPage />} />
        <Route path="reset" element={<ResetPasswordPage />} />
      </Route>
      <Route path="/sign-up">
        <Route index element={<SignUpPage />} />
        <Route path="otp" element={<SignUpOtpPage />} />
        <Route path="create-profile" element={<CreateProfilePage />} />
        <Route path="role-select" element={<RoleSelectPage />} />
        <Route path="company-details" element={<CompanyDetailsPage />} />
        <Route path="add-vehicles" element={<AddVehiclesPage />} />
        <Route path="fares" element={<FaresPage />} />
        <Route path="payment">
          <Route index element={<PlansPage />} />
          <Route path=":planId" element={<PaymentPage />} />
        </Route>
      </Route>
    </Route>

    {/* Protected routes */}
    <Route element={
      <ProtectedLayout
        sidebarLinks={sidebarLinks}
        user={currentUser}
      />
    }>
      {/* Home */}
      <Route path="/dashboard" element={<ManagerDashboard />}/>
   
      

      {/* Bookings */}
      <Route path="/bookings">
        <Route index element={<BookingsPage />} />
        {/* Static routes above dynamic param */}
        <Route path="reschedule/:bookingId" element={<BookingReschedulePage />} />
        <Route path=":bookingId" element={<BookingDetailPage />} />
      </Route>

      {/* Notifications */}
      <Route path="/notifications" element={<NotificationsPage />} />

      {/* Earnings */}
      <Route path="/earnings">
        <Route index element={<EarningsPage />} />
        <Route path=":bookingId" element={<EarningDetailPage />} />
      </Route>

      {/* Drivers */}
      <Route path="/drivers">
        <Route index element={<DriversPage />} />
        {/* Static route above dynamic param */}
        <Route path="add" element={<DriverAddPage />} />
        <Route path=":id" element={<DriverDetailPage />} />
        <Route path=":id/edit" element={<DriverEditPage />} />
      </Route>

      {/* Profile */}
      <Route path="/profile">
        <Route index element={<ProfilePage />} />
        <Route path="edit" >
          <Route index element={<EditProfilePage />} />
          <Route path="company-details" element={<CompanyDetailsEditPage />} />
          <Route path="fares" element={<FaresEditPage/>} />
        </Route>
      </Route>

      {/* Settings */}
      <Route path="/settings">
        <Route index element={<SettingsPage />} />
        {/* Static routes above dynamic param */}
        <Route path="change-password" element={<ChangePasswordPage />} />
        <Route path=":slug" element={<SettingsContentPage />} />
      </Route>

      {/* Subscriptions */}
      <Route path="/subscriptions">
        <Route index element={<PlansPage />} />
        <Route path=":planId" element={<PaymentPage />} />
      </Route>

      {/* Support */}
      <Route path="/support">
        <Route index element={<SupportPage />} />
        <Route path="create-ticket" element={<CreateTicketPage />} />
      </Route>

      {/* Escorts */}
      <Route path="/escorts">
        <Route index element={<EscortsPage />} />
        {/* Static route above dynamic param */}
        <Route path="add" element={<AddEscortPage />} />
        <Route path=":escortId">
          <Route index element={<EscortDetailsPage />} />
          <Route path="edit" element={<EditEscortPage />} />
        </Route>
      </Route>
    </Route>

    {/* Catch-all 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);