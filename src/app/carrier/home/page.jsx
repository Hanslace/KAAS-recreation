import { useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import SearchBar from "@/components/ui/SearchBar";
import InputModal from "@/components/shared/modals/InputModal";
import data from "@/data/data.json";
import EscortServiceCard from "@/components/shared/cards/EscortServiceCard";

const distanceOptions = [
  { id: "50", label: "Distance: Within 50 miles" },
  { id: "100", label: "Distance: Within 100 miles" },
  { id: "120", label: "Distance: Within 120 miles" },
  { id: "150", label: "Distance: Within 150 miles" },
  { id: "custom", label: "Add Custom Distance" },
];

const ratingOptions = [
  { id: "5", label: "5★" },
  { id: "4", label: "4★ & above" },
  { id: "3", label: "3★ & above" },
  { id: "2", label: "2★ & above" },
];

const sortOptions = [
  { id: "nearest", label: "Nearest" },
  { id: "highest_rated", label: "Highest Rated" },
  { id: "lowest_price", label: "Lowest Price" },
  { id: "most_reviewed", label: "Most Reviewed" },
];

export default function CarrierHomePage() {
  const [search, setSearch] = useState("");
  const [distanceFilter, setDistanceFilter] = useState("50");
  const [ratingFilter, setRatingFilter] = useState("5");
  const [sortBy, setSortBy] = useState("nearest");

  // Custom radius modal
  const [radiusModalOpen, setRadiusModalOpen] = useState(false);
  const [customRadius, setCustomRadius] = useState(null);

  const service = {
    slug: "patriot-escort-services",
    imageUrl: "images/car.jpg",
    companyLogoUrl: "images/company-logo-2.jpg",
    companyName: "Patriot Escort Services",
    rating: 4.8,
    reviewCount: 124,
    description: "Patriot Escort Services is a U.S.-based company...",
    distanceAway: "2.5 km away",
    fares: "Per Day $600, Per Mile $2.50, Overnight $800",
  };

  const handleRadiusSubmit = (value) => {
    const trimmed = String(value).trim();
    if (!trimmed) return;              // validation now lives here

    setCustomRadius(trimmed);
    setDistanceFilter("custom");
    setRadiusModalOpen(false);         // parent closes the modal
    console.log("Custom radius:", trimmed);
  };

  const distanceOptionsWithCustom = distanceOptions.map((o) =>
    o.id === "custom"
      ? { ...o, label: customRadius ? `Custom Distance: Within ${customRadius} miles` : o.label }
      : o
  );

  return (
    <div className="space-y-6 w-full">
      <div className="flex w-full flex-wrap items-center justify-end gap-4">

        <Dropdown
          filters={distanceOptionsWithCustom}
          activeFilter={distanceFilter}
          onFilterChange={setDistanceFilter}
          onCustomSelect={() => setRadiusModalOpen(true)}
          customOptionId="custom"
          labelText=""
        />

        <Dropdown
          filters={ratingOptions}
          activeFilter={ratingFilter}
          onFilterChange={setRatingFilter}
          labelText="Filter:"
        />

        <Dropdown
          filters={sortOptions}
          activeFilter={sortBy}
          onFilterChange={setSortBy}
          labelText="Sort By:"
        />

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by name"
          className="w-full sm:max-w-xs"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 min-[120rem]:grid-cols-4 gap-3">
        {[...Array(6)].map((_, i) => (
          <EscortServiceCard key={i} service={service} />
        ))}
      </div>

      <InputModal
        open={radiusModalOpen}
        onClose={() => setRadiusModalOpen(false)}
        onSubmit={handleRadiusSubmit}
        title="Add Custom Radius"
        inputProps={{ label: "Custom Radius", type: "number", inputMode: "numeric", placeholder: "Enter Custom Radius" }}
      />
    </div>
  );
}