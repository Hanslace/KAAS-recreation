import BookingsCard from './BookingsCard'; // Adjust path based on your file structure



export default function BookingsGrid({ bookingsList }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 min-[120rem]:grid-cols-4 gap-3">
      {bookingsList.map((card) => (
        // Assumes your items contain an 'id' or fallback to unique slugs
        <BookingsCard key={card.slug} booking={card} />
      ))}
    </div>
  );
}
