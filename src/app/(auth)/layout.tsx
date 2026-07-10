import Image from "next/image";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full ">
      <section className="lg:grid min-h-screen w-full flex flex-col lg:grid-cols-2">
        {/* Left Image */}
        <div className="relative hidden w-full lg:block">
          <Image
            src="/auth-bg.png"
            alt="Login background"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/75" />

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
        <div className=" w-full lg:m-auto space-y-10 lg:max-w-[33vw] p-10">
          <div className="lg:hidden mt-20  flex items-center justify-center ">
            <Image
              src="/logo.png"
              alt="Kaas Logo"
              width={520}
              height={220}
              priority
              className="h-auto w-full max-w-[13rem] object-contain"
            />
          </div>
          
          {children}
        </div>
      </section>
    </main>
  );
}