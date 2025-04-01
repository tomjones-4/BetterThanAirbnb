import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const ListingPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [images, setImages] = useState<{ image_url: string }[]>([]);

  useEffect(() => {
    const fetchListingData = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching listing:", error);
        // TODO: Display user-friendly error message
        alert("Failed to fetch listing. Please try again.");
      } else {
        console.log("Listing data:", data);
        setListing(data);
      }

      // Fetch images for this listing
      const { data: imageData, error: imageError } = await supabase
        .from("images")
        .select("image_url")
        .eq("listing_id", id);

      if (imageData && !imageError) {
        setImages(imageData);
      }
    };

    fetchListingData();
  }, [id]);

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{listing.name}</CardTitle>
        <CardDescription>{listing.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Address:</strong> {listing.address}
        </p>
        <p>
          <strong>Price:</strong> {listing.price}
        </p>
        <p>
          <strong>Property Type:</strong> {listing.property_type}
        </p>
        <p>
          <strong>Bedrooms:</strong> {listing.bedrooms}
        </p>
        <p>
          <strong>Bathrooms:</strong> {listing.bathrooms}
        </p>
        <p>
          <strong>Max Guests:</strong> {listing.max_guests}
        </p>
        <p>
          <strong>Start Date:</strong> {listing.start_date}
        </p>
        <p>
          <strong>End Date:</strong> {listing.end_date}
        </p>
        <p>
          <strong>Amenities:</strong>{" "}
          {listing.amenities ? listing.amenities.join(", ") : "N/A"}
        </p>
        <div>
          <strong>Images:</strong>
          <div className="flex">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.image_url}
                alt={`Property ${index + 1}`}
                className="w-32 h-32 object-cover rounded-md mr-2"
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingPage;
