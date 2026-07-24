'use client';

import { useParams } from 'react-router';
import NotFound from '@/components/ui/NotFound';
import ManagerDetailsContent from '@/components/shared/pages/details/ManagerDetailsContent';
import CarrierDetailsContent from '@/components/shared/pages/details/CarrierDetails';
import carriersData from '@/data/carriers.json';
import managersData from '@/data/managers.json';

const deletedCarriers = carriersData.tableData.filter(
  (carrier) => carrier.status === 'Deleted',
);

const deletedManagers = managersData.tableData.filter(
  (manager) => manager.status === 'Deleted',
);

export default function DeletedAccountDetailsPage() {
  const { id } = useParams();

  const isCarrier = deletedCarriers.some((carrier) => carrier.slug === id);
  const isManager = deletedManagers.some((manager) => manager.slug === id);

  if (!isCarrier && !isManager) {
    return (<NotFound/>);
  }

  if (isCarrier) {
    return (<CarrierDetailsContent/>)
  }

  return (<ManagerDetailsContent/>)
}
