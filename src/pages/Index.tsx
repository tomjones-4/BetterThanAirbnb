import { mockProperties } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex pt-20">
      <div className="fixed top-0 left-0 w-1/2 h-screen bg-gray-50 p-10 flex flex-col justify-start items-center pt-44">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Find your perfect place to stay
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover and book unique accommodations around the world
          </p>
          <div className="mt-10">
            <SearchBar />
          </div>
        </div>
      </div>
      <div className="fixed top-0 right-0 w-1/2 p-10 h-screen overflow-y-auto pt-20">
        <h2 className="text-3xl font-bold mb-8 z-10">Available Properties</h2>
        <div className="space-y-6">
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
