
import { Calendar } from "@/components/ui/calendar";
import { addDays, isBefore, isWithinInterval } from "date-fns";
import { Property } from "@/types";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/lib/supabase";

interface PropertyCalendarProps {
  property: Property;
  onSelect?: (date: Date | undefined) => void;
  selectedDate?: Date;
  className?: string;
  isHost?: boolean;
}

export const PropertyCalendar = ({
  property,
  onSelect,
  selectedDate,
  className,
  isHost = false,
}: PropertyCalendarProps) => {
  const { toast } = useToast();
  const [availability, setAvailability] = useState(property.availability);

  // Convert availability dates from strings to Date objects
  const availabilityRanges = availability.map((range) => ({
    start: new Date(range.startDate),
    end: new Date(range.endDate),
  }));

  const isDateAvailable = (date: Date) => {
    return availabilityRanges.some((range) =>
      isWithinInterval(date, { start: range.start, end: range.end })
    );
  };

  const isDateUnavailable = (date: Date) => {
    return (
      isBefore(date, new Date()) || // Past dates
      !isDateAvailable(date) // Dates not in availability ranges
    );
  };

  const addAvailabilityRange = async (start: Date, end: Date) => {
    if (!isHost) return;

    try {
      const { data, error } = await supabase
        .from('property_availability')
        .insert([
          {
            property_id: property.id,
            start_date: start.toISOString(),
            end_date: end.toISOString(),
          },
        ]);

      if (error) throw error;

      setAvailability([
        ...availability,
        {
          startDate: start.toISOString(),
          endDate: end.toISOString(),
        },
      ]);

      toast({
        title: "Success",
        description: "Availability range added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add availability range",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelect}
        disabled={isDateUnavailable}
        className={className}
        modifiers={{
          available: (date) => isDateAvailable(date),
        }}
        modifiersStyles={{
          available: {
            backgroundColor: "#D3E4FD",
          },
        }}
        initialFocus
      />
      {isHost && (
        <div className="space-x-2">
          <Button
            onClick={() => {
              const start = new Date();
              const end = addDays(start, 7);
              addAvailabilityRange(start, end);
            }}
          >
            Add Next Week
          </Button>
          <Button
            onClick={() => {
              const start = new Date();
              const end = addDays(start, 30);
              addAvailabilityRange(start, end);
            }}
          >
            Add Next Month
          </Button>
        </div>
      )}
    </div>
  );
};
