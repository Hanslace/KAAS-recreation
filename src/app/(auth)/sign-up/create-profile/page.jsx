import ProfileFormPage from "@/components/shared/pages/forms/profileForm";
import BackButton from "@/components/ui/BackButton";



export default function CreateProfilePage() {
 

  return (
    <div className="gap-3 flex flex-col justify-center h-full  min-h-fit">
        <BackButton>Back</BackButton>
        <div className="mb-6">
          <h1 className="auth-heading">Create Profile</h1>
          <p className="auth-sub-heading">Please enter your Personal information</p>
        </div>
        <div className=" gap-[2.5em]  md:overflow-y-auto flex flex-col md:flex-1 md:min-h-0 custom-scrollbar md:pr-3">
          <ProfileFormPage/>
        </div>
    </div>
  );
}