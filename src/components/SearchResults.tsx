import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Property } from '@/types';

// interface Listing {
//   id: number;
//   title: string;
//   image: string;
//   latitude: number;
//   longitude: number;
//   price: string;
// }

interface SearchResultsProps {
  properties: Property[];
}

const mapContainerStyle = { width: '100%', height: '100vh' };
const defaultCenter = { lat: 40.7128, lng: -74.006 }; // Default to New York

const SearchResults: React.FC<SearchResultsProps> = ({ properties }) => {
  const { isLoaded } = useLoadScript({
    //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    googleMapsApiKey: import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery().get("location"); // Extract the search term from the URL

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
    <div className="flex h-screen">
      <h1>Search Results for "{query}"</h1>
      {/* Listings Sidebar */}
      <div className="w-1/3 overflow-y-scroll p-4 border-r border-gray-300">
        <h2 className="text-2xl mb-4">Search Results</h2>
        {properties.map((property) => (
          <div
            key={property.id}
            onClick={() => setSelectedProperty(property)}
            className={`p-4 mb-4 cursor-pointer border ${
              selectedProperty?.id === property.id ? 'border-blue-500' : 'border-gray-300'
            }`}
          >
            <img src={property.images[0]} alt={property.title} className="w-full h-32 object-cover mb-2 rounded" />
            <h3 className="text-xl">{property.title}</h3>
            <p className="text-gray-600">{property.price} per night</p>
          </div>
        ))}
      </div>

      {/* Google Map */}
      <div className="flex-1">
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={mapCenter}>
          {properties.map((listing) => (
            <Marker
              key={listing.id}
              position={{ lat: listing.location.coordinates.lat, lng: listing.location.coordinates.lng }}
              onClick={() => setSelectedProperty(listing)}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default SearchResults;