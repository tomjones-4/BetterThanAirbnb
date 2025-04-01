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
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define amenities list with corresponding icons
const amenitiesList = [
  { id: "wifi", label: "Wi-Fi", value: "wifi", Icon: Wifi },
  { id: "pool", label: "Pool", value: "pool", Icon: GlassWater },
  { id: "parking", label: "Parking", value: "parking", Icon: ParkingSquare },
  { id: "kitchen", label: "Kitchen", value: "kitchen", Icon: Utensils },
  { id: "laundry", label: "Laundry", value: "laundry", Icon: Shirt },
  { id: "gym", label: "Gym", value: "gym", Icon: Dumbbell },
  {
    id: "petFriendly",
    label: "Pet Friendly",
    value: "petFriendly",
    Icon: PawPrint,
  },
  {
    id: "airConditioning",
    label: "Air Conditioning",
    value: "airConditioning",
    Icon: Wind,
  },
  { id: "heating", label: "Heating", value: "heating", Icon: Flame },
  { id: "tv", label: "TV", value: "tv", Icon: Tv },
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
      <DialogContent className="sm:max-w-[600px] p-4 sm:p-6 w-[100vw] sm:w-auto max-w-full sm:max-w-[600px] h-full sm:h-auto max-h-[100vh] sm:max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add a New Listing</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new property listing.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(100vh-150px)] sm:h-[600px] w-full">
          <div className="px-2 sm:px-4">
            <form onSubmit={handleSubmit} className="grid gap-4 py-2 sm:py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" {...register("name")} required />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register("description")} />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  {...register("address")}
                  required
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  id="price"
                  {...register("price")}
                  required
                />
                {errors.price && (
                  <p className="text-red-500">{errors.price?.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="property_type">Property Type</Label>
                <Input
                  type="text"
                  id="property_type"
                  {...register("property_type")}
                />
                {errors.property_type && (
                  <p className="text-red-500">
                    {errors.property_type?.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    type="number"
                    id="bedrooms"
                    {...register("bedrooms", { valueAsNumber: true })}
                  />
                  {errors.bedrooms && (
                    <p className="text-red-500">{errors.bedrooms?.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    type="number"
                    id="bathrooms"
                    {...register("bathrooms", { valueAsNumber: true })}
                  />
                  {errors.bathrooms && (
                    <p className="text-red-500">{errors.bathrooms?.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="max_guests">Max Guests</Label>
                  <Input
                    type="number"
                    id="max_guests"
                    {...register("max_guests", { valueAsNumber: true })}
                  />
                  {errors.max_guests && (
                    <p className="text-red-500">{errors.max_guests?.message}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Controller
                    control={control}
                    name="start_date"
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
                              control._formValues.end_date
                                ? { after: control._formValues.end_date }
                                : undefined
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.start_date && (
                    <p className="text-red-500">{errors.start_date?.message}</p>
                  )}
                </div>
                <div>
                  <Label>End Date</Label>
                  <Controller
                    control={control}
                    name="end_date"
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
                              control._formValues.start_date
                                ? { before: control._formValues.start_date }
                                : undefined
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.end_date && (
                    <p className="text-red-500">{errors.end_date?.message}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Amenities</Label>
                <Controller
                  name="amenities"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 gap-3 px-1">
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
              </div>
              <Button type="submit" disabled={isSubmitting} className="mt-2">
                {loading ? <Spinner /> : "Submit"}
              </Button>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddListingDialog;
