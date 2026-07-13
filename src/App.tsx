import { Navigate, Route, Routes } from "react-router";

// Auth layout and pages
import AuthLayout from "./app/(auth)/layout";
import LoginPage from "./app/(auth)/login/page";
import ForgotPasswordPage from "./app/(auth)/forgot-password/page";
import ForgotPasswordOtpPage from "./app/(auth)/forgot-password/otp/page";
import ResetPasswordPage from "./app/(auth)/forgot-password/reset/page";

// Protected layout
import ProtectedLayout from "./app/(protected)/layout";

// Dashboard
import DashboardPage from "./app/(protected)/dashboard/page";

// Bookings
import BookingsPage from "./app/(protected)/bookings/page";
import BookingDetailsPage from "./app/(protected)/bookings/[slug]/page";

// Carrier management
import CarrierManagementPage from "./app/(protected)/carrier-management/page";
import CarrierDetailsPage from "./app/(protected)/carrier-management/[carrierid]/page";
import TruckDetailsPage from "./app/(protected)/carrier-management/[carrierid]/truck/[truckid]/page";

// Notifications
import NotificationsPage from "./app/(protected)/notifications/page";

// Pilot car management

import CompanyDriversPage from "./app/(protected)/pilot-car-management/company-drivers/page";
import CompanyDriverDetailsPage from "./app/(protected)/pilot-car-management/company-drivers/[driverid]/page";

import IndividualDriversPage from "./app/(protected)/pilot-car-management/individual-drivers/page";
import IndividualDriverDetailsPage from "./app/(protected)/pilot-car-management/individual-drivers/[driverid]/page";

import ManagersPage from "./app/(protected)/pilot-car-management/managers/page";
import ManagerDetailsPage from "./app/(protected)/pilot-car-management/managers/[managerid]/page";
import ManagerEscortDetailsPage from "./app/(protected)/pilot-car-management/managers/[managerid]/escorts/[escortid]/page";
import ManagerEscortsPage from "./app/(protected)/pilot-car-management/managers/[managerid]/escorts/page";

// Settings
import SettingsPage from "./app/(protected)/settings/page";
import SettingsContentPage from "./app/(protected)/settings/[slug]/page";
import ChangePasswordPage from "./app/(protected)/settings/change-password/page";
import DeletedAccountsPage from "./app/(protected)/settings/deleted-accounts/page";
import DeletedAccountDetailsPage from "./app/(protected)/settings/deleted-accounts/[slug]/page";

// Subscriptions
import SubscriptionsPage from "./app/(protected)/subscriptions/page";
import SubscriptionDetailsPage from "./app/(protected)/subscriptions/[slug]/page";
import SubscriptionEarningPage from "./app/(protected)/subscriptions/earning/page";

// Support
import SupportPage from "./app/(protected)/support/page";
import SupportDetailsPage from "./app/(protected)/support/[slug]/page";

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
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/bookings">
          <Route index element={<BookingsPage />} />
          <Route path=":slug" element={<BookingDetailsPage />} />
        </Route>

        <Route path="/carrier-management">
          <Route index element={<CarrierManagementPage />} />

          <Route
            path=":carrierid"
            element={<CarrierDetailsPage />}
          />

          <Route
            path=":carrierid/truck/:truckid"
            element={<TruckDetailsPage />}
          />
        </Route>

        <Route
          path="/notifications"
          element={<NotificationsPage />}
        />

        <Route path="/pilot-car-management">

          <Route path="company-drivers">
            <Route index element={<CompanyDriversPage />} />

            <Route
              path=":driverid"
              element={<CompanyDriverDetailsPage />}
            />
          </Route>

          <Route path="individual-drivers">
            <Route index element={<IndividualDriversPage />} />

            <Route
              path=":driverid"
              element={<IndividualDriverDetailsPage />}
            />
          </Route>

          <Route path="managers">
            <Route index element={<ManagersPage />} />

            <Route
              path=":managerid"
              element={<ManagerDetailsPage />}
            />
            <Route
              path=":managerid/escorts"
              element={<ManagerEscortsPage />}
            />

            <Route
              path=":managerid/escorts/:escortid"
              element={<ManagerEscortDetailsPage />}
            />
          </Route>
        </Route>

        <Route path="/settings">
          <Route index element={<SettingsPage />} />

          <Route
            path="change-password"
            element={<ChangePasswordPage />}
          />

          <Route path="deleted-accounts">
            <Route index element={<DeletedAccountsPage />} />

            <Route
              path=":slug"
              element={<DeletedAccountDetailsPage />}
            />
          </Route>

          <Route
            path=":slug"
            element={<SettingsContentPage />}
          />
        </Route>

        <Route path="/subscriptions">
          <Route index element={<SubscriptionsPage />} />

          <Route
            path="earning"
            element={<SubscriptionEarningPage />}
          />

          <Route
            path=":slug"
            element={<SubscriptionDetailsPage />}
          />
        </Route>

        <Route path="/support">
          <Route index element={<SupportPage />} />

          <Route
            path=":slug"
            element={<SupportDetailsPage />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}