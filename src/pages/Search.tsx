
import SearchResults from "@/components/SearchResults";
import { mockProperties } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Sliders, Map } from "lucide-react";
import { useState } from "react";

const Search = () => {
  const [showMap, setShowMap] = useState(true);

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
              {mockProperties.length} stays found
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
      <SearchResults properties={mockProperties} showMap={showMap} />
    </div>
  );
};

export default Search;
