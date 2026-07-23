import OtpPage from "@/components/shared/pages/otp";

export default function SignUpOtpPage() {
  const role = import.meta.env.VITE_APP_ROLE ?? "admin";

  const nextPageUrl = role.startsWith("pilot-car")
    ? "/sign-up/role-select"
    : "/sign-up/create-profile";

  return (
    <OtpPage nextPageUrl={nextPageUrl}/>
  );
}