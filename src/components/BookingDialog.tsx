
import { useState } from "react";
import { Property } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { PropertyCalendar } from "./PropertyCalendar";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

interface BookingDialogProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BookingDialog = ({
  property,
  open,
  onOpenChange,
}: BookingDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { toast } = useToast();

  const handleBooking = () => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        description: "You need to select a check-in date to proceed with booking.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically handle the actual booking process
    toast({
      title: "Booking request sent!",
      description: `Your booking request for ${format(selectedDate, 'PP')} has been sent.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book {property.title}</DialogTitle>
          <DialogDescription>
            Select your check-in date to proceed with booking.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <PropertyCalendar
            property={property}
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleBooking}>
            Book Now - ${property.price}/night
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
