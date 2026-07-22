import { Navigate, Route, Routes } from "react-router";
import userData from "@/data/user.json";

// Auth layout and pages
import AuthLayout from "@/components/shared/layouts/AuthLayout.jsx";
import LoginPage from "@/app/carrier/(auth)/login/page.jsx";
import ForgotPasswordPage from "@/app/carrier/(auth)/forgot-password/page.jsx";
import ForgotPasswordOtpPage from "@/app/carrier/(auth)/forgot-password/otp/page.jsx";
import ResetPasswordPage from "@/app/carrier/(auth)/forgot-password/reset/page.jsx";
import SignUpPage from "@/app/carrier/(auth)/sign-up/page.jsx";
import SignUpOtpPage from "@/app/carrier/(auth)/sign-up/otp/page";
import CreateProfilePage from "@/app/carrier/(auth)/sign-up/create-profile/page";
import CarrierProfilePage from "@/app/carrier/(auth)/carrier-profile/page";
import PaymentPlanPage from "@/app/carrier/(auth)/payment-plan/page";
import PaymentPage from "@/app/carrier/(auth)/payment-plan/[planId]/page";

// Protected layout
import ProtectedLayout from "@/components/shared/layouts/ProtectedLayout.jsx";

// Home
import CarrierHome from "@/app/carrier/(protected)/home/page.jsx";
import BookDriverPage from "@/app/carrier/(protected)/home/[id]/book/page.jsx";
import DriverDetailPage from "@/app/carrier/(protected)/home/[id]/page.jsx";
import PreviousBookingsPage from "@/app/carrier/(protected)/home/previous-bookings/page.jsx";

// Bookings
import BookingsPage from "@/app/carrier/(protected)/bookings/page.jsx";
import BookingDetailsPage from "@/app/carrier/(protected)/bookings/[bookingId]/page.jsx";
import BookingProfilePage from "@/app/carrier/(protected)/bookings/profile/[escortId]/page.jsx";
import BookingReschedulePage from "@/app/carrier/(protected)/bookings/reschedule/[bookingId]/page.jsx";

// Notifications
import NotificationsPage from "@/app/carrier/(protected)/notifications/page.jsx";

// Payments
import PaymentsPage from "@/app/carrier/(protected)/payments/page.jsx";

// Profile
import ProfilePage from "@/app/carrier/(protected)/profile/page.jsx";
import EditProfilePage from "@/app/carrier/(protected)/profile/edit/page.jsx";

// Settings
import SettingsPage from "@/app/carrier/(protected)/settings/page.jsx";
import SettingsContentPage from "@/app/carrier/(protected)/settings/[slug]/page.jsx";
import ChangePasswordPage from "@/app/carrier/(protected)/settings/change-password/page.jsx";

// Subscriptions
import SubscriptionsPage from "@/app/carrier/(protected)/subscriptions/page.jsx";
import SubscriptionPaymentPage from "@/app/carrier/(protected)/subscriptions/payment/page.jsx";

// Support
import SupportPage from "@/app/carrier/(protected)/support/page.jsx";
import CreateTicketPage from "@/app/carrier/(protected)/support/create-ticket/page.jsx";

// Trucks
import TrucksPage from "@/app/carrier/(protected)/trucks/page.jsx";
import TruckDetailsPage from "@/app/carrier/(protected)/trucks/[id]/page.jsx";
import EditTruckPage from "@/app/carrier/(protected)/trucks/[id]/edit/page.jsx";
import AddTruckPage from "@/app/carrier/(protected)/trucks/add/page.jsx";
import NotFound from "@/components/ui/NotFound";



const sidebarLinks = [
  { name: 'Home', href: '/home', icon: 'ic:baseline-home', hasSubmenu: false },
  { name: 'Bookings', href: '/bookings', icon: 'uis:calendar', hasSubmenu: false },
  { name: 'Trucks', href: '/trucks', icon: 'fa6-solid:truck-moving', hasSubmenu: false },
  { name: 'Subscriptions', href: '/subscriptions', icon: 'material-symbols:subscriptions', hasSubmenu: false },
  { name: 'Payments', href: '/payments', icon: 'solar:card-bold', hasSubmenu: false },
  { name: 'Profile', href: '/profile', icon: 'ic:baseline-person', hasSubmenu: false },
  { name: 'Support', href: '/support', icon: 'fluent:person-support-32-filled', hasSubmenu: false },
  { name: 'Settings', href: '/settings', icon: 'material-symbols:settings', hasSubmenu: false },
];

const currentUser = userData.users.find((u) => u.id === "john-smith");

export const carrierRoutes = (
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
      </Route>
      <Route path="/carrier-profile" element={<CarrierProfilePage />} />
      <Route path="/payment-plan">
        <Route index element={<PaymentPlanPage />} />
        <Route path=":planId" element={<PaymentPage />} />
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
      <Route path="/home">
        <Route index element={<CarrierHome />} />
        <Route path="previous-bookings" element={<PreviousBookingsPage />} />
        <Route path=":id" element={<DriverDetailPage />} />
        <Route path=":id/book" element={<BookDriverPage />} />
      </Route>

      {/* Bookings */}
      <Route path="/bookings">
        <Route index element={<BookingsPage />} />
        {/* Static routes above dynamic param */}
        <Route path="profile/:escortId" element={<BookingProfilePage />} />
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
        <Route path="payment" element={<SubscriptionPaymentPage />} />
      </Route>

      {/* Support */}
      <Route path="/support">
        <Route index element={<SupportPage />} />
        <Route path="create-ticket" element={<CreateTicketPage />} />
      </Route>

      {/* Trucks */}
      <Route path="/trucks">
        <Route index element={<TrucksPage />} />
        {/* Static route above dynamic param */}
        <Route path="add" element={<AddTruckPage />} />
        <Route path=":id">
          <Route index element={<TruckDetailsPage />} />
          <Route path="edit" element={<EditTruckPage />} />
        </Route>
      </Route>
    </Route>

    {/* Catch-all 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);