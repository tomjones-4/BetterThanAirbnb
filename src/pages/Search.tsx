
import SearchResults from "@/components/SearchResults";
import { mockProperties } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Sliders, Map } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { calculateDistance } from "@/utils/distance";

const Search = () => {
  const [showMap, setShowMap] = useState(true);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const location = params.get("location");
  const radius = Number(params.get("radius")) || 10;

  // Filter properties based on radius
  // Note: In a real application, this would be done on the server side
  const filteredProperties = mockProperties.filter((property) => {
    if (!location) return true;
    
    // For demo purposes, we're using the first property's coordinates as the center
    const centerLat = mockProperties[0].location.coordinates.lat;
    const centerLng = mockProperties[0].location.coordinates.lng;
    
    const distance = calculateDistance(
      centerLat,
      centerLng,
      property.location.coordinates.lat,
      property.location.coordinates.lng
    );
    
    return distance <= radius;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              Filters
            </Button>
            <span className="text-sm text-gray-500">
              {filteredProperties.length} stays found within {radius} miles
            </span>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowMap(!showMap)}
          >
            <Map className="h-4 w-4" />
            {showMap ? "Hide" : "Show"} map
          </Button>
        </div>
      </div>
      <SearchResults properties={filteredProperties} showMap={showMap} />
    </div>
  );
};

export default Search;
