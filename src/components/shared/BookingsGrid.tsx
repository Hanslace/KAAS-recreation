import BookingsCard, { BookingsCardData } from './BookingsCard'; // Adjust path based on your file structure

interface BookingsGridProps {
  bookingsList: BookingsCardData[];
}

export default function BookingsGrid({ bookingsList }: BookingsGridProps) {
  return (
    <div className="grid grid-cols-1 min-[35rem]:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 py-5">
      {bookingsList.map((card) => (
        // Assumes your items contain an 'id' or fallback to unique slugs
        <BookingsCard key={card.slug} booking={card} />
      ))}
    </div>
  );
}
