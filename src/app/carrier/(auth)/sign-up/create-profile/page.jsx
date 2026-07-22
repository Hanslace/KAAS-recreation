import ProfileFormPage from "@/components/shared/pages/profileForm";
import BackButton from "@/components/ui/BackButton";



export default function CreateProfilePage() {
 

  return (
    <div className="gap-3 flex flex-col justify-center h-full  min-h-fit">
        <BackButton href="/">Back</BackButton>
        <div className="mb-6">
          <h1 className="auth-heading">Create Profile</h1>
          <p className="auth-sub-heading">Please enter your Personal information</p>
        </div>
        <ProfileFormPage/>
    </div>
  );
}