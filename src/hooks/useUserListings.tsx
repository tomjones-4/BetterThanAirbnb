import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Property } from "@/types";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export const useUserListings = () => {
  const [userListings, setUserListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();
  const { toast } = useToast();
  const userId = session?.user?.id;

  // Get listings for the current user
  const fetchUserListings = async () => {
    if (!userId) {
      setUserListings([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from("listings")
        .select("*")
        .eq("host_id", userId)
        .order("created_at", { ascending: false });

      if (dbError) {
        throw dbError;
      }

      setUserListings((data as Property[]) || []);
    } catch (err) {
      console.error("Error fetching user listings:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while fetching your listings.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Delete a listing
  const deleteListing = async (listingId: string) => {
    if (!userId) return;

    try {
      // First delete associated images (if any)
      const { error: imageDeleteError } = await supabase
        .from("images")
        .delete()
        .eq("listing_id", listingId);

      if (imageDeleteError) {
        console.error("Error deleting listing images:", imageDeleteError);
      }

      // Then delete the listing
      const { error } = await supabase
        .from("listings")
        .delete()
        .eq("id", listingId)
        .eq("host_id", userId); // Ensure user can only delete their own listings

      if (error) {
        throw error;
      }

      // Update local state after successful delete
      setUserListings((prev) =>
        prev.filter((listing) => listing.id !== listingId)
      );

      toast({
        title: "Listing Deleted",
        description: "Your listing has been successfully deleted.",
      });
    } catch (err) {
      console.error("Error deleting listing:", err);
      toast({
        title: "Error",
        description: "Failed to delete listing. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update a listing
  const updateListing = async (
    listingId: string,
    updatedData: Partial<Property>
  ) => {
    if (!userId) return;

    try {
      // Update the listing
      const { error } = await supabase
        .from("listings")
        .update(updatedData)
        .eq("id", listingId)
        .eq("host_id", userId); // Ensure user can only update their own listings

      if (error) {
        throw error;
      }

      // Update local state after successful update
      setUserListings((prev) =>
        prev.map((listing) =>
          listing.id === listingId ? { ...listing, ...updatedData } : listing
        )
      );

      toast({
        title: "Listing Updated",
        description: "Your listing has been successfully updated.",
      });

      return true;
    } catch (err) {
      console.error("Error updating listing:", err);
      toast({
        title: "Error",
        description: "Failed to update listing. Please try again.",
        variant: "destructive",
      });

      return false;
    }
  };

  useEffect(() => {
    fetchUserListings();
  }, [userId]); // Refetch when userId changes

  return {
    userListings,
    loading,
    error,
    fetchUserListings,
    deleteListing,
    updateListing,
  };
};
