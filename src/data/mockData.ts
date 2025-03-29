import { User, Property, Booking, Message } from "@/types";

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    role: "host",
    joined: "2023-01-15",
  },
  {
    id: "u2",
    name: "Michael Chen",
    email: "michael.c@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    role: "host",
    joined: "2023-02-20",
  },
  {
    id: "u3",
    name: "Emily Davis",
    email: "emily.d@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    role: "renter",
    joined: "2023-03-10",
  },
];

export const mockProperties: Property[] = [
  {
    id: "p1",
    title: "Luxury Downtown Apartment",
    description:
      "Modern luxury apartment in the heart of downtown. Features stunning city views and high-end amenities.",
    price: 250,
    location: {
      address: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
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
        endDate: "2024-12-31",
      },
    ],
    rules: ["No smoking", "No pets", "No parties"],
    rating: 4.8,
    reviews: 25,
  },
  {
    id: "p2",
    title: "Beachfront Villa",
    description:
      "Stunning beachfront villa with private access to the beach. Perfect for family vacations.",
    price: 500,
    location: {
      address: "456 Ocean Drive",
      city: "Miami",
      state: "FL",
      country: "USA",
      coordinates: {
        lat: 25.7617,
        lng: -80.1918,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35",
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
        endDate: "2024-08-31",
      },
    ],
    rules: ["No smoking inside", "Pets allowed", "No parties"],
    rating: 4.9,
    reviews: 42,
  },
  {
    id: "p3",
    title: "Cozy Mountain Cabin",
    description:
      "Rustic cabin nestled in the mountains with breathtaking views and hiking trails nearby.",
    price: 175,
    location: {
      address: "789 Pine Trail",
      city: "Aspen",
      state: "CO",
      country: "USA",
      coordinates: {
        lat: 39.1911,
        lng: -106.8175,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      "https://images.unsplash.com/photo-1520301255226-bf5f144451c1",
    ],
    hostId: "u1",
    host: mockUsers[0],
    amenities: ["WiFi", "Fireplace", "Kitchen", "Hiking Access", "Hot Tub"],
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2,
    availability: [
      {
        startDate: "2024-04-01",
        endDate: "2024-12-15",
      },
    ],
    rules: ["No smoking", "Pets allowed", "No parties"],
    rating: 4.7,
    reviews: 38,
  },
  {
    id: "p4",
    title: "Urban Loft Apartment",
    description:
      "Stylish loft in the trendy arts district with industrial design and modern amenities.",
    price: 200,
    location: {
      address: "101 Artist Row",
      city: "Portland",
      state: "OR",
      country: "USA",
      coordinates: {
        lat: 45.5231,
        lng: -122.6765,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471",
    ],
    hostId: "u2",
    host: mockUsers[1],
    amenities: ["WiFi", "Kitchen", "Workspace", "Bike Storage", "Rooftop Deck"],
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    availability: [
      {
        startDate: "2024-05-01",
        endDate: "2024-11-30",
      },
    ],
    rules: ["No smoking", "No pets", "Quiet hours after 10pm"],
    rating: 4.6,
    reviews: 31,
  },
  {
    id: "p5",
    title: "Lakefront Cottage",
    description:
      "Charming cottage on a serene lake with private dock and canoes included.",
    price: 225,
    location: {
      address: "222 Lake Shore Dr",
      city: "Lake Tahoe",
      state: "CA",
      country: "USA",
      coordinates: {
        lat: 39.0968,
        lng: -120.0324,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1475113548554-5a36f1f523d6",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
    ],
    hostId: "u1",
    host: mockUsers[0],
    amenities: ["WiFi", "Kitchen", "Fireplace", "Canoes", "Grill"],
    maxGuests: 5,
    bedrooms: 2,
    beds: 3,
    baths: 1,
    availability: [
      {
        startDate: "2024-06-01",
        endDate: "2024-09-30",
      },
    ],
    rules: ["No smoking", "Pets allowed", "No loud music"],
    rating: 4.8,
    reviews: 47,
  },
  {
    id: "p6",
    title: "Desert Oasis Home",
    description:
      "Modern home with private pool in the desert, perfect for stargazing and relaxation.",
    price: 280,
    location: {
      address: "555 Desert View Rd",
      city: "Palm Springs",
      state: "CA",
      country: "USA",
      coordinates: {
        lat: 33.8303,
        lng: -116.5453,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
    ],
    hostId: "u2",
    host: mockUsers[1],
    amenities: ["WiFi", "Pool", "Hot Tub", "BBQ", "Outdoor Shower"],
    maxGuests: 6,
    bedrooms: 3,
    beds: 3,
    baths: 2,
    availability: [
      {
        startDate: "2024-04-15",
        endDate: "2024-10-31",
      },
    ],
    rules: ["No smoking inside", "No pets", "No parties"],
    rating: 4.9,
    reviews: 52,
  },
  {
    id: "p7",
    title: "Historic Brownstone",
    description:
      "Charming brownstone with classic architecture in a historic neighborhood.",
    price: 300,
    location: {
      address: "77 Beacon St",
      city: "Boston",
      state: "MA",
      country: "USA",
      coordinates: {
        lat: 42.3601,
        lng: -71.0589,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1501183638710-841dd1904471",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    ],
    hostId: "u1",
    host: mockUsers[0],
    amenities: ["WiFi", "Kitchen", "Fireplace", "Laundry", "Reading Nook"],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    availability: [
      {
        startDate: "2024-05-01",
        endDate: "2024-12-31",
      },
    ],
    rules: ["No smoking", "No pets", "Quiet hours after 9pm"],
    rating: 4.7,
    reviews: 36,
  },
  {
    id: "p8",
    title: "Seaside Bungalow",
    description:
      "Quaint bungalow steps from the beach with gorgeous sunset views.",
    price: 195,
    location: {
      address: "333 Coast Highway",
      city: "Santa Cruz",
      state: "CA",
      country: "USA",
      coordinates: {
        lat: 36.9741,
        lng: -122.0308,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    ],
    hostId: "u2",
    host: mockUsers[1],
    amenities: [
      "WiFi",
      "Kitchen",
      "Patio",
      "Beach Equipment",
      "Outdoor Shower",
    ],
    maxGuests: 3,
    bedrooms: 1,
    beds: 2,
    baths: 1,
    availability: [
      {
        startDate: "2024-06-01",
        endDate: "2024-09-15",
      },
    ],
    rules: ["No smoking inside", "No pets", "Quiet hours after 10pm"],
    rating: 4.6,
    reviews: 29,
  },
  {
    id: "p9",
    title: "Modern Farmhouse",
    description:
      "Renovated farmhouse with modern amenities on 5 acres of countryside.",
    price: 275,
    location: {
      address: "888 Rural Route",
      city: "Hudson",
      state: "NY",
      country: "USA",
      coordinates: {
        lat: 42.2526,
        lng: -73.7912,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    ],
    hostId: "u1",
    host: mockUsers[0],
    amenities: ["WiFi", "Full Kitchen", "Fireplace", "Grill", "Garden"],
    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 2.5,
    availability: [
      {
        startDate: "2024-04-01",
        endDate: "2024-11-30",
      },
    ],
    rules: ["No smoking inside", "Pets allowed", "No parties"],
    rating: 4.9,
    reviews: 44,
  },
  {
    id: "p10",
    title: "Skyline Penthouse",
    description:
      "Luxurious penthouse with panoramic city views and upscale furnishings.",
    price: 450,
    location: {
      address: "1000 High Rise Blvd",
      city: "Chicago",
      state: "IL",
      country: "USA",
      coordinates: {
        lat: 41.8781,
        lng: -87.6298,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    ],
    hostId: "u2",
    host: mockUsers[1],
    amenities: ["WiFi", "Luxury Kitchen", "Concierge", "Gym Access", "Parking"],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    availability: [
      {
        startDate: "2024-05-01",
        endDate: "2024-12-20",
      },
    ],
    rules: ["No smoking", "No pets", "No parties", "Adult only"],
    rating: 4.8,
    reviews: 38,
  },
  {
    id: "p11",
    title: "Tiny House Retreat",
    description:
      "Eco-friendly tiny house with smart design and beautiful natural surroundings.",
    price: 125,
    location: {
      address: "44 Hidden Valley Ln",
      city: "Asheville",
      state: "NC",
      country: "USA",
      coordinates: {
        lat: 35.5951,
        lng: -82.5515,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    ],
    hostId: "u1",
    host: mockUsers[0],
    amenities: ["WiFi", "Kitchenette", "Fire Pit", "Hammock", "Outdoor Shower"],
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    availability: [
      {
        startDate: "2024-04-15",
        endDate: "2024-11-15",
      },
    ],
    rules: ["No smoking", "No pets", "Leave no trace"],
    rating: 4.7,
    reviews: 26,
  },
  {
    id: "p12",
    title: "Waterfront Houseboat",
    description:
      "Unique houseboat experience with water views from every window.",
    price: 220,
    location: {
      address: "Pier 18, Slip 22",
      city: "Seattle",
      state: "WA",
      country: "USA",
      coordinates: {
        lat: 47.6062,
        lng: -122.3321,
      },
    },
    images: [
      "https://images.unsplash.com/photo-1520301255226-bf5f144451c1",
      "https://images.unsplash.com/photo-1475113548554-5a36f1f523d6",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
    ],
    hostId: "u2",
    host: mockUsers[1],
    amenities: ["WiFi", "Compact Kitchen", "Deck", "Kayaks", "Water Access"],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1,
    availability: [
      {
        startDate: "2024-06-01",
        endDate: "2024-09-30",
      },
    ],
    rules: ["No smoking", "No pets", "No parties", "No swimming from boat"],
    rating: 4.8,
    reviews: 33,
  },
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
    createdAt: "2024-03-15",
  },
];

export const mockMessages: Message[] = [
  {
    id: "m1",
    senderId: "u3",
    receiverId: "u1",
    content:
      "Hi, I'm interested in booking your apartment for next week. Is it still available?",
    timestamp: "2024-03-14T10:30:00Z",
    bookingId: "b1",
    read: true,
  },
  {
    id: "m2",
    senderId: "u1",
    receiverId: "u3",
    content:
      "Yes, it's available! Feel free to proceed with the booking. Let me know if you have any questions.",
    timestamp: "2024-03-14T11:15:00Z",
    bookingId: "b1",
    read: false,
  },
];
