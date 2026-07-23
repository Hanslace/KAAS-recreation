import OtpPage from "@/components/shared/pages/otp";

export default function Page() {

  return (
    <OtpPage nextPageUrl={"/forgot-password/reset"}/>
  );
}