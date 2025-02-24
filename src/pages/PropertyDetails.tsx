
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { PropertyAvailability } from "@/components/PropertyAvailability";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { BookingRequestDialog } from "@/components/BookingRequestDialog";
import { useToast } from "@/hooks/use-toast";
import { mockProperties } from "@/data/mockData"; // Temporary, will be replaced with Supabase

export const PropertyDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  // Temporary mock data query - replace with Supabase
  const { data: property, isLoading } = useQuery<Property>({
    queryKey: ["property", id],
    queryFn: () => {
      const found = mockProperties.find(p => p.id === id);
      if (!found) throw new Error("Property not found");
      return found;
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
          <img
            src={property.images[0]}
            alt={property.title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
        <div className="grid grid-cols-2 gap-4">
          {property.images.slice(1, 5).map((image, index) => (
            <AspectRatio key={index} ratio={1} className="overflow-hidden rounded-lg">
              <img src={image} alt={`${property.title} ${index + 2}`} className="object-cover w-full h-full" />
            </AspectRatio>
          ))}
        </div>
      </div>

      {/* Property Info */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <p className="text-gray-600">{property.location.city}, {property.location.state}</p>
          </div>

          <div className="flex items-center gap-4 py-4 border-y">
            <div>
              <p className="font-semibold">{property.maxGuests} guests</p>
              <p className="text-sm text-gray-600">Maximum</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <p className="font-semibold">{property.bedrooms} bedrooms</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <p className="font-semibold">{property.baths} baths</p>
              <p className="text-sm text-gray-600">Full</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">About this property</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Amenities</h2>
            <ul className="grid grid-cols-2 gap-2">
              {property.amenities.map((amenity) => (
                <li key={amenity} className="flex items-center gap-2 text-gray-600">
                  <span>•</span> {amenity}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">House Rules</h2>
            <ul className="space-y-2">
              {property.rules.map((rule) => (
                <li key={rule} className="flex items-center gap-2 text-gray-600">
                  <span>•</span> {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Booking Card */}
        <div className="sticky top-4 h-fit">
          <div className="border rounded-xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${property.price}</span>
              <span className="text-gray-600">per night</span>
            </div>

            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={property.host.avatar} alt={property.host.name} />
                <AvatarFallback>{property.host.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{property.host.name}</p>
                <p className="text-xs text-gray-500">Host</p>
              </div>
            </div>

            <PropertyAvailability property={property} />

            <Button 
              className="w-full" 
              onClick={() => setShowBookingDialog(true)}
            >
              <Calendar className="mr-2" />
              Request to Book
            </Button>
          </div>
        </div>
      </div>

      <BookingRequestDialog
        property={property}
        open={showBookingDialog}
        onOpenChange={setShowBookingDialog}
      />
    </div>
  );
};

export default PropertyDetails;
