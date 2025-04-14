import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  BedDouble,
  Bath,
  Users,
  CalendarDays,
  DollarSign,
  FileText,
  Info,
  Asterisk,
} from "lucide-react";
import { Tables } from "@/integrations/supabase/types"; // Import the correct type
import {
  Wifi,
  GlassWater,
  ParkingSquare,
  Utensils,
  Shirt,
  Dumbbell,
  PawPrint,
  Wind,
  Flame,
  Tv,
} from "lucide-react";

const ListingPage = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Tables<"listings"> | null>(null); // Use the specific type
  const [images, setImages] = useState<{ image_url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListingData = async () => {
      setLoading(true);
      setError(null);
      if (!id) {
        setError("Listing ID is missing.");
        setLoading(false);
        return;
      }

      try {
        // Fetch listing details
        const { data: listingData, error: listingError } = await supabase
          .from("listings")
          .select("*")
          .eq("id", id)
          .single();

        if (listingError) throw listingError;
        if (!listingData) throw new Error("Listing not found.");

        setListing(listingData);

        // Fetch images for this listing
        const { data: imageData, error: imageError } = await supabase
          .from("images")
          .select("image_url")
          .eq("listing_id", id);

        if (imageError) throw imageError;

        setImages(imageData || []);
      } catch (err: unknown) {
        // Use unknown for better type safety
        console.error("Error fetching listing:", err);
        let errorMessage = "Failed to fetch listing data. Please try again.";
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "string") {
          errorMessage = err;
        }
        setError(errorMessage);
        setListing(null); // Clear listing data on error
      } finally {
        setLoading(false);
      }
    };

    fetchListingData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-96 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!listing) {
    // This case should ideally be handled by the error state,
    // but added as a fallback. Could redirect to a NotFound page.
    return (
      <div className="container mx-auto p-4 md:p-8">
        <Alert>
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>
            The requested listing could not be found.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Safely format dates
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "PPP"); // Example format: Jan 1, 2024
    } catch {
      return "Invalid Date";
    }
  };

  // Define a mapping of amenity names to icons
  const amenityIcons = {
    wifi: Wifi,
    pool: GlassWater,
    Parking: ParkingSquare,
    kitchen: Utensils,
    Laundry: Shirt,
    Gym: Dumbbell,
    "Pet Friendly": PawPrint,
    "Air Conditioning": Wind,
    Heating: Flame,
    Tv: Tv,
  };

  return (
    <div className="container mx-auto p-4 md:p-8 pt-24 md:pt-32 overflow-x-hidden overflow-y-auto">
      <Card className="overflow-hidden shadow-2xl border-0 rounded-xl">
        <CardHeader className="pb-4">
          {/* Conditionally render name */}
          {listing.name && (
            <CardTitle className="text-3xl font-bold">{listing.name}</CardTitle>
          )}
          {/* Conditionally render address */}
          {listing.address && (
            <CardDescription className="text-lg text-muted-foreground flex items-center gap-2 pt-1">
              <MapPin className="h-5 w-5" /> {listing.address}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Image Carousel (Left/Top on Mobile) */}
          <div className="md:col-span-3">
            {images.length > 0 ? (
              <Carousel className="w-full rounded-xl overflow-hidden border">
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <img
                        src={image.image_url}
                        alt={`Property ${index + 1}`}
                        className="w-full h-[400px] object-cover" // Increased height
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {images.length > 1 && ( // Only show controls if more than one image
                  <>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
                  </>
                )}
              </Carousel>
            ) : (
              // Better placeholder with gradient background
              <div className="w-full h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center overflow-hidden border">
                <div className="text-center p-8">
                  <img
                    src="https://placehold.co/600x400/e5e7eb/a1a1aa?text=Property+Image"
                    alt="Property Placeholder"
                    className="w-full max-w-md mx-auto rounded-md shadow-md"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Details (Right/Bottom on Mobile) */}
          <div className="md:col-span-2 space-y-6">
            {/* Conditionally render description */}
            {listing.description && (
              <>
                <div className="space-y-2">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <FileText className="h-5 w-5 text-primary" /> Description
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {listing.description}
                  </p>
                </div>
                <Separator className="my-4" />
              </>
            )}

            {(listing.price ||
              listing.bedrooms ||
              listing.bathrooms ||
              listing.max_guests ||
              listing.property_type) && (
              <>
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <Info className="h-5 w-5 text-primary" /> Property Details
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm bg-slate-50 p-4 rounded-lg">
                    {listing.price && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />{" "}
                        <strong>Price:</strong> ${listing.price} / night
                      </div>
                    )}
                    {listing.bedrooms && (
                      <div className="flex items-center gap-2">
                        <BedDouble className="h-4 w-4 text-primary" />{" "}
                        <strong>Bedrooms:</strong> {listing.bedrooms}
                      </div>
                    )}
                    {listing.bathrooms && (
                      <div className="flex items-center gap-2">
                        <Bath className="h-4 w-4 text-primary" />{" "}
                        <strong>Bathrooms:</strong> {listing.bathrooms}
                      </div>
                    )}
                    {listing.max_guests && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />{" "}
                        <strong>Max Guests:</strong> {listing.max_guests}
                      </div>
                    )}
                    {listing.property_type && (
                      <div className="col-span-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />{" "}
                        <strong>Type:</strong> {listing.property_type}
                      </div>
                    )}
                  </div>
                </div>
                <Separator className="my-4" />
              </>
            )}

            {(listing.start_date || listing.end_date) && (
              <>
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <CalendarDays className="h-5 w-5 text-primary" />{" "}
                    Availability
                  </h3>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    {listing.start_date && (
                      <p className="text-sm mb-2">
                        <strong>From:</strong> {formatDate(listing.start_date)}
                      </p>
                    )}
                    {listing.end_date && (
                      <p className="text-sm">
                        <strong>To:</strong> {formatDate(listing.end_date)}
                      </p>
                    )}
                  </div>
                </div>
                <Separator className="my-4" />
              </>
            )}

            {listing.amenities && listing.amenities.length > 0 && (
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <Asterisk className="h-5 w-5 text-primary" /> Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((amenity: string, index: number) => {
                    const Icon = amenityIcons[amenity];
                    return Icon ? (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="py-2 px-3"
                      >
                        <Icon className="h-4 w-4 mr-1" />
                        {amenity}
                      </Badge>
                    ) : (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="py-2 px-3"
                      >
                        {amenity}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListingPage;
