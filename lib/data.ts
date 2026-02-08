export interface PG {
  id: number;
  name: string;
  category: "Boys" | "Girls";
  distances: { cambridge: number; gardencity: number; };
  image: string;
  carousel: string[];
  price: number;
  ownerPrice: number;
  keywords?: string[];
  amenities: string[];
  rules: string[];
  sharing_prices: { single?: number; double?: number; triple?: number; quad?: number };
  description: string;
}

export const pgs: PG[] = [
  {
    id: 1,
    name: "Sri Lakshmi Gents PG",
    category: "Boys",
    distances: { cambridge: 0.2, gardencity: 4.5 },
    image: "https://i.postimg.cc/QtYLDQKv/lax.jpg",
    carousel: ["https://i.postimg.cc/QtYLDQKv/lax.jpg"],
    price: 7500,
    ownerPrice: 9500,
    keywords: ["k.r. puram", "kr puram", "cambridge", "near college"],
    amenities: ["WiFi", "3 Meals", "Laundry", "Hot Water", "CCTV"],
    rules: ["Gate closes at 10:30 PM", "Non-Veg allowed", "No Smoking inside rooms", "Visitors allowed till 8 PM"],
    sharing_prices: { double: 7500, triple: 6500, quad: 6000 },
    description: "A comfortable and affordable PG near Cambridge College with homely food and a friendly atmosphere. Perfect for students looking for a peaceful stay."
  },
  {
    id: 2,
    name: "Balaji Ladies PG",
    category: "Girls",
    distances: { cambridge: 0.1, gardencity: 4.8 },
    image: "https://i.postimg.cc/NjdZm8pD/bala-g.jpg",
    carousel: ["https://i.postimg.cc/NjdZm8pD/bala-g.jpg", "https://i.postimg.cc/nrTN2vpP/bala-g-1.jpg"],
    price: 8000,
    ownerPrice: 10000,
    keywords: ["basavanapura", "cambridge", "cit"],
    amenities: ["WiFi", "3 Meals", "Washing Machine", "Security", "Geyser"],
    rules: ["Gate closes at 9:30 PM", "No Male Visitors", "Veg only", "Strict timings for meals"],
    sharing_prices: { double: 8000, triple: 7000, quad: 6500 },
    description: "Safe and secure ladies PG with strict security measures. Ideal for working women and students who prefer a disciplined environment with quality food."
  },
  {
    id: 3,
    name: "Sri Balaji PG for Gents",
    category: "Boys",
    distances: { cambridge: 5.2, gardencity: 0.5 },
    image: "https://i.postimg.cc/y8prk18F/bala-gen.jpg",
    carousel: ["https://i.postimg.cc/y8prk18F/bala-gen.jpg"],
    price: 7000,
    ownerPrice: 9000,
    keywords: ["garden city", "gcu", "battarahalli", "tc palya"],
    amenities: ["WiFi", "3 Meals", "Laundry", "Power Backup", "24/7 Water"],
    rules: ["Gate closes at 11 PM", "Non-Veg allowed", "No Alcohol", "Guests allowed with prior notice"],
    sharing_prices: { single: 9000, double: 7000, triple: 6000 },
    description: "Budget-friendly PG near Garden City College with excellent connectivity. Great for students who want affordability without compromising on basic amenities."
  },
  {
    id: 4,
    name: "Royal Inn Luxury Ladies",
    category: "Girls",
    distances: { cambridge: 3.5, gardencity: 2.8 },
    image: "https://i.postimg.cc/kXnjs6Vt/royal.jpg",
    carousel: ["https://i.postimg.cc/kXnjs6Vt/royal.jpg", "https://i.postimg.cc/QdDW11HV/royal-1.jpg"],
    price: 11500,
    ownerPrice: 13500,
    keywords: ["ramamurthy nagar", "rm nagar", "tc palya"],
    amenities: ["WiFi", "TV", "Fridge", "3 Meals", "Laundry", "Lift", "Power Backup"],
    rules: ["Gate closes at 10 PM", "No Male Visitors", "Both Veg & Non-Veg available", "Professional environment"],
    sharing_prices: { single: 13500, double: 11500, triple: 10000 },
    description: "Premium ladies PG with luxury amenities and modern facilities. Perfect for working professionals who value comfort, privacy, and a sophisticated living experience."
  },
  {
    id: 5,
    name: "Sri Venkateshwara Luxury",
    category: "Girls",
    distances: { cambridge: 4.5, gardencity: 3.8 },
    image: "https://i.postimg.cc/tRFdLq08/ven.jpg",
    carousel: [
      "https://i.postimg.cc/tRFdLq08/ven.jpg",
      "https://i.postimg.cc/7hCSt4yF/ven-1.jpg",
      "https://i.postimg.cc/XqZ91W0h/ven-2.jpg",
      "https://i.postimg.cc/Rh3wpmzY/ven-3.jpg",
      "https://i.postimg.cc/SRXc14pv/ven-4.jpg",
      "https://i.postimg.cc/XqZ91W0m/ven-5.jpg"
    ],
    price: 9000,
    ownerPrice: 11000,
    keywords: ["ramamurthy nagar", "t.c. palya", "garden city"],
    amenities: ["WiFi", "3 Meals", "Washing Machine", "Biometric Entry", "Lift"],
    rules: ["Gate closes at 10 PM", "No Male Visitors", "Veg & Non-Veg both available", "Biometric attendance mandatory"],
    sharing_prices: { single: 11000, double: 9000, triple: 8000 },
    description: "Modern ladies PG with advanced security features and spacious rooms. Ideal for students and professionals seeking a blend of safety, comfort, and convenience."
  }
]