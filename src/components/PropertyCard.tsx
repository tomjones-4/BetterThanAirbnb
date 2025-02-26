
import { Property } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PropertyAvailability } from "./PropertyAvailability";
import { PropertyPrice } from "./PropertyPrice";
import { LikeButton } from "./LikeButton";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const PropertyCard = ({ 
  property, 
  onMouseEnter, 
  onMouseLeave 
}: PropertyCardProps) => {
  const { 
    id, 
    images, 
    title, 
    rating, 
    location, 
    price 
  } = property;
  
  return (
    <Card 
      className="overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link to={`/properties/${id}`}>
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={1}>
            <img
              src={images[0]}
              alt={title}
              className="object-cover w-full h-full rounded-xl hover:opacity-90 transition-opacity"
            />
          </AspectRatio>
          <LikeButton className="absolute top-2 right-2" />
        </CardHeader>
        <CardContent className="pt-4 px-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
            <div className="flex items-center gap-1">
              <span>★</span>
              <span className="font-medium">{rating}</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-1">
            {location.city}, {location.state}
          </p>
          <p className="text-gray-500 text-sm mb-2">Available dates</p>
          <PropertyPrice price={price} />
        </CardContent>
      </Link>
      <CardFooter className="px-1 pt-0">
        <PropertyAvailability property={property} />
      </CardFooter>
    </Card>
  );
};
