import { notFound } from 'next/navigation';

import CarrierDetailsContent from '@/components/CarrierDetailsContent';
import carrierData from '@/data/carriers.json';

interface PageProps {
  params: Promise<{
    carrierId: string;
  }>;
}

export default async function Page({
  params,
}: PageProps) {
  const { carrierId } = await params;

  const currentCarrier = carrierData.tableData.find(
    (carrier) => carrier.slug === carrierId,
  );

  if (!currentCarrier) {
    notFound();
  }

  return (
    <CarrierDetailsContent
      currentCarrier={currentCarrier}
    />
  );
}