
import { Property } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PropertyAvailability } from "./PropertyAvailability";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const PropertyCard = ({ property, onMouseEnter, onMouseLeave }: PropertyCardProps) => {
  const [showAvailability, setShowAvailability] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <Card 
      className="overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link to={`/properties/${property.id}`}>
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={1}>
            <img
              src={property.images[0]}
              alt={property.title}
              className="object-cover w-full h-full rounded-xl hover:opacity-90 transition-opacity"
            />
          </AspectRatio>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 hover:scale-110 transition-transform"
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
          >
            <Heart className={`h-6 w-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </Button>
        </CardHeader>
        <CardContent className="pt-4 px-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold line-clamp-1">{property.title}</h3>
            <div className="flex items-center gap-1">
              <span>★</span>
              <span className="font-medium">{property.rating}</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-1">{property.location.city}, {property.location.state}</p>
          <p className="text-gray-500 text-sm mb-2">Available dates</p>
          <p>
            <span className="font-semibold">${property.price}</span>
            <span className="text-gray-500"> night</span>
          </p>
        </CardContent>
      </Link>
      <CardFooter className="px-1 pt-0">
        {showAvailability && <PropertyAvailability property={property} />}
      </CardFooter>
    </Card>
  );
};
