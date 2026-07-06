import Image from "next/image";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full ">
      <section className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
        {/* Left Image */}
        <div className="relative hidden w-full lg:block">
          <Image
            src="/auth-bg.png"
            alt="Login background"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="absolute inset-0 flex items-center justify-center px-10">
            <Image
              src="/logo.png"
              alt="Kaas Logo"
              width={520}
              height={220}
              priority
              className="h-auto w-full max-w-[520px] object-contain"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex w-full items-center justify-center px-6 py-14">
          {children}
        </div>
      </section>
    </main>
  );
}