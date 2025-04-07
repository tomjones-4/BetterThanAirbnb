import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Property } from "@/types";

export const useListings = () => {
  const [dbListings, setDbListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: dbError } = await supabase
          .from("listings")
          .select("*")
          .order("created_at", { ascending: false }); // Fetch newest first

        if (dbError) {
          throw dbError;
        }
        // Assuming the data from supabase matches the Property type structure
        setDbListings((data as Property[]) || []);
      } catch (err) {
        // Use default error type or 'unknown' and check inside
        console.error("Error fetching listings:", err);
        // Type guard or assertion if needed, otherwise access message if it's an Error
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while fetching listings.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []); // Empty dependency array means this runs once on mount

  return { dbListings, loading, error };
};
