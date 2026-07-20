import LoginPage from "@/components/shared/pages/login";


import { Link } from "react-router"; // Import the navigate for programmatic navigation

import { Icon } from "@iconify/react";



export default function Page() {

  return (
    <div className="md:relative space-y-[2em] flex flex-col justify-center md:min-h-[calc(100vh-80px)] ">
      
      <div className="space-y-[2em] ">
        <LoginPage/>

        <span className="flex justify-center auth-sub-heading">OR</span>

        <div className="flex items-center justify-center gap-[2em]">
          <button
            type="button"
            aria-label="Continue with Google"
            className="flex  items-center justify-center rounded-2xl bg-white shadow-lg transition hover:shadow-lg"
          >
            <Icon icon="flat-color-icons:google" className="auth-options-button" />
          </button>

          <button
            type="button"
            aria-label="Continue with Apple"
            className="flex  items-center justify-center rounded-2xl bg-white shadow-lg transition hover:shadow-lg"
          >
            <Icon icon="ic:baseline-apple" className="auth-options-button text-black" />
          </button>
        </div>
      </div>


      <div className="flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-5">
        <span className="auth-sub-heading ">
          Don't have an account? <Link className="text-brand" to={"/sign-up"}>Sign Up</Link>
        </span>
      </div>

    </div>
  );
}
