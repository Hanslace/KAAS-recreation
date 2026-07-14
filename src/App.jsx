import { Navigate, Route, Routes } from "react-router";

// Auth layout and pages
import AuthLayout from "@/app/(auth)/layout.jsx";
import LoginPage from "@/app/(auth)/login/page.jsx";
import ForgotPasswordPage from "@/app/(auth)/forgot-password/page.jsx";
import ForgotPasswordOtpPage from "@/app/(auth)/forgot-password/otp/page.jsx";
import ResetPasswordPage from "@/app/(auth)/forgot-password/reset/page.jsx";

// Protected layout
import ProtectedLayout from "@/app/(protected)/layout.jsx";

// Dashboard
import DashboardPage from "@/app/(protected)/dashboard/page.jsx";

// Bookings
import BookingsPage from "@/app/(protected)/bookings/page.jsx";
import BookingDetailsPage from "@/app/(protected)/bookings/[slug]/page.jsx";

// Carrier management
import CarrierManagementPage from "@/app/(protected)/carrier-management/page.jsx";
import CarrierDetailsPage from "@/app/(protected)/carrier-management/CarrierDetailsPage.jsx";
import TruckDetailsPage from "@/app/(protected)/carrier-management/TruckDetailsPage.jsx";

// Notifications
import NotificationsPage from "@/app/(protected)/notifications/page.jsx";

// Pilot car management
import CompanyDriversPage from "@/app/(protected)/pilot-car-management/company-drivers/page.jsx";
import CompanyDriverDetailsPage from "@/app/(protected)/pilot-car-management/company-drivers/[driverid]/page.jsx";
import IndividualDriversPage from "@/app/(protected)/pilot-car-management/individual-drivers/page.jsx";
import IndividualDriverDetailsPage from "@/app/(protected)/pilot-car-management/individual-drivers/[driverid]/page.jsx";
import ManagersPage from "@/app/(protected)/pilot-car-management/managers/page.jsx";
import ManagerDetailsPage from "@/app/(protected)/pilot-car-management/managers/[managerid]/page.jsx";
import ManagerEscortsPage from "@/app/(protected)/pilot-car-management/managers/[managerid]/escorts/page.jsx";
import ManagerEscortDetailsPage from "@/app/(protected)/pilot-car-management/managers/[managerid]/escorts/[escortid]/page.jsx";

// Settings
import SettingsPage from "@/app/(protected)/settings/page.jsx";
import SettingsContentPage from "@/app/(protected)/settings/[slug]/page.jsx";
import ChangePasswordPage from "@/app/(protected)/settings/change-password/page.jsx";
import DeletedAccountsPage from "@/app/(protected)/settings/deleted-accounts/page.jsx";
import DeletedAccountDetailsPage from "@/app/(protected)/settings/deleted-accounts/[slug]/page.jsx";

// Subscriptions
import SubscriptionsPage from "@/app/(protected)/subscriptions/page.jsx";
import SubscriptionDetailsPage from "@/app/(protected)/subscriptions/[slug]/page.jsx";
import SubscriptionEarningPage from "@/app/(protected)/subscriptions/earning/page.jsx";

// Support
import SupportPage from "@/app/(protected)/support/page.jsx";
import SupportDetailsPage from "@/app/(protected)/support/[slug]/page.jsx";

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

export default function App() {
  return (
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
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/bookings">
          <Route index element={<BookingsPage />} />
          <Route path=":slug" element={<BookingDetailsPage />} />
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
}
