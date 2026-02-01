export interface PG {
  id: number
  name: string
  category: "Boys" | "Girls"
  college: string
  price: number
  ownerPrice: number
  location: string
  distanceTag: string
  image: string
  carousel: string[]
}

export const pgs: PG[] = [
  {
    id: 1,
    name: "Sri Lakshmi Gents PG (New Bldg)",
    category: "Boys",
    college: "Cambridge",
    price: 7500,
    ownerPrice: 9500,
    location: "2 Mins Walk from Cambridge Back Gate",
    distanceTag: "<1km",
    image: "https://i.postimg.cc/QtYLDQKv/lax.jpg",
    carousel: ["https://i.postimg.cc/QtYLDQKv/lax.jpg"],
  },
  {
    id: 2,
    name: "Balaji Ladies PG",
    category: "Girls",
    college: "Cambridge",
    price: 8000,
    ownerPrice: 10000,
    location: "Opposite Cambridge Main Entrance",
    distanceTag: "<1km",
    image: "https://i.postimg.cc/NjdZm8pD/bala-g.jpg",
    carousel: [
      "https://i.postimg.cc/NjdZm8pD/bala-g.jpg",
      "https://i.postimg.cc/nrTN2vpP/bala-g-1.jpg",
    ],
  },
  {
    id: 3,
    name: "Sri Balaji PG for Gents",
    category: "Boys",
    college: "Garden City",
    price: 7000,
    ownerPrice: 9000,
    location: "5 Mins Walk from Garden City Campus",
    distanceTag: "<1km",
    image: "https://i.postimg.cc/y8prk18F/bala-gen.jpg",
    carousel: ["https://i.postimg.cc/y8prk18F/bala-gen.jpg"],
  },
  {
    id: 4,
    name: "Royal Inn Luxury Ladies PG",
    category: "Girls",
    college: "Both",
    price: 11500,
    ownerPrice: 13500,
    location: "TC Palya Main Road (5 min drive)",
    distanceTag: "<3km",
    image: "https://i.postimg.cc/kXnjs6Vt/royal.jpg",
    carousel: [
      "https://i.postimg.cc/kXnjs6Vt/royal.jpg",
      "https://i.postimg.cc/QdDW11HV/royal-1.jpg",
      "https://i.postimg.cc/0yvJDDbz/royal-2.jpg",
      "https://i.postimg.cc/zGNRKKVV/royal-3.jpg",
    ],
  },
  {
    id: 5,
    name: "Sri Venkateshwara Luxury Ladies",
    category: "Girls",
    college: "Both",
    price: 9000,
    ownerPrice: 11000,
    location: "Ramamurthy Nagar (10 min Bus)",
    distanceTag: "<5km",
    image: "https://i.postimg.cc/tRFdLq08/ven.jpg",
    carousel: [
      "https://i.postimg.cc/tRFdLq08/ven.jpg",
      "https://i.postimg.cc/7hCSt4yF/ven-1.jpg",
      "https://i.postimg.cc/XqZ91W0h/ven-2.jpg",
      "https://i.postimg.cc/Rh3wpmzY/ven-3.jpg",
      "https://i.postimg.cc/SRXc14pv/ven-4.jpg",
      "https://i.postimg.cc/XqZ91W0m/ven-5.jpg",
    ],
  },
]
