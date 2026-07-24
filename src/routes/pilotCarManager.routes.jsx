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
import CompanyDetailsPage from "@/app/(auth)/sign-up/details/page";
import CreateProfilePage from "@/app/(auth)/sign-up/create-profile/page";
import VehiclesPage from "@/app/(auth)/sign-up/vehicles/page";
import FaresPage from "@/app/(auth)/sign-up/fares/page";
import PaymentPlanPage from "@/app/(auth)/sign-up/payment/page";
import PaymentPage from "@/app/(auth)/sign-up/payment/[planId]/page";

// Protected layout
import ProtectedLayout from "@/components/shared/layouts/ProtectedLayout.jsx";


// Bookings
import BookingsPage from "@/app/pilot-car-manager/bookings/page.jsx";
import BookingDetailsPage from "@/app/pilot-car-manager/bookings/[bookingId]/page.jsx";
import BookingReschedulePage from "@/app/pilot-car-manager/bookings/reschedule/[bookingId]/page.jsx";

// Notifications
import NotificationsPage from "@/components/shared/pages/notification";

// Payments
import PaymentsPage from "@/app/carrier/payments/page.jsx";

// Profile
import ProfilePage from "@/app/carrier/profile/page.jsx";
import EditProfilePage from "@/app/carrier/profile/edit/page.jsx";

// Settings
import SettingsPage from "@/components/shared/pages/settings/page.jsx";
import SettingsContentPage from "@/components/shared/pages/settings/[slug]/page.jsx";
import ChangePasswordPage from "@/components/shared/pages/settings/change-password/page.jsx";

// Subscriptions
import SubscriptionsPage from "@/app/carrier/subscriptions/page.jsx";
import SubscriptionPaymentPage from "@/app/carrier/subscriptions/[planId]/page.jsx";

// Support
import SupportPage from "@/app/carrier/support/page.jsx";
import CreateTicketPage from "@/app/carrier/support/create-ticket/page.jsx";

// Escorts
import EscortsPage from "@/app/pilot-car-manager/escorts/page.jsx";
import EscortDetailsPage from "@/app/pilot-car-manager/escorts/[escortId]/page.jsx";
import EditEscortPage from "@/app/pilot-car-manager/escorts/[escortId]/edit/page.jsx";
import AddEscortPage from "@/app/pilot-car-manager/escorts/add/page.jsx";
import NotFound from "@/components/ui/NotFound";
import ManagerDashboard from "@/app/pilot-car-manager/dashboard/page";



const sidebarLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: 'ic:baseline-home', hasSubmenu: false },
  { name: 'Bookings', href: '/bookings', icon: 'uis:calendar', hasSubmenu: false },
  { name: 'corts', href: '/escorts', icon: 'mdi:car-side', hasSubmenu: false },
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
        <Route path="details" element={<CompanyDetailsPage />} />
        <Route path="vehicles" element={<VehiclesPage />} />
        <Route path="fares" element={<FaresPage />} />
        <Route path="payment">
          <Route index element={<PaymentPlanPage />} />
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
        <Route path=":bookingId" element={<BookingDetailsPage />} />
      </Route>

      {/* Notifications */}
      <Route path="/notifications" element={<NotificationsPage />} />

      {/* Payments */}
      <Route path="/payments" element={<PaymentsPage />} />

      {/* Profile */}
      <Route path="/profile">
        <Route index element={<ProfilePage />} />
        <Route path="edit" element={<EditProfilePage />} />
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
        <Route index element={<SubscriptionsPage />} />
        <Route path=":planId" element={<SubscriptionPaymentPage />} />
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