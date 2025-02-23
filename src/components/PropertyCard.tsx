
import { useState } from "react";
import { Property } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "./BookingDialog";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium">
          ${property.price}/night
        </div>
      </div>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{property.title}</CardTitle>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            <span className="text-sm font-medium">{property.rating}</span>
          </div>
        </div>
        <CardDescription className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>{property.location.city}, {property.location.state}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Up to {property.maxGuests} guests</span>
            </div>
            <div>
              {property.bedrooms} {property.bedrooms === 1 ? "bedroom" : "bedrooms"}
            </div>
            <div>
              {property.baths} {property.baths === 1 ? "bath" : "baths"}
            </div>
          </div>
          <Button 
            className="w-full"
            onClick={() => setIsBookingOpen(true)}
          >
            Check Availability
          </Button>
        </div>
      </CardContent>
      <BookingDialog 
        property={property}
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
      />
    </Card>
  );
};
