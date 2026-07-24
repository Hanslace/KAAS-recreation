import ProfileFormPage from "@/components/shared/pages/forms/profileForm";
import BackButton from "@/components/ui/BackButton";



export default function CreateProfilePage() {
 

  return (
    <div className="space-y-6">
      <BackButton>Edit Personal Info</BackButton>
      <ProfileFormPage mode="edit"/>
    </div>
  );
}