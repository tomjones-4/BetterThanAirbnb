
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Property } from '@/types';
import { PropertyCard } from './PropertyCard';

interface SearchResultsProps {
  properties: Property[];
  showMap?: boolean;
}

const mapContainerStyle = { width: '100%', height: '100vh' };
const defaultCenter = { lat: 40.7128, lng: -74.006 };

const SearchResults: React.FC<SearchResultsProps> = ({ properties, showMap = true }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.GOOGLE_MAPS_API_KEY || '',
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery().get("location");

  useEffect(() => {
    if (properties.length > 0) {
      setMapCenter({
        lat: properties[0].location.coordinates.lat,
        lng: properties[0].location.coordinates.lng,
      });
    }
  }, [properties]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="flex min-h-[calc(100vh-73px)]">
      <div className={`${showMap ? 'w-2/3' : 'w-full'} overflow-y-auto p-4`}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onMouseEnter={() => setSelectedProperty(property)}
              onMouseLeave={() => setSelectedProperty(null)}
            />
          ))}
        </div>
      </div>

      {showMap && (
        <div className="w-1/3 sticky top-[73px] h-[calc(100vh-73px)]">
          <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={mapCenter}>
            {properties.map((property) => (
              <Marker
                key={property.id}
                position={{
                  lat: property.location.coordinates.lat,
                  lng: property.location.coordinates.lng
                }}
                onClick={() => setSelectedProperty(property)}
                animation={selectedProperty?.id === property.id ? google.maps.Animation.BOUNCE : undefined}
              />
            ))}
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
