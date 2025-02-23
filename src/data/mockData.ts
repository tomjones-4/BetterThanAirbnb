
import { User, Property, Booking, Message } from '@/types';

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    role: "host",
    joined: "2023-01-15"
  },
  {
    id: "u2",
    name: "Michael Chen",
    email: "michael.c@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    role: "host",
    joined: "2023-02-20"
  },
  {
    id: "u3",
    name: "Emily Davis",
    email: "emily.d@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    role: "renter",
    joined: "2023-03-10"
  }
];

export const mockProperties: Property[] = [
  {
    id: "p1",
    title: "Luxury Downtown Apartment",
    description: "Modern luxury apartment in the heart of downtown. Features stunning city views and high-end amenities.",
    price: 250,
    location: {
      address: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    },
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6"
    ],
    hostId: "u1",
    host: mockUsers[0],
    amenities: ["WiFi", "Kitchen", "Gym", "Pool", "Parking"],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    availability: [
      {
        startDate: "2024-04-01",
        endDate: "2024-12-31"
      }
    ],
    rules: ["No smoking", "No pets", "No parties"],
    rating: 4.8,
    reviews: 25
  },
  {
    id: "p2",
    title: "Beachfront Villa",
    description: "Stunning beachfront villa with private access to the beach. Perfect for family vacations.",
    price: 500,
    location: {
      address: "456 Ocean Drive",
      city: "Miami",
      state: "FL",
      country: "USA",
      coordinates: {
        lat: 25.7617,
        lng: -80.1918
      }
    },
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35"
    ],
    hostId: "u2",
    host: mockUsers[1],
    amenities: ["WiFi", "Kitchen", "Pool", "Beach Access", "BBQ"],
    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 3,
    availability: [
      {
        startDate: "2024-04-01",
        endDate: "2024-08-31"
      }
    ],
    rules: ["No smoking inside", "Pets allowed", "No parties"],
    rating: 4.9,
    reviews: 42
  }
];

export const mockBookings: Booking[] = [
  {
    id: "b1",
    propertyId: "p1",
    userId: "u3",
    checkIn: "2024-05-15",
    checkOut: "2024-05-20",
    totalPrice: 1250,
    status: "confirmed",
    createdAt: "2024-03-15"
  }
];

export const mockMessages: Message[] = [
  {
    id: "m1",
    senderId: "u3",
    receiverId: "u1",
    content: "Hi, I'm interested in booking your apartment for next week. Is it still available?",
    timestamp: "2024-03-14T10:30:00Z",
    bookingId: "b1",
    read: true
  },
  {
    id: "m2",
    senderId: "u1",
    receiverId: "u3",
    content: "Yes, it's available! Feel free to proceed with the booking. Let me know if you have any questions.",
    timestamp: "2024-03-14T11:15:00Z",
    bookingId: "b1",
    read: false
  }
];
