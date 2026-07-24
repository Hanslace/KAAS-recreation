import InfoGrid from '@/components/shared/InfoGrid';
import EditButton from '@/components/ui/EditButton';
import { useNavigate } from 'react-router';




export default function ProfilePage({
}) {
  const navigate = useNavigate();

  return (
    <div className='space-y-6'>
      <h2 className=" main-heading font-bold text-black tracking-tight">
          Profile
        </h2>
      <section
              className=" w-full  space-y-3 details-layout rounded-2xl p-5 shadow-lg "
            >
              <div className="flex items-center justify-between gap-4">
                <h2
                  className="main-heading font-bold tracking-tight text-black"
                >
                  Personal Info
                </h2>
                <EditButton onEdit={() => navigate('/profile/edit')} label="profile" />
                
              </div>
      
              <div className="relative flex flex-col items-center sm:items-start sm:flex-row gap-3 pb-3 after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-gray-100">
                <div className="flex h-[5em] w-[5em] shrink-0 items-center justify-center overflow-hidden rounded-full">
                  <img
                    src={"https://images.unsplash.com/photo-1783095627526-25c08072893f?w=900&auto=format&fit=crop&q=60"}
                    alt={"John Smith"}
                    width={96}
                    height={96}
                    fetchPriority='high'
                    className="h-full w-full object-cover"
                  />
                </div>
      
                <div className="flex min-w-0  items-center sm:items-start  flex-col justify-center ">
                  <h3 className="truncate main-heading font-bold tracking-tight text-black">
                    {"John Smith"}
                  </h3>
      
                  <p className="break-all tracking-tight text-black/50">
                    {"john.smith@gmail.com"}
                  </p>
      
                  <p className="tracking-tight text-black/50">
                    {"+123 456 7890"}
                  </p>
                </div>
              </div>
              <InfoGrid
                fields={[
                  {
                    label: 'Address',
                    value: '53C, 14th Street, Empire State, USA',
                  },
                ]}
              />
            </section>

      

     
          
       

      </div>

  );
}