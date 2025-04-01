import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const ListingPage = () => {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
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
    };

    fetchListing();
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
      {listing.photo_urls.map((url, index) => (
        <img key={index} src={url} alt={`Listing Photo ${index + 1}`} />
      ))}
    </div>
  );
};

export default ListingPage;
