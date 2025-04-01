import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  fromDate: z.date({ required_error: "From Date is required" }),
  toDate: z.date({ required_error: "To Date is required" }),
  amenities: z.string().array(),
  photos: z.any(), // File array
});

type FormData = z.infer<typeof schema>;

const useAddListingForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      address: "",
      price: "",
      fromDate: undefined,
      toDate: undefined,
      amenities: [],
      photos: [],
    },
  });

  const handleAmenityChange = (amenity: string) => {
    setValue(
      "amenities",
      control._formValues.amenities?.includes(amenity)
        ? control._formValues.amenities?.filter((a: string) => a !== amenity)
        : [...(control._formValues.amenities || []), amenity]
    );
  };

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

    try {
      // TODO: Move uploadPhotos to a separate hook
      const uploadPhotos = async (photos: File[]) => {
        const photoUrls: string[] = [];
        for (const photo of photos) {
          const { data, error } = await supabase.storage
            .from("listings")
            .upload(`${data.address}/${photo.name}`, photo, {
              // data is form data, not supabase data
              cacheControl: "3600",
              upsert: false,
            });

          if (error) {
            console.error("Error uploading photo:", error);
            // TODO: Display user-friendly error message
            alert("Failed to upload photo. Please try again.");
            return null;
          } else {
            console.log("Photo uploaded:", data);
            // TODO: Get the correct URL from the data object
            const url = `https://betterthanairbnb.supabase.co/storage/v1/object/public/${data.path}`;
            photoUrls.push(url);
          }
        }
        return photoUrls;
      };

      // Upload photos
      const photoUrls = await uploadPhotos(data.photos);
      let photo_urls = [];
      if (photoUrls) {
        photo_urls = photoUrls;
      }

      const { data: listingData, error } = await supabase
        .from("listings")
        .insert([
          {
            address: data.address,
            price: parseInt(data.price),
            from_date: data.fromDate.toISOString(),
            to_date: data.toDate.toISOString(),
            amenities: data.amenities,
            photo_urls: photo_urls,
          },
        ])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        // TODO: Display user-friendly error message
        alert("Failed to create listing. Please try again.");
      } else {
        console.log("Listing created:", listingData);
        // Redirect to listing page
        window.location.href = `/listings/${data.address}`;
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
    handleAmenityChange,
    handlePhotoChange,
    loading,
  };
};

export default useAddListingForm;
