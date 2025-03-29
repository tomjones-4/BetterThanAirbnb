import { mockProperties } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";

const Index = () => {
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
        <div className="space-y-4 md:space-y-6">
          {mockProperties.slice(0, 10).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              compact={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
