
import { useQuery } from "@tanstack/react-query";
import { Property, Booking } from "@/types";
import { Calendar, History } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export const RentalHistory = ({ userId }: { userId: string }) => {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", userId],
    queryFn: async () => {
      // Get bookings where user is either the renter or the property owner
      const { data: ownerBookings } = await supabase
        .from("fake_bookings")
        .select(`
          *,
          property:property_id (
            *,
            host:host_id (*)
          ),
          user:user_id (*)
        `)
        .eq("property.host_id", userId);

      const { data: renterBookings } = await supabase
        .from("fake_bookings")
        .select(`
          *,
          property:property_id (
            *,
            host:host_id (*)
          ),
          user:user_id (*)
        `)
        .eq("user_id", userId);

      return {
        asOwner: ownerBookings || [],
        asRenter: renterBookings || [],
      };
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const formatBooking = (booking: any) => (
    <Card key={booking.id} className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">{booking.property.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              <Calendar className="inline-block w-4 h-4 mr-1" />
              {format(new Date(booking.check_in), "MMM d, yyyy")} -{" "}
              {format(new Date(booking.check_out), "MMM d, yyyy")}
            </p>
            <p className="text-sm text-gray-600">
              {booking.property.location_city}, {booking.property.location_state}
            </p>
            <p className="font-medium">${booking.total_price}</p>
          </div>
          <div className={`px-2 py-1 rounded-full text-sm ${
            booking.status === "confirmed"
              ? "bg-green-100 text-green-800"
              : booking.status === "cancelled"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center mb-6">
        <History className="w-6 h-6 mr-2" />
        <h1 className="text-2xl font-semibold">Rental History</h1>
      </div>

      <Tabs defaultValue="renter" className="w-full">
        <TabsList>
          <TabsTrigger value="renter">As Renter</TabsTrigger>
          <TabsTrigger value="owner">As Owner</TabsTrigger>
        </TabsList>

        <TabsContent value="renter">
          <ScrollArea className="h-[600px] pr-4">
            {bookings?.asRenter && bookings.asRenter.length > 0 ? (
              bookings.asRenter.map(formatBooking)
            ) : (
              <p className="text-gray-500">No rental history found.</p>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="owner">
          <ScrollArea className="h-[600px] pr-4">
            {bookings?.asOwner && bookings.asOwner.length > 0 ? (
              bookings.asOwner.map(formatBooking)
            ) : (
              <p className="text-gray-500">No properties rented out.</p>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};
