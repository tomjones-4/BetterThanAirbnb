import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  HomeIcon,
  Building,
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
  Pencil,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Property } from "@/types";
import { useToast } from "@/hooks/use-toast";

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

interface EditListingDialogProps {
  listing: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (
    listingId: string,
    updatedData: Partial<Property>
  ) => Promise<boolean>;
}

const EditListingDialog: React.FC<EditListingDialogProps> = ({
  listing,
  open,
  onOpenChange,
  onUpdate,
}) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState<string>(
    listing.property_type || "house"
  );

  // Extract start and end dates from listing availability
  const startDate = listing.start_date ? new Date(listing.start_date) : null;
  const endDate = listing.end_date ? new Date(listing.end_date) : null;

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
      name: listing.name || listing.title || "",
      description: listing.description || "",
      address: listing?.address || "",
      price: listing.price?.toString() || "",
      amenities: listing.amenities || [],
      property_type: listing.property_type || "house",
      bedrooms: listing.bedrooms || 1,
      bathrooms: listing.baths || 1,
      max_guests: listing.maxGuests || 1,
      start_date: startDate,
      end_date: endDate,
      photos: [],
    },
  });

  useEffect(() => {
    // Reset form when dialog opens with the listing data
    if (open) {
      reset({
        name: listing.name || listing.title || "",
        description: listing.description || "",
        address: listing?.address || "",
        price: listing.price?.toString() || "",
        amenities: listing.amenities || [],
        property_type: listing.property_type || "house",
        bedrooms: listing.bedrooms || 1,
        bathrooms: listing.baths || 1,
        max_guests: listing.maxGuests || 1,
        start_date: startDate,
        end_date: endDate,
        photos: [],
      });
      setPropertyType(listing.property_type || "house");
    }
  }, [open, listing, reset]);

  const handlePropertyTypeSelect = (type: string) => {
    setPropertyType(type);
    setValue("property_type", type as "house" | "condo");
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const maxSize = 2 * 1024 * 1024; // 2MB
      const validFiles = files.filter((file) => {
        if (file.size > maxSize) {
          toast({
            title: "Error",
            description: "Image size must be less than 2MB",
            variant: "destructive",
          });
          return false;
        }
        return true;
      });
      setValue("photos", validFiles);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!session) return;

    setLoading(true);
    try {
      // Upload any new photos if provided
      const photoUrls: string[] = [];
      if (data.photos && data.photos.length > 0) {
        for (const photo of data.photos) {
          const { data: uploadData, error } = await supabase.storage
            .from("listings")
            .upload(`${data.address}/${photo.name}`, photo, {
              cacheControl: "3600",
              upsert: false,
            });

          if (error) {
            console.error("Error uploading photo:", error);
            toast({
              title: "Upload Error",
              description: "Failed to upload photo. Please try again.",
              variant: "destructive",
            });
          } else {
            console.log("Photo uploaded:", uploadData);
            const url = `https://betterthanairbnb.supabase.co/storage/v1/object/public/${uploadData.path}`;
            photoUrls.push(url);
          }
        }
      }

      // Prepare updated listing data
      const updatedListingData: Partial<Property> = {
        name: data.name,
        description: data.description,
        price: parseInt(data.price),
        amenities: data.amenities,
        address: data.address,
        property_type: data.property_type,
        bedrooms: data.bedrooms,
        baths: data.bathrooms,
        maxGuests: data.max_guests,
        startDate: data.start_date.toISOString(),
        endDate: data.end_date.toISOString(),
      };

      // Add any new images to the existing ones
      if (photoUrls.length > 0) {
        updatedListingData.images = [...(listing.images || []), ...photoUrls];
      }

      // Call the onUpdate function passed from parent component
      const success = await onUpdate(listing.id, updatedListingData);

      if (success) {
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error updating listing:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-4 sm:p-6 w-[100vw] sm:w-auto max-w-full sm:max-w-[600px] h-[90vh] sm:h-auto overflow-hidden">
        <DialogHeader>
          <DialogTitle>Edit Listing</DialogTitle>
          <DialogDescription>
            Update the details for your property listing.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-150px)] sm:h-[500px] w-full pr-4">
          <div className="px-2 sm:px-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4 py-2 sm:py-4"
            >
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
                <Label>Property Type</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant={propertyType === "house" ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "w-[100px] justify-center transition-all",
                      propertyType === "house" &&
                        "ring-2 ring-primary ring-offset-2"
                    )}
                    onClick={() => handlePropertyTypeSelect("house")}
                  >
                    <HomeIcon className="mr-2 h-4 w-4" />
                    House
                  </Button>
                  <Button
                    type="button"
                    variant={propertyType === "condo" ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "w-[100px] justify-center transition-all",
                      propertyType === "condo" &&
                        "ring-2 ring-primary ring-offset-2"
                    )}
                    onClick={() => handlePropertyTypeSelect("condo")}
                  >
                    <Building className="mr-2 h-4 w-4" />
                    Condo
                  </Button>
                </div>
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
                <Label htmlFor="photos">Add More Photos</Label>
                <Input
                  type="file"
                  id="photos"
                  multiple
                  onChange={handlePhotoChange}
                />
                {listing.images && listing.images.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Current photos: {listing.images.length}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {listing.images.slice(0, 3).map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Property ${index + 1}`}
                          className="h-12 w-12 object-cover rounded"
                        />
                      ))}
                      {listing.images.length > 3 && (
                        <div className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded">
                          +{listing.images.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <Button type="submit" disabled={isSubmitting} className="mt-2">
                {loading ? <Spinner /> : "Update Listing"}
              </Button>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditListingDialog;
