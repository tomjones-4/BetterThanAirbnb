
import { Property } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PropertyAvailability } from "./PropertyAvailability";
import { useState } from "react";

export const PropertyCard = ({ property }: { property: Property }) => {
  const [showAvailability, setShowAvailability] = useState(false);
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={property.images[0]}
            alt={property.title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{property.title}</h3>
          <span className="text-lg font-bold">${property.price}/night</span>
        </div>
        <p className="text-gray-600 mb-4">{property.description}</p>
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
      </CardContent>
      <CardFooter className="p-6 pt-0 flex-col gap-4">
        <Button onClick={() => setShowAvailability(!showAvailability)} variant="outline" className="w-full">
          {showAvailability ? "Hide Availability" : "Check Availability"}
        </Button>
        {showAvailability && <PropertyAvailability property={property} />}
      </CardFooter>
    </Card>
  );
};
