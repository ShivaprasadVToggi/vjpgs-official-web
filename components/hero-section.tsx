"use client"

import { Search, MapPin, Percent, Camera, BadgeCheck, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

const popularLocations = [
  "K.R. Puram",
  "Near Cambridge",
  "TC Palya",
  "Ramamurthy Nagar",
  "Garden City",
]

interface HeroSectionProps {
  searchQuery: string
  setSearchQuery: (value: string) => void
  activeCollege: "cambridge" | "gardencity"
  setActiveCollege: (value: "cambridge" | "gardencity") => void
}

export function HeroSection({ searchQuery, setSearchQuery, activeCollege, setActiveCollege }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-card py-20 sm:py-28 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Discount Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            <Percent className="h-4 w-4" />
            Limited Time Offer
          </div>

          <h1 className="text-pretty text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Get Flat{" "}
            <span className="text-green-600">₹2,000 OFF</span>
            {" "}ON
            <br />
            Your First Month
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            IMPORTANT: These discounts are{" "}
            <span className="font-bold text-red-600">NOT available</span> if you walk in directly.
            You must book via VJ-PG's to claim the lower price.
          </p>

          {/* Search Bar */}
          <div className="relative mx-auto mt-10 max-w-xl">
            <div className="relative flex items-center rounded-xl border border-border bg-white shadow-lg">
              <div className="flex items-center pl-4">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search by college, location..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (e.target.value.toLowerCase().includes("garden")) {
                    setActiveCollege("gardencity")
                  } else if (e.target.value.toLowerCase().includes("cambridge")) {
                    setActiveCollege("cambridge")
                  }
                }}
                className="flex-1 bg-transparent px-3 py-5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <Button
                size="lg"
                className="m-2 rounded-lg bg-blue-600 hover:bg-blue-700"
                type="button"
                onClick={() => document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>

          {/* Popular tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {popularLocations.map((location) => (
              <button
                key={location}
                type="button"
                onClick={() => {
                  setSearchQuery(location)
                  if (location.toLowerCase().includes("garden")) { // Update activeCollege on popular tag click
                    setActiveCollege("gardencity")
                  } else if (location.toLowerCase().includes("cambridge")) {
                    setActiveCollege("cambridge")
                  } else if (location.toLowerCase().includes("k.r. puram")) {
                    setActiveCollege("cambridge") // Defaulting based on assumed proximity
                  } else if (location.toLowerCase().includes("tc palya")) {
                    setActiveCollege("gardencity") // Defaulting based on assumed proximity
                  } else if (location.toLowerCase().includes("ramamurthy nagar")) {
                    setActiveCollege("cambridge") // Defaulting based on assumed proximity
                  }
                  document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
              >
                {location}
              </button>
            ))}
          </div>

          {/* Value Props */}
          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-border pt-10 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">Verified Photos</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  We visited so you don't have to
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <BadgeCheck className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">Zero Brokerage</div>
                <div className="mt-1 text-sm text-muted-foreground">Direct connection</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">Price Guarantee</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Cheaper than landlord's direct rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
