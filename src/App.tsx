import { Navigate, Route, Routes } from "react-router";

// Auth layout and pages
import AuthLayout from "./app/(auth)/layout.tsx";
import LoginPage from "./app/(auth)/login/page.tsx";
import ForgotPasswordPage from "./app/(auth)/forgot-password/page.tsx";
import ForgotPasswordOtpPage from "./app/(auth)/forgot-password/otp/page.tsx";
import ResetPasswordPage from "./app/(auth)/forgot-password/reset/page.tsx";

// Protected layout
import ProtectedLayout from "./app/(protected)/layout.tsx";

// Dashboard
import DashboardPage from "./app/(protected)/dashboard/page.tsx";

// Bookings
import BookingsPage from "./app/(protected)/bookings/page.tsx";
import BookingDetailsPage from "./app/(protected)/bookings/[slug]/page.tsx";

// Carrier management
import CarrierManagementPage from "./app/(protected)/carrier-management/page.tsx";
import CarrierDetailsPage from "./app/(protected)/carrier-management/[carrierid]/page.tsx";
import TruckDetailsPage from "./app/(protected)/carrier-management/[carrierid]/truck/[truckid]/page.tsx";

// Notifications
import NotificationsPage from "./app/(protected)/notifications/page.tsx";

// Pilot car management
import CompanyDriversPage from "./app/(protected)/pilot-car-management/company-drivers/page.tsx";
import CompanyDriverDetailsPage from "./app/(protected)/pilot-car-management/company-drivers/[driverid]/page.tsx";
import IndividualDriversPage from "./app/(protected)/pilot-car-management/individual-drivers/page.tsx";
import IndividualDriverDetailsPage from "./app/(protected)/pilot-car-management/individual-drivers/[driverid]/page.tsx";
import ManagersPage from "./app/(protected)/pilot-car-management/managers/page.tsx";
import ManagerDetailsPage from "./app/(protected)/pilot-car-management/managers/[managerid]/page.tsx";
import ManagerEscortsPage from "./app/(protected)/pilot-car-management/managers/[managerid]/escorts/page.tsx";
import ManagerEscortDetailsPage from "./app/(protected)/pilot-car-management/managers/[managerid]/escorts/[escortid]/page.tsx";

// Settings
import SettingsPage from "./app/(protected)/settings/page.tsx";
import SettingsContentPage from "./app/(protected)/settings/[slug]/page.tsx";
import ChangePasswordPage from "./app/(protected)/settings/change-password/page.tsx";
import DeletedAccountsPage from "./app/(protected)/settings/deleted-accounts/page.tsx";
import DeletedAccountDetailsPage from "./app/(protected)/settings/deleted-accounts/[slug]/page.tsx";

// Subscriptions
import SubscriptionsPage from "./app/(protected)/subscriptions/page.tsx";
import SubscriptionDetailsPage from "./app/(protected)/subscriptions/[slug]/page.tsx";
import SubscriptionEarningPage from "./app/(protected)/subscriptions/earning/page.tsx";

// Support
import SupportPage from "./app/(protected)/support/page.tsx";
import SupportDetailsPage from "./app/(protected)/support/[slug]/page.tsx";

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
