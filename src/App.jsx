
import { adminRoutes } from "./routes/admin.routes";
import { carrierRoutes } from "./routes/carrier.routes";



export default function App() {
  const role = import.meta.env.VITE_APP_ROLE ?? "admin";

  if (role === "carrier"){
    return (
      carrierRoutes
    );
  }


  return adminRoutes;
}
