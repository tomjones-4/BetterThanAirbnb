import { Link } from "react-router-dom";
import { mockProperties } from "@/data/mockData";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { Property } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useListings } from "@/hooks/useListings"; // Import the new hook

const Index = () => {
  // Use the custom hook to fetch listings
  const { dbListings, loading, error } = useListings();

  // Combine DB listings and mock listings, prioritizing DB listings
  // Filter mocks to avoid duplicates if IDs overlap (unlikely but safe)
  // Ensure mockProperties also conform to the Property type structure if needed
  const dbListingIds = new Set(dbListings.map((listing) => listing.id));
  const combinedProperties: Property[] = [
    // Explicitly type the combined array
    ...dbListings,
    ...mockProperties.filter((mock) => !dbListingIds.has(mock.id)), // Assuming mockProperties are compatible with Property type
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col md:pt-20">
      {/* Search section - full width on mobile, left half on desktop */}
      <div className="w-full md:w-1/2 md:fixed md:top-0 md:left-0 md:h-screen bg-gray-50 p-6 md:p-10 flex flex-col justify-start items-center pt-20 md:pt-44">
        <div className="w-full max-w-sm md:max-w-4xl mx-auto text-center">
          <h1 className="hidden md:block text-3xl md:text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Find your perfect place to stay
          </h1>
          <p className="hidden md:block mt-4 md:mt-6 text-base md:text-lg leading-7 md:leading-8 text-gray-600">
            Discover and book unique accommodations around the world
          </p>
          <div className="mt-0 md:mt-10 w-full">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Properties section - full width on mobile, right half on desktop */}
      <div className="w-full md:w-1/2 md:ml-auto p-6 md:p-10 md:h-screen md:overflow-y-auto md:pt-20 mt-6 md:mt-0">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 z-10">
          Available Properties
        </h2>
        {loading && (
          <div className="space-y-4 md:space-y-6">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-[120px] w-full rounded-lg" />
            ))}
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {!loading && !error && (
          <div className="space-y-4 md:space-y-6">
            {combinedProperties.length > 0 ? (
              combinedProperties.map((property) => (
                <Link
                  key={property.id}
                  to={`/listings/${property.id}`}
                  className="block hover:bg-gray-50 rounded-lg transition-colors duration-150" // Added hover effect and link styling
                >
                  <PropertyCard property={property} compact={true} />
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No properties found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
