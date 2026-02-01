import { PGCard } from "@/components/pg-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const featuredPGs = [
  {
    name: "Sri Venkateshwara Luxury Ladies PG",
    location: "Girls | Ramamurthy Nagar",
    proximityText: "Near Yamaha Showroom (10m walk to College)",
    ownerPrice: 11000,
    vjPrice: 9000,
    images: [
      "https://i.postimg.cc/tRFdLq08/ven.jpg",
      "https://i.postimg.cc/7hCSt4yF/ven-1.jpg",
      "https://i.postimg.cc/XqZ91W0h/ven-2.jpg",
      "https://i.postimg.cc/Rh3wpmzY/ven-3.jpg",
      "https://i.postimg.cc/SRXc14pv/ven-4.jpg",
      "https://i.postimg.cc/XqZ91W0m/ven-5.jpg",
    ],
    amenities: ["WiFi", "Meals", "Balcony", "Security"],
    gender: "girls" as const,
    availability: true,
    specialBadge: "VJ Price Guarantee",
  },
  {
    name: "Sri Balaji PG for Gents",
    location: "Boys | TC Palya",
    proximityText: "8 Mins walk from Garden City Campus",
    ownerPrice: 9000,
    vjPrice: 7000,
    images: ["https://i.postimg.cc/y8prk18F/bala-gen.jpg"],
    amenities: ["WiFi", "Meals", "Laundry"],
    gender: "boys" as const,
    availability: true,
    specialBadge: "VJ Price Guarantee",
  },
  {
    name: "Royal Inn Luxury Ladies PG",
    location: "Girls | Luxury Stay",
    proximityText: "5 Mins from TC Palya Signal",
    ownerPrice: 13500,
    vjPrice: 11500,
    images: [
      "https://i.postimg.cc/kXnjs6Vt/royal.jpg",
      "https://i.postimg.cc/QdDW11HV/royal-1.jpg",
      "https://i.postimg.cc/0yvJDDbz/royal-2.jpg",
      "https://i.postimg.cc/zGNRKKVV/royal-3.jpg",
    ],
    amenities: ["WiFi", "Meals", "Gym", "Security"],
    gender: "girls" as const,
    availability: true,
    specialBadge: "VJ Price Guarantee",
  },
  {
    name: "Sri Lakshmi Gents PG (New Building)",
    location: "Boys | KR Puram",
    proximityText: "5 Mins walk from CIT Back Gate",
    ownerPrice: 9500,
    vjPrice: 7500,
    images: ["https://i.postimg.cc/QtYLDQKv/lax.jpg"],
    amenities: ["WiFi", "Meals", "Laundry"],
    gender: "boys" as const,
    availability: true,
    specialBadge: "VJ Price Guarantee",
  },
  {
    name: "Balaji Ladies PG",
    location: "Girls | Near Cambridge",
    proximityText: "2 Mins from CIT Main Entrance",
    ownerPrice: 10000,
    vjPrice: 8000,
    images: [
      "https://i.postimg.cc/NjdZm8pD/bala-g.jpg",
      "https://i.postimg.cc/nrTN2vpP/bala-g-1.jpg",
    ],
    amenities: ["WiFi", "Meals", "Security", "Gated"],
    gender: "girls" as const,
    availability: true,
    specialBadge: "VJ Price Guarantee",
  },
]

export function FeaturedPGs() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Featured PGs
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Hand-picked accommodations with exclusive VJ-PG's discounts
            </p>
          </div>
          <Button variant="outline" className="group bg-transparent">
            View all listings
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPGs.map((pg) => (
            <PGCard key={pg.name} {...pg} />
          ))}
        </div>
      </div>
    </section>
  )
}
