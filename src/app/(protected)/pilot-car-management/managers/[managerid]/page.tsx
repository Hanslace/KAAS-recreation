import { notFound } from 'next/navigation';

import ManagerDetailsContent from '@/components/ManagerDetailsContent';
import managerData from '@/data/managers.json';

interface PageProps {
  params: Promise<{
    managerid: string;
  }>;
}

export default async function Page({
  params,
}: PageProps) {
  const { managerid } = await params;

  const currentManager =
    managerData.tableData.find(
      (manager) => manager.slug === managerid,
    );

  if (!currentManager) {
    notFound();
  }

  return (
    <ManagerDetailsContent
      currentManager={currentManager}
    />
  );
}