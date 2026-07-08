type AuthSubHeadingProps = {
  children: React.ReactNode;
};

export default function AuthSubHeading({ children }: AuthSubHeadingProps) {
  return (
    <p className="mb-10 text-[1rem] text-black/50">
      {children}
    </p>
  );
}