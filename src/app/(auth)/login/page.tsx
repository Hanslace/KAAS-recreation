import AuthInput from "@/components/ui/auth/AuthInput";
import AuthButton from "@/components/ui/auth/AuthButton";

export default function LoginPage() {
  return (
    <div className="w-full max-w-[400px]">
      <h1 className="mb-3 text-center text-[34px] font-bold text-brand">
        Welcome Back!
      </h1>

      <p className="mb-10 text-center text-sm text-black/50">
        Please enter your credentials
      </p>

      <form className="space-y-6">
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          icon="mail"
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon="lock"
          showToggle
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[12px] text-black/50">
            <input type="checkbox" className="peer sr-only" />

            <span className="flex h-4 w-4 cursor-pointer items-center justify-center rounded border border-[#C0A86C] bg-white peer-checked:bg-[#C0A86C] peer-checked:[&>svg]:block">
                <svg
                className="hidden h-3 w-3 text-white"
                viewBox="0 0 20 20"
                fill="none"
                >
                <path
                    d="M5 10.5L8.2 13.5L15 6.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                </svg>
            </span>

            Remember Me
            </label>

          <button
            type="button"
            className="text-[12px] font-medium text-brand transition hover:text-brand-dark"
          >
            Forgot Password?
          </button>
        </div>

        <AuthButton type="submit">Login</AuthButton>
      </form>
    </div>
  );
}