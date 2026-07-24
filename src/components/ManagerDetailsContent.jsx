import BookingsGrid from '@/components/shared/BookingsGrid';
import DetailsLayout from '@/components/DetailsLayout';
import DocumentsSection from '@/components/shared/DocumentsSection';
import InfoGrid from '@/components/shared/InfoGrid';
import NotFound from '@/components/ui/NotFound';
import { useParams } from 'react-router';

import bookings from '@/data/data.json';
import managerData from '@/data/managers.json';



export default function ManagerDetailsContent() {
  const { managerid } = useParams();

  const currentManager = managerData.tableData.find(
    (manager) => manager.slug === managerid,
  );

  if (!currentManager) {
    return (
      <NotFound/>
    );
  }

  const status = currentManager.status;

  return (
    <DetailsLayout
      slugName={currentManager.slug}
      status={status}
      companyName={
        currentManager.companyName ??
        currentManager.name ??
        'ABC Logistics LLC'
      }
      email={
        currentManager.email ??
        'abclogisticsas@gmail.com'
      }
      phone={
        currentManager.phoneNumber ??
        '0321 3213233'
      }
      logoSrc={
        currentManager.logo ??
        '/images/company-logo.png'
      }
      manager
    >
      <InfoGrid
        fields={[
          {
            label: 'Address',
            value:
              currentManager.address ??
              '53C, 14th Street, Empire State, USA',
          },
        ]}
      />

      <InfoGrid
        heading="Company Info"
        fields={[
          {
            label: 'MC Number',
            value:
              currentManager.mcNumber ??
              'MC-00001',
          },
          {
            label: 'DOT Number',
            value:
              currentManager.dotNumber ??
              '01234567',
          },
        ]}
      />

      <DocumentsSection />

      {status === 'Cancelled' && (
        <div>
          <h3 className="main-heading font-bold tracking-tight text-black">
            Reason:
          </h3>

          <p className="mt-2 leading-relaxed tracking-tight text-black/50">
            {currentManager.cancelReason ??
              `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
          </p>
        </div>
      )}

      <InfoGrid
        heading="Fares Info"
        fields={[
          {
            label: 'Per Day',
            value:
              currentManager.perDay ?? '$600',
          },
          {
            label: 'Per Mile',
            value:
              currentManager.perMile ?? '$2.5',
          },
          {
            label: 'Overnight',
            value:
              currentManager.overnight ?? '$800',
          },
          {
            label: 'Custom',
            value:
              currentManager.custom ?? '$200',
          },
        ]}
      />

      {status === 'Approved' && (
        <div className="mt-8 flex flex-col gap-4">
          <h2 className="main-heading font-bold tracking-tight text-black">
            Booking History
          </h2>

          {bookings.bookingsList.length > 0 ? (
            <BookingsGrid
              bookingsList={bookings.bookingsList}
            />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-16 text-center shadow-sm">
              <span className="text-sm font-semibold text-gray-400">
                No bookings found matching your current filters.
              </span>
            </div>
          )}
        </div>
      )}
    </DetailsLayout>
  );
}