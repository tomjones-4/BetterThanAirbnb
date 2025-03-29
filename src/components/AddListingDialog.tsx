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
// Removed unused hooks: usePhotoManagement, useFirebaseImageUpload

const AddListingDialog = () => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]); // State for selected files
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]); // State for previews

  const [addressError, setAddressError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [fromDateError, setFromDateError] = useState<string | null>(null);
  const [toDateError, setToDateError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null); // General form error

  const handleAmenityChange = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  // Handle file selection and preview generation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(null); // Clear previous errors
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      // Basic validation (e.g., limit number of files)
      if (filesArray.length > 5) {
        setFormError("You can upload a maximum of 5 photos.");
        setSelectedPhotos([]);
        setPhotoPreviews([]);
        e.target.value = ""; // Clear the input
        return;
      }
      setSelectedPhotos(filesArray);

      // Generate previews
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setPhotoPreviews(previews);
    }
  };

  // Clean up previews when component unmounts or files change
  React.useEffect(() => {
    return () => {
      photoPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [photoPreviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null); // Clear previous errors

    // --- Form Validation ---
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
    // Add validation for photos if needed (e.g., at least one photo)
    // if (selectedPhotos.length === 0) { setFormError("Please upload at least one photo."); isValid = false; }

    if (!isValid) {
      return;
    }
    // --- End Validation ---

    setLoading(true);

    try {
      // 1. Create FormData
      const formData = new FormData();
      formData.append("address", address);
      formData.append("price", price);
      formData.append("fromDate", fromDate.toISOString());
      formData.append("toDate", toDate.toISOString());
      formData.append("amenities", JSON.stringify(amenities)); // Send amenities as JSON string

      // Append each photo file
      selectedPhotos.forEach((photo) => {
        formData.append("photos", photo);
      });

      // 2. Get Auth Token (Important for Edge Function security)
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError || !session) {
        throw new Error(sessionError?.message || "User not authenticated");
      }

      // 3. Invoke the Edge Function
      const { data, error } = await supabase.functions.invoke(
        "create-listing-with-photos",
        {
          body: formData, // Pass FormData directly
          headers: {
            // Pass the Authorization header for user authentication within the function
            Authorization: `Bearer ${session.access_token}`,
          },
          // Note: Supabase client might handle Content-Type automatically for FormData
        }
      );

      if (error) {
        console.error("Edge Function invocation error:", error);
        setFormError(`Failed to create listing: ${error.message}`);
        throw error; // Re-throw to be caught by outer catch
      }

      if (data?.error) {
        console.error(
          "Edge Function returned error:",
          data.error,
          data.details
        );
        setFormError(
          `Failed to create listing: ${data.error} ${
            data.details ? `(${data.details})` : ""
          }`
        );
        throw new Error(data.error);
      }

      // 4. Handle Success
      console.log("Edge Function success response:", data);
      alert("Listing created successfully!"); // Replace with better UI feedback (e.g., toast)
      setOpen(false); // Close the dialog
      // Optionally redirect or refresh data
      // window.location.href = `/listings/${data.listingId}`; // Redirect using returned ID if needed
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      // Ensure formError is set if not already
      if (!formError) {
        setFormError(
          `An unexpected error occurred: ${(error as Error).message}`
        );
      }
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
          {/* Address, Price, Dates, Amenities Inputs (remain the same) */}
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {addressError && (
              <p className="text-red-500 text-sm">{addressError}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price per night ($)</Label>
            <Input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
            />
            {priceError && <p className="text-red-500 text-sm">{priceError}</p>}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal", // Changed width
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
              {fromDateError && (
                <p className="text-red-500 text-sm">{fromDateError}</p>
              )}
            </div>
            <div>
              <Label>To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal", // Changed width
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
              {toDateError && (
                <p className="text-red-500 text-sm">{toDateError}</p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-2">
              {/* Amenity Checkboxes */}
              {[
                { id: "wifi", label: "Wi-Fi", icon: Wifi },
                { id: "pool", label: "Pool", icon: GlassWater },
                { id: "parking", label: "Parking", icon: ParkingSquare },
                { id: "kitchen", label: "Kitchen", icon: Utensils },
                { id: "laundry", label: "Laundry", icon: Shirt },
                { id: "gym", label: "Gym", icon: Dumbbell },
                { id: "petFriendly", label: "Pet Friendly", icon: PawPrint },
                {
                  id: "airConditioning",
                  label: "Air Conditioning",
                  icon: Wind,
                },
                { id: "heating", label: "Heating", icon: Flame },
                { id: "tv", label: "TV", icon: Tv },
              ].map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={amenities.includes(amenity.label)}
                    onCheckedChange={() => handleAmenityChange(amenity.label)}
                  />
                  <Label
                    htmlFor={amenity.id}
                    className="flex items-center ml-1 text-sm font-normal"
                  >
                    <amenity.icon className="mr-1 h-4 w-4" />
                    {amenity.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Updated Photos Input */}
          <div className="grid gap-2">
            <Label htmlFor="photos">Photos (up to 5)</Label>
            <Input
              type="file"
              id="photos"
              multiple
              accept="image/*" // Accept only image files
              onChange={handleFileChange} // Use the new handler
            />
            {/* Display Previews */}
            {photoPreviews.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {photoPreviews.map((previewUrl, index) => (
                  <img
                    key={index}
                    src={previewUrl}
                    alt={`Preview ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Display general form error */}
          {formError && <p className="text-red-500 text-sm">{formError}</p>}

          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? <Spinner /> : "Create Listing"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddListingDialog;
