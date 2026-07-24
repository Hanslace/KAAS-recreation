import { Route, Routes } from "react-router";
import NotFound from "@/components/ui/NotFound";

export const pilotCarIndividualRoutes = (
  <Routes>
    <Route path="*" element={<NotFound />} />
  </Routes>
);
