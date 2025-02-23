
import { Calendar } from "@/components/ui/calendar";
import { addDays, isBefore, isWithinInterval } from "date-fns";
import { Property } from "@/types";

interface PropertyCalendarProps {
  property: Property;
  onSelect?: (date: Date | undefined) => void;
  selectedDate?: Date;
  className?: string;
}

export const PropertyCalendar = ({
  property,
  onSelect,
  selectedDate,
  className,
}: PropertyCalendarProps) => {
  // Convert availability dates from strings to Date objects
  const availabilityRanges = property.availability.map((range) => ({
    start: new Date(range.startDate),
    end: new Date(range.endDate),
  }));

  const isDateAvailable = (date: Date) => {
    // Check if the date falls within any availability range
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

  return (
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
  );
};
