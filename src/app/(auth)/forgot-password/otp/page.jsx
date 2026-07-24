import OtpPage from "@/components/shared/pages/auth/otp";

export default function Page() {

  return (
    <OtpPage nextPageUrl={"/forgot-password/reset"}/>
  );
}