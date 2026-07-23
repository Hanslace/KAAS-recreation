
import { adminRoutes } from "./routes/admin.routes";
import { carrierRoutes } from "./routes/carrier.routes";
import { pilotCarDriverRoutes } from "./routes/pilotCarDriver.routes";
import { pilotCarIndividualRoutes } from "./routes/pilotCarIndividual.routes";
import { pilotCarManagerRoutes } from "./routes/pilotCarManager.routes";



export default function App() {
  const role = import.meta.env.VITE_APP_ROLE ?? "admin";

  if (role === "carrier"){
    return (
      carrierRoutes
    );
  }

  if (role === "pilot-car-driver"){
    return (
      pilotCarDriverRoutes
    );
  }

  if (role === "pilot-car-manager"){
    return (
      pilotCarManagerRoutes
    );
  }

  if (role === "pilot-car-indiviual"){
    return (
      pilotCarIndividualRoutes
    );
  }


  return adminRoutes;
}
