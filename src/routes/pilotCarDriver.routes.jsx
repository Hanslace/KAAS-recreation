import { Route, Routes } from "react-router";
import NotFound from "@/components/ui/NotFound";


export const pilotCarDriverRoutes  = (
  <Routes>

    <Route path="*" element={<NotFound />} />
  </Routes>
);