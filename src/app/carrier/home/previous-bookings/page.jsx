import { useState } from "react";
import { useNavigate } from "react-router";
import BackButton from "@/components/ui/BackButton";
import SearchBar from "@/components/ui/SearchBar";
import Button from "@/components/ui/BrandButton";
import BookingsCard from "@/components/shared/cards/BookingsCard";
import data from "@/data/data.json";

export default function Page() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(null);

  const bookings = data.bookingsList || [];

  const visible = search.trim()
    ? bookings.filter((b) =>
        b.companyName.toLowerCase().includes(search.toLowerCase())
      )
    : bookings;

  const handleContinue = () => {
    if (!selectedSlug) return;
    console.log("Continue with:", selectedSlug);
    navigate(`/home/escort/book`);
  };

  return (
    <div className="flex h-full flex-col space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap shrink-0">
        <BackButton>All Bookings</BackButton>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by name"
        />
      </div>

      <div className="grid flex-1 min-h-0 auto-rows-max grid-cols-1 gap-6 overflow-y-auto sm:grid-cols-2 xl:grid-cols-3 custom-scrollbar">
        {visible.map((booking) => (
          <BookingsCard
            key={booking.slug}
            booking={booking}
            selectable
            selected={selectedSlug === booking.slug}
            onSelect={setSelectedSlug}
          />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-12 text-center text-gray-400">No bookings match your search.</p>
      )}

      {/* Continue button — bottom left, enabled only when one is selected */}
      <div className="shrink-0">
        <Button
          type="button"
          onClick={handleContinue}
          disabled={!selectedSlug}
          className="shadow-lg"
        >
          Continue with Previous Booking
        </Button>
      </div>
    </div>
  );
}