import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
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
import useAddListingForm from "@/hooks/useAddListingForm";

const AddListingDialog = () => {
  const [open, setOpen] = useState(false);
  const { session, handleSignIn } = useAuth();
  const {
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
  } = useAddListingForm();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            if (!session) {
              handleSignIn();
            } else {
              setOpen(true);
            }
          }}
        >
          Add Listing
        </Button>
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
