
import { mockProperties } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PropertyCard } from "@/components/PropertyCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Find your perfect place to stay
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover and book unique accommodations around the world
            </p>
            <div className="mt-10">
              <Button size="lg">Start Exploring</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProperties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
