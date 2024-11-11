
import { Navigation } from "@/components/Navigation";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, Calendar, DollarSign } from "lucide-react";
import { mockProperties } from "@/data/mockData";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-down">
            Find Your Perfect Home Away from Home
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-up">
            Discover beautiful places to stay, connect with hosts, and book your next adventure with confidence.
          </p>
          <div className="mb-12 animate-fade-up">
            <SearchBar />
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-up">
            <Button size="lg" className="w-full md:w-auto">
              Start Exploring
              <ChevronRight className="ml-2" size={20} />
            </Button>
            <Button variant="outline" size="lg" className="w-full md:w-auto">
              List Your Property
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-2xl space-y-4 animate-fade-up">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Find the Perfect Location</h3>
              <p className="text-gray-600">
                Search properties in your desired location with our intuitive map interface.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl space-y-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Flexible Booking</h3>
              <p className="text-gray-600">
                Book your stay with flexible dates and easy cancellation options.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl space-y-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Transparent Pricing</h3>
              <p className="text-gray-600">
                See all costs upfront with no hidden fees or surprises.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
