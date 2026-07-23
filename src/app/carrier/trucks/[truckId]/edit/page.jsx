import { useNavigate, useParams } from "react-router";
import vehicles from "@/data/trucks.json";
import NotFound from "@/components/ui/NotFound";
import TruckForm from "@/components/shared/pages/truckForm";

export default function Page() {
  const { truckId } = useParams();
  const navigate = useNavigate();

  const vehicle = vehicles.find((v) => v.slug === truckId);
  if (!vehicle) {
    return <NotFound />;
  }

  return (
    <TruckForm
      mode="edit"
      defaultValues={{
        truckName: vehicle.name,
        mcNumber: vehicle.mcNumber,
        dotNumber: vehicle.dotNumber,
        licensePlate: vehicle.licensePlate,
        registrationNumber: vehicle.registrationNumber,
        vinNumber: vehicle.vinNumber,
      }}
      onDone={() => navigate(`/trucks/${truckId}`)}
    />
  );
}
