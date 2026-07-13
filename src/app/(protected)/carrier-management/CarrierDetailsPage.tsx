
import CarrierDetailsContent from '@/components/CarrierDetailsContent';
import NotFound from '@/components/ui/NotFound';
import carrierData from '@/data/carriers.json';
import { useParams } from 'react-router';


export default async function Page() {
  const { carrierid } = useParams<{
    carrierid: string;
  }>();

  const currentCarrier = carrierData.tableData.find(
    (carrier) => carrier.slug === carrierid,
  );

  if (!currentCarrier) {
     return (
      <NotFound/>
    );
  }

  return (
    <CarrierDetailsContent
      currentCarrier={currentCarrier}
    />
  );
}