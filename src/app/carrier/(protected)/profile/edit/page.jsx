import ProfileFormPage from "@/components/shared/pages/profileForm";
import BackButton from "@/components/ui/BackButton";



export default function CreateProfilePage() {
 

  return (
    <div className="">
      <BackButton>Edit Personal Info</BackButton>
      <ProfileFormPage mode="edit"/>
    </div>
  );
}