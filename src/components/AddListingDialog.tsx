import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { supabase } from "@/lib/supabase";
import Spinner from "@/components/ui/spinner";
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

const AddListingDialog = () => {
  const [open, setOpen] = useState(false);
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Listing</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Listing</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new property listing.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {addressError && <p className="text-red-500">{addressError}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            {priceError && <p className="text-red-500">{priceError}</p>}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[140px] justify-start text-left font-normal",
                      !fromDate && "text-muted-foreground"
                    )}
                  >
                    {fromDate ? (
                      format(fromDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    disabled={toDate ? { after: toDate } : undefined}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {fromDateError && <p className="text-red-500">{fromDateError}</p>}
            </div>
            <div>
              <Label>To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[140px] justify-start text-left font-normal",
                      !toDate && "text-muted-foreground"
                    )}
                  >
                    {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    disabled={fromDate ? { before: fromDate } : undefined}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {toDateError && <p className="text-red-500">{toDateError}</p>}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wifi"
                  checked={amenities.includes("Wi-Fi")}
                  onCheckedChange={() => handleAmenityChange("Wi-Fi")}
                />
                <Label htmlFor="wifi" className="flex items-center ml-1">
                  <Wifi className="mr-1 h-4 w-4" />
                  Wi-Fi
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pool"
                  checked={amenities.includes("Pool")}
                  onCheckedChange={() => handleAmenityChange("Pool")}
                />
                <Label htmlFor="pool" className="flex items-center ml-1">
                  <GlassWater className="mr-1 h-4 w-4" />
                  Pool
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="parking"
                  checked={amenities.includes("Parking")}
                  onCheckedChange={() => handleAmenityChange("Parking")}
                />
                <Label htmlFor="parking" className="flex items-center ml-1">
                  <ParkingSquare className="mr-1 h-4 w-4" />
                  Parking
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="kitchen"
                  checked={amenities.includes("Kitchen")}
                  onCheckedChange={() => handleAmenityChange("Kitchen")}
                />
                <Label htmlFor="kitchen" className="flex items-center ml-1">
                  <Utensils className="mr-1 h-4 w-4" />
                  Kitchen
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="laundry"
                  checked={amenities.includes("Laundry")}
                  onCheckedChange={() => handleAmenityChange("Laundry")}
                />
                <Label htmlFor="laundry" className="flex items-center ml-1">
                  <Shirt className="mr-1 h-4 w-4" />
                  Laundry
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gym"
                  checked={amenities.includes("Gym")}
                  onCheckedChange={() => handleAmenityChange("Gym")}
                />
                <Label htmlFor="gym" className="flex items-center ml-1">
                  <Dumbbell className="mr-1 h-4 w-4" />
                  Gym
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="petFriendly"
                  checked={amenities.includes("Pet Friendly")}
                  onCheckedChange={() => handleAmenityChange("Pet Friendly")}
                />
                <Label htmlFor="petFriendly" className="flex items-center ml-1">
                  <PawPrint className="mr-1 h-4 w-4" />
                  Pet Friendly
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="airConditioning"
                  checked={amenities.includes("Air Conditioning")}
                  onCheckedChange={() =>
                    handleAmenityChange("Air Conditioning")
                  }
                />
                <Label
                  htmlFor="airConditioning"
                  className="flex items-center ml-1"
                >
                  <Wind className="mr-1 h-4 w-4" />
                  Air Conditioning
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="heating"
                  checked={amenities.includes("Heating")}
                  onCheckedChange={() => handleAmenityChange("Heating")}
                />
                <Label htmlFor="heating" className="flex items-center ml-1">
                  <Flame className="mr-1 h-4 w-4" />
                  Heating
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="tv"
                  checked={amenities.includes("TV")}
                  onCheckedChange={() => handleAmenityChange("TV")}
                />
                <Label htmlFor="tv" className="flex items-center ml-1">
                  <Tv className="mr-1 h-4 w-4" />
                  TV
                </Label>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="photos">Photos</Label>
            <Input
              type="file"
              id="photos"
              multiple
              onChange={handlePhotoChange}
            />
            {photos.length > 0 && (
              <div className="flex gap-2">
                {photos.map((photo, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt={photo.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddListingDialog;
