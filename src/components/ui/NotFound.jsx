

import { Link, useNavigate } from "react-router";
import { Icon } from "@iconify/react";

export default function NotFound(){
  const navigate = useNavigate();
  const role = import.meta.env.VITE_APP_ROLE ?? "admin";
  const homeHref = role === "carrier" || role === "pilot-car-driver" ? "/home" : "/dashboard";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand/10">
          <Icon icon="solar:map-arrow-square-bold-duotone" className="h-10 w-10 text-brand" />
        </div>

        {/* Big 404 */}
        <h1 className="bg-brand-gradient bg-clip-text text-8xl font-bold leading-none text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-black">Page not found</h2>

        <p className="mt-3 text-black/50">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to={homeHref}
            className="flex items-center justify-center gap-2 rounded-lg bg-brand-gradient px-6 py-3 font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
          >
            <Icon icon="ic:baseline-home" className="h-5 w-5" />
            Go Home
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-6 py-3 font-bold text-black shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md active:scale-95"
          >
            <Icon icon="solar:arrow-left-linear" className="h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}