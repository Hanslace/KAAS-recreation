
import BackButton from '@/components/ui/BackButton';
import BrandPill from '@/components/ui/BrandPill';
import CloseButton from './_components/CloseButton';
import InfoCell from '@/components/ui/InfoCell';
import AttachmentImage from '@/components/ui/AttachmentImage';
import { useParams } from 'react-router';
import NotFound from '@/components/ui/NotFound';



const supportTickets = [
  {
    id: 1,
    slug: 'abc-logistics-1',
    companyName: 'ABC Logistics LLC',
    logo: '/images/company-logo.png',
    email: 'abclogistics.llc@gmail.com',
    phoneNumber: '+123 456 7890',
    subject: 'Lorem ipsum dolor sit',
    dateTime: '15 January, 2026 | 10:23 PM',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
    status: 'Pending',
    attachments: [
      '/images/liability-doc.jpg',
      '/images/liability-doc.jpg',
      '/images/liability-doc.jpg',
    ],
  },
  {
    id: 2,
    slug: 'patriot-escort-services-1',
    companyName: 'Patriot Escort Services',
    logo: '/images/company-logo.png',
    email: 'patriot.escort@gmail.com',
    phoneNumber: '+123 456 7890',
    subject: 'Lorem ipsum dolor sit',
    dateTime: '15 January, 2026 | 10:23 PM',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
    status: 'Closed',
    attachments: [
      '/images/liability-doc.jpg',
      '/images/liability-doc.jpg',
      '/images/liability-doc.jpg',
    ],
  },
  {
    id: 3,
    slug: 'abc-logistics-2',
    companyName: 'ABC Logistics LLC',
    logo: '/images/company-logo.png',
    email: 'abclogistics.llc@gmail.com',
    phoneNumber: '+123 456 7890',
    subject: 'Lorem ipsum dolor sit',
    dateTime: '15 January, 2026 | 10:23 PM',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
    status: 'Opened',
    attachments: [
      '/images/liability-doc.jpg',
      '/images/liability-doc.jpg',
    ],
  },
];





export default function SupportDetailsPage() {
  const { slug } = useParams();

  const ticket = supportTickets.find((item) => item.slug === slug);

  if (!ticket) {
    return (
      <NotFound/>
    );
  }

  const detailFields = [
    {
      label: 'Subject',
      value: ticket.subject,
    },
    {
      label: 'Date & Time',
      value: ticket.dateTime,
    },
    {
      label: 'Message',
      value: ticket.message,
    },
  ];

  return (
    <div className='space-y-10'>
      <div className="flex  w-full  items-center justify-between">
        <BackButton href="/support">Details</BackButton>

       {(ticket.status === "Pending" || ticket.status === "Opened") && <CloseButton />}
        
      
      </div>

      
          

      <div className="mt-[1.5rem]  w-full  rounded-2xl bg-white p-[1.5rem] shadow-lg space-y-10">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-[1rem] xs:text-[1.5rem] sm:text-[1.75rem] font-bold tracking-tight text-black">
            Ticket Info
          </h2>

          <BrandPill>{ticket.status}</BrandPill>
        </div>

        <div className="relative flex flex-col items-center sm:items-start sm:flex-row gap-4 pb-[1.5rem] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-gray-100">
          <div className="flex h-[5rem] w-[5rem] shrink-0 items-center justify-center overflow-hidden rounded-full bg-black">
            <img
              src={ticket.logo}
              alt={ticket.companyName}
              width={120}
              height={120}
              fetchPriority='high'
              className="h-full w-full rounded-full object-contain"
            />
          </div>

          <div className="flex min-w-0  items-center sm:items-start  flex-col justify-center gap-1">
            <h3 className="text-[1.45rem] font-bold tracking-tight text-black lg:text-[1.75rem]">
              {ticket.companyName}
            </h3>

            <p className="mt-1 truncate text-[0.95rem] tracking-tight text-black/50">
              {ticket.email}
            </p>

            <p className="mt-1 text-[0.95rem] tracking-tight text-black/50">
              {ticket.phoneNumber}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2 xl:grid-cols-[1fr_1fr_2fr]">
          {detailFields.map((field) => (
            <InfoCell key={field.label} label={field.label} value={field.value} />
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-[1.5rem] font-bold tracking-tight text-black lg:text-[1.75rem]">
            Attachments:
          </h2>

          <div className="relative mt-5 flex w-fit flex-wrap gap-4 pb-6 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray-100">
            {ticket.attachments.map((attachment, index) => (
              <AttachmentImage
                key={index}
                src={attachment}
                alt={`Attachment ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}