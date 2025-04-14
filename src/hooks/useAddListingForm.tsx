import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Import the useAuth hook to get the current user session
import { useAuth } from "./useAuth";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  address: z.string().min(1, { message: "Address is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  amenities: z.string().array().optional(),
  property_type: z.enum(["house", "condo"]).optional(),
  bedrooms: z.number().min(1).optional(),
  bathrooms: z.number().min(1).optional(),
  max_guests: z.number().min(1).optional(),
  start_date: z.date({ required_error: "Start Date is required" }),
  end_date: z.date({ required_error: "End Date is required" }),
  photos: z.any(), // File array
});

type FormData = z.infer<typeof schema>;

const useAddListingForm = () => {
  const [loading, setLoading] = useState(false);
  // Get the current user session from useAuth
  const { session } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      price: "",
      amenities: [],
      property_type: "house",
      bedrooms: 1,
      bathrooms: 1,
      max_guests: 1,
      start_date: undefined,
      end_date: undefined,
      photos: [],
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const maxSize = 2 * 1024 * 1024; // 2MB

      const validFiles = files.filter((file) => {
        if (file.size > maxSize) {
          alert("Image size must be less than 2MB");
          return false;
        }
        return true;
      });
      setValue("photos", validFiles);
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    // Check if user is logged in
    if (!session || !session.user) {
      alert("You must be logged in to create a listing.");
      setLoading(false);
      return;
    }

    const userId = session.user.id;

    try {
      const uploadPhotos = async (photos: File[]) => {
        const photoUrls: string[] = [];
        const formData = data;
        for (const photo of photos) {
          const { data: uploadData, error } = await supabase.storage
            .from("listings")
            .upload(`${formData.address}/${photo.name}`, photo, {
              cacheControl: "3600",
              upsert: false,
            });

          if (error) {
            console.error("Error uploading photo:", error);
            alert("Failed to upload photo. Please try again.");
            return null;
          } else {
            console.log("Photo uploaded:", uploadData);
            const url = `https://betterthanairbnb.supabase.co/storage/v1/object/public/${uploadData.path}`;
            photoUrls.push(url);
          }
        }
        return photoUrls;
      };

      const photoUrls = await uploadPhotos(data.photos);

      const { data: listingData, error } = await supabase
        .from("listings")
        .insert([
          {
            name: data.name,
            description: data.description,
            address: data.address,
            price: parseInt(data.price),
            amenities: data.amenities,
            property_type: data.property_type,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            max_guests: data.max_guests,
            start_date: data.start_date.toISOString(),
            end_date: data.end_date.toISOString(),
            host_id: userId, // Add the host_id (user ID) to the listing
          },
        ])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        alert("Failed to create listing. Please try again.");
        return;
      }

      if (photoUrls && photoUrls.length > 0 && listingData && listingData[0]) {
        const listingId = listingData[0].id;
        const imageInserts = photoUrls.map((url) => ({
          listing_id: listingId,
          image_url: url,
        }));

        const { error: imageError } = await supabase
          .from("images")
          .insert(imageInserts);

        if (imageError) {
          console.error("Error adding images:", imageError);
          alert("Listing created but there was an issue adding images.");
        }
      }

      console.log("Listing created:", listingData);
      if (listingData && listingData[0]) {
        window.location.href = `/listings/${listingData[0].id}`;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    setValue,
    errors,
    isSubmitting,
    handlePhotoChange,
    loading,
    reset,
  };
};

export default useAddListingForm;
