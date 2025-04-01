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
import { Controller } from "react-hook-form";

const AddListingDialog = () => {
  const [open, setOpen] = useState(false);
  const { session, handleSignIn } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    errors,
    isSubmitting,
    handleAmenityChange,
    handlePhotoChange,
    loading,
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
            <Input type="text" id="address" {...register("address")} required />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input type="number" id="price" {...register("price")} required />
            {errors.price && (
              <p className="text-red-500">{errors.price?.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>From Date</Label>
              <Controller
                control={control}
                name="fromDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[140px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={
                          control._formValues.toDate
                            ? { after: control._formValues.toDate }
                            : undefined
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.fromDate && (
                <p className="text-red-500">{errors.fromDate?.message}</p>
              )}
            </div>
            <div>
              <Label>To Date</Label>
              <Controller
                control={control}
                name="toDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[140px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={
                          control._formValues.fromDate
                            ? { before: control._formValues.fromDate }
                            : undefined
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.toDate && (
                <p className="text-red-500">{errors.toDate?.message}</p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wifi"
                  checked={control._formValues.amenities?.includes("Wi-Fi")}
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
                  checked={control._formValues.amenities?.includes("Pool")}
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
                  checked={control._formValues.amenities?.includes("Parking")}
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
                  checked={control._formValues.amenities?.includes("Kitchen")}
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
                  checked={control._formValues.amenities?.includes("Laundry")}
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
                  checked={control._formValues.amenities?.includes("Gym")}
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
                  checked={control._formValues.amenities?.includes(
                    "Pet Friendly"
                  )}
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
                  checked={control._formValues.amenities?.includes(
                    "Air Conditioning"
                  )}
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
                  checked={control._formValues.amenities?.includes("Heating")}
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
                  checked={control._formValues.amenities?.includes("TV")}
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
            {/* {photos.length > 0 && (
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
            )} */}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddListingDialog;
