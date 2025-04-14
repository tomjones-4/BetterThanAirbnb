export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "host" | "renter";
  joined: string;
}

export interface Property {
  id: string;
  title?: string;
  name?: string;
  description: string;
  price: number;
  address: string;
  images: string[];
  hostId: string; // Added to link property with host
  host: User;
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  startDate: string;
  endDate: string;
  rules: string[];
  rating: number;
  reviews: number;
  property_type: "house" | "condo";
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  bookingId?: string;
  read: boolean;
}
