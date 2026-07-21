import { Outlet } from 'react-router';

export default function LoginLayout() {
  return (
    <main className="min-h-screen w-full ">
      <section className="md:grid min-h-screen  w-full flex flex-col md:grid-cols-2">
        {/* Left Image */}
        <div className="relative hidden max-h-screen w-full md:block">
          <img
            src="/auth-bg.png"
            alt="Login background"
            fetchPriority="high" 
            className="h-full  w-full object-cover" 
          />

          <div className="absolute inset-0 bg-black/75" />

          <div className="absolute inset-0 flex items-center justify-center px-10">
            <img
              src="/logo.png"
              alt="Kaas Logo"
              width={520}
              height={220}
              fetchPriority="high"
              className="h-auto w-full max-w-[22vw] object-contain"
            />

          </div>
        </div>

        

        {/* Right Column */}
        <div className=" w-full md:m-auto md:max-h-screen space-y-10 md:max-w-[35vw] p-10 ">
          <div className="md:hidden mt-20  flex items-center justify-center ">
            <img
              src="/logo.png"
              alt="Kaas Logo"
              width={520}
              height={220}
              fetchPriority='high'
              className="h-auto w-full max-w-[13rem] object-contain"
            />
          </div>
          
          <Outlet/>
        </div>
      </section>
    </main>
  );
}