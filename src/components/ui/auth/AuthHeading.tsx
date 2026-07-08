type AuthHeadingProps = {
  text: string;
};

export default function AuthHeading({ text }: AuthHeadingProps) {
  return (
    <h1 className="mb-3 text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]  font-bold text-brand">
      {text}
    </h1>
  );
}