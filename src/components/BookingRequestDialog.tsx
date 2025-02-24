
import { useState } from "react";
import { Property } from "@/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Messages } from "@/components/Messages";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BookingRequestDialogProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BookingRequestDialog = ({
  property,
  open,
  onOpenChange,
}: BookingRequestDialogProps) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const { toast } = useToast();

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      toast({
        title: "Please select dates",
        description: "You need to select both check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking request sent!",
      description: "The host will review your request and respond shortly.",
    });
    onOpenChange(false);
  };

  const disabledDays = property.availability.reduce((acc: Date[], range) => {
    const start = new Date(range.startDate);
    const end = new Date(range.endDate);
    const dates: Date[] = [];
    let current = new Date(start);

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return [...acc, ...dates];
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[80vh]">
        <DialogHeader>
          <DialogTitle>Book {property.title}</DialogTitle>
          <DialogDescription>
            Message the host and select your dates to request a booking.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="message" className="h-full">
          <TabsList>
            <TabsTrigger value="message">Message Host</TabsTrigger>
            <TabsTrigger value="dates">Select Dates</TabsTrigger>
          </TabsList>

          <TabsContent value="message" className="h-[calc(100%-3rem)]">
            <Messages hostId={property.host.id} propertyId={property.id} />
          </TabsContent>

          <TabsContent value="dates">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Check-in Date</label>
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={[
                    { before: new Date() },
                    ...disabledDays,
                  ]}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Check-out Date</label>
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={[
                    { before: checkIn || new Date() },
                    ...disabledDays,
                  ]}
                />
              </div>

              {checkIn && checkOut && (
                <div className="rounded-lg bg-muted p-4">
                  <h4 className="font-semibold mb-2">Booking Summary</h4>
                  <p>Check-in: {format(checkIn, "PP")}</p>
                  <p>Check-out: {format(checkOut, "PP")}</p>
                  <p className="mt-2 font-semibold">
                    Total: ${property.price * Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))}
                  </p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button onClick={() => onOpenChange(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleBooking}>
                Submit Booking Request
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

