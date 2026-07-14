import BackButton from '@/components/ui/BackButton';

type NotificationItem = {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  day: string;
};

const notifications: NotificationItem[] = [
  {
    id: 1,
    title: 'Booking Requests Accepted',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    dateTime: 'March15, 2025 | 02:25PM',
    day: 'Today',
  },
  {
    id: 2,
    title: 'Fare Updates',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    dateTime: 'March15, 2025 | 02:25PM',
    day: 'Today',
  },
  {
    id: 3,
    title: 'Booking Completion',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    dateTime: 'March15, 2025 | 02:25PM',
    day: 'Today',
  },
  {
    id: 4,
    title: 'Ticket Status Update',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    dateTime: 'March15, 2025 | 02:25PM',
    day: 'Today',
  },
];

export default function NotificationsPage() {
  return (
    <div className="w-full">
      <div className="flex sm:flex-row flex-col items-center justify-between gap-4">
        <BackButton href="/dashboard" className='mr-auto'>Notifications</BackButton>

        <button
          type="button"
          className="ml-auto flex rounded-lg bg-brand-gradient px-8 py-5 text-[0.75rem] lg:text-[0.95rem] font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 "
        >
          Mark all as Read
        </button>
      </div>

      <div className="mt-6 space-y-5">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="relative flex items-center gap-4 rounded-2xl border border-black/10 bg-brand/10 transition duration-300 hover:bg-white px-4 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:px-6"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand/10 sm:h-16 sm:w-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-brand"
              >
                <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22ZM18 16v-5a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" />
              </svg>
            </div>

            <div className="min-w-0 flex-1 pr-10 sm:pr-20">
              <h3 className="text-[0.85rem] xl:text-[1rem] font-bold text-black ">
                {notification.title}
              </h3>

              <p className="mt-1 text-[0.75rem] xl:text-[0.9rem] text-black/50 truncate min-[34rem]:whitespace-normal min-[34rem]:break-words">
                {notification.description}
              </p>

              <p className="mt-1 text-[0.7rem] xl:text-[0.85rem] text-black/35 ">
                {notification.dateTime}
              </p>
            </div>

            <div className="absolute right-4 top-4 text-[0.85rem] text-black/30 sm:right-5">
              {notification.day}
            </div>

            <button
              type="button"
              className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white sm:right-5"
              aria-label="Close notification"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}