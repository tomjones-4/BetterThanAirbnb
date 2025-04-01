import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const ListingPage = () => {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [images, setImages] = useState<{ image_url: string }[]>([]);

  useEffect(() => {
    const fetchListingData = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("address", listingId)
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
        .eq("listing_id", listingId);

      if (imageData && !imageError) {
        setImages(imageData);
      }
    };

    fetchListingData();
  }, [listingId]);

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Listing Details</h1>
      <p>Address: {listing.address}</p>
      <p>Price: {listing.price}</p>
      <p>From Date: {listing.start_date}</p>
      <p>To Date: {listing.end_date}</p>
      <p>Amenities: {listing.amenities.join(", ")}</p>
      {images.map((image, index) => (
        <img key={index} src={image.image_url} alt={`Property ${index + 1}`} />
      ))}
    </div>
  );
};

export default ListingPage;
