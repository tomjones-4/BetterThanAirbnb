import React from "react";
import { Property } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  compact = false,
}) => {
  const { title, name, price, location, images } = property;
  const imageUrl =
    images?.[0] ||
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2";

  if (compact) {
    return (
      <Card className="mb-6 flex overflow-hidden shadow-sm">
        <img
          src={imageUrl}
          alt={title || name || "Property"}
          className="w-1/3 h-[150px] object-cover"
        />
        <div className="w-2/3 p-4">
          <h3 className="font-semibold text-xl">
            {title || name || "Property"}
          </h3>
          {location?.city && location?.state && (
            <p className="text-sm text-gray-500">
              {location.city}, {location.state}
            </p>
          )}
          <p className="mt-2 text-sm font-medium">${price}/night</p>
          <Button variant="outline" className="mt-4 text-sm" size="sm">
            Book Now
          </Button>
        </div>
      </Card>
    );
  }

  // Full-size card can be implemented here for other pages
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-64 object-cover" />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-600">
          {location.city}, {location.state}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-semibold text-lg">${price}/night</span>
          <Button>View Details</Button>
        </div>
      </div>
    </Card>
  );
};
