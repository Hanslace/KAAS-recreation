import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <main className="min-h-screen w-full md:h-screen md:overflow-hidden">
      <section className="md:grid min-h-screen md:h-full  w-full flex flex-col items-center md:grid-cols-2">
        {/* Left Image */}
        <div className="relative hidden max-h-screen w-full md:block md:sticky md:top-0 md:h-screen">
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



        <div className='custom-scrollbar md:max-h-screen md:overflow-y-auto w-full md:h-full p-10'>
          <div className=" w-full md:m-auto md:h-full space-y-10 md:max-w-[25rem] xl:max-w-[35rem]  ">
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
        </div>
      </section>
    </main>
  );
}