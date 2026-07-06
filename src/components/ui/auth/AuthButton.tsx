type AuthButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

export default function AuthButton({
  children,
  type = "button",
}: AuthButtonProps) {
  return (
    <button
      type={type}
      className="h-[52px] w-full rounded-md bg-gradient-to-r from-brand to-brand-dark text-sm font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
    >
      {children}
    </button>
  );
}