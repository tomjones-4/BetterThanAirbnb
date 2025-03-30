import { useState } from "react";
import { supabase } from "@/lib/supabase";

const useAddListingForm = () => {
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);

  const [addressError, setAddressError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [fromDateError, setFromDateError] = useState<string | null>(null);
  const [toDateError, setToDateError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAmenityChange = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
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
      setPhotos(validFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (!address) {
      setAddressError("Address is required");
      isValid = false;
    } else {
      setAddressError(null);
    }

    if (!price) {
      setPriceError("Price is required");
      isValid = false;
    } else {
      setPriceError(null);
    }

    if (!fromDate) {
      setFromDateError("From Date is required");
      isValid = false;
    } else {
      setFromDateError(null);
    }

    if (!toDate) {
      setToDateError("To Date is required");
      isValid = false;
    } else {
      setToDateError(null);
    }

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      // TODO: Move uploadPhotos to a separate hook
      const uploadPhotos = async (photos: File[]) => {
        const photoUrls: string[] = [];
        for (const photo of photos) {
          const { data, error } = await supabase.storage
            .from("listings")
            .upload(`${address}/${photo.name}`, photo, {
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
      const photoUrls = await uploadPhotos(photos);
      let photo_urls = [];
      if (photoUrls) {
        photo_urls = photoUrls;
      }

      const { data, error } = await supabase
        .from("listings")
        .insert([
          {
            address,
            price: parseInt(price),
            from_date: fromDate.toISOString(),
            to_date: toDate.toISOString(),
            amenities,
            photo_urls: photo_urls,
          },
        ])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        // TODO: Display user-friendly error message
        alert("Failed to create listing. Please try again.");
      } else {
        console.log("Listing created:", data);
        // Redirect to listing page
        window.location.href = `/listings/${address}`;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    address,
    setAddress,
    price,
    setPrice,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    amenities,
    setAmenities,
    photos,
    setPhotos,
    addressError,
    setAddressError,
    priceError,
    setPriceError,
    fromDateError,
    setFromDateError,
    toDateError,
    setToDateError,
    loading,
    handleAmenityChange,
    handlePhotoChange,
    handleSubmit,
  };
};

export default useAddListingForm;
