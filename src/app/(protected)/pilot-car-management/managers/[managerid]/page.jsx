import ManagerDetailsContent from '@/components/ManagerDetailsContent';
import NotFound from '@/components/ui/NotFound';
import managerData from '@/data/managers.json';
import { useParams } from 'react-router';



export default async function Page() {
  const { managerid } = useParams<{
    managerid: string;
  }>();

  const currentManager =
    managerData.tableData.find(
      (manager) => manager.slug === managerid,
    );

  if (!currentManager) {
    return (
      <NotFound/>
    );
  }

  return (
    <ManagerDetailsContent
      currentManager={currentManager}
    />
  );
}