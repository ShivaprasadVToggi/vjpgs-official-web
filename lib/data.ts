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
    keywords: ["k.r. puram", "kr puram", "cambridge", "near college"]
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
    keywords: ["basavanapura", "cambridge", "cit"]
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
    keywords: ["garden city", "gcu", "battarahalli", "tc palya"]
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
    keywords: ["ramamurthy nagar", "rm nagar", "tc palya"]
  },
  {
    id: 5,
    name: "Sri Venkateshwara Luxury",
    category: "Girls",
    distances: { cambridge: 4.5, gardencity: 3.8 },
    image: "https://i.postimg.cc/tRFdLq08/ven.jpg",
    carousel: ["https://i.postimg.cc/tRFdLq08/ven.jpg"],
    price: 9000,
    ownerPrice: 11000,
    keywords: ["ramamurthy nagar", "t.c. palya", "garden city"]
  }
]