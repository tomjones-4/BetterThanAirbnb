
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Property } from "@/types";
import { addDays, isBefore, isWithinInterval } from "date-fns";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

interface PropertyAvailabilityProps {
  property: Property;
  isHost?: boolean;
}

export const PropertyAvailability = ({ property, isHost = false }: PropertyAvailabilityProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();

  // Convert availability dates from strings to Date objects
  const availabilityRanges = property.availability.map((range) => ({
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

  const handleAddRange = () => {
    if (!selectedDate) return;
    
    const endDate = addDays(selectedDate, 7); // Default to 1-week availability
    toast.success("Availability range added", {
      description: `Added availability from ${format(selectedDate, 'PP')} to ${format(endDate, 'PP')}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Availability Calendar</h3>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={isDateUnavailable}
          className="rounded-md border"
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
          <div className="mt-4 space-x-2">
            <Button onClick={handleAddRange} disabled={!selectedDate}>
              Add Availability Range
            </Button>
          </div>
        )}
        
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            {isDateAvailable(selectedDate || new Date()) 
              ? "✅ This date is available for booking"
              : "❌ This date is not available"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-medium mb-2">Available Periods</h4>
        <ul className="space-y-2">
          {property.availability.map((range, index) => (
            <li key={index} className="text-sm text-gray-600">
              {format(new Date(range.startDate), 'PP')} - {format(new Date(range.endDate), 'PP')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
