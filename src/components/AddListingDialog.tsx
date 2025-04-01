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

// Define amenities list with corresponding icons
const amenitiesList = [
  { id: "wifi", label: "Wi-Fi", value: "Wi-Fi", Icon: Wifi },
  { id: "pool", label: "Pool", value: "Pool", Icon: GlassWater },
  { id: "parking", label: "Parking", value: "Parking", Icon: ParkingSquare },
  { id: "kitchen", label: "Kitchen", value: "Kitchen", Icon: Utensils },
  { id: "laundry", label: "Laundry", value: "Laundry", Icon: Shirt },
  { id: "gym", label: "Gym", value: "Gym", Icon: Dumbbell },
  {
    id: "petFriendly",
    label: "Pet Friendly",
    value: "Pet Friendly",
    Icon: PawPrint,
  },
  {
    id: "airConditioning",
    label: "Air Conditioning",
    value: "Air Conditioning",
    Icon: Wind,
  },
  { id: "heating", label: "Heating", value: "Heating", Icon: Flame },
  { id: "tv", label: "TV", value: "TV", Icon: Tv },
];

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
    // handleAmenityChange, // No longer needed here
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
            <Controller
              name="amenities"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-2">
                  {amenitiesList.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={amenity.id}
                        checked={field.value?.includes(amenity.value)}
                        onCheckedChange={(checked) => {
                          const currentAmenities = field.value || [];
                          if (checked) {
                            field.onChange([
                              ...currentAmenities,
                              amenity.value,
                            ]);
                          } else {
                            field.onChange(
                              currentAmenities.filter(
                                (value) => value !== amenity.value
                              )
                            );
                          }
                        }}
                      />
                      <Label
                        htmlFor={amenity.id}
                        className="flex items-center ml-1"
                      >
                        <amenity.Icon className="mr-1 h-4 w-4" />
                        {amenity.label}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            />
            {errors.amenities && (
              <p className="text-red-500">{errors.amenities.message}</p>
            )}
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
