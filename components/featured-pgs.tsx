"use client"

import { useMemo } from "react"
import { PGCard } from "@/components/pg-card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RotateCcw } from "lucide-react"
import { pgs } from "@/lib/data"
import { PRICE_THRESHOLDS, DISTANCE_VALUES } from "@/lib/filters"
import type { GenderFilter, PriceFilter, DistanceFilter } from "@/lib/filters"

interface FeaturedPGsProps {
  searchQuery: string
  gender: GenderFilter
  setGender: (value: GenderFilter) => void
  price: PriceFilter
  setPrice: (value: PriceFilter) => void
  distance: DistanceFilter
  setDistance: (value: DistanceFilter) => void
  onResetFilters: () => void
  activeCollege: "cambridge" | "gardencity"
}

export function FeaturedPGs({
  searchQuery,
  gender,
  setGender,
  price,
  setPrice,
  distance,
  setDistance,
  onResetFilters,
  activeCollege,
}: FeaturedPGsProps) {
  const filteredPGs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return pgs.filter((pg) => {
      // Search filter: name, college, or location
      if (query) {
        const matchesSearch =
          pg.name.toLowerCase().includes(query) ||
          (activeCollege === "cambridge" && pg.distances.cambridge < Infinity && "cambridge".includes(query)) ||
          (activeCollege === "gardencity" && pg.distances.gardencity < Infinity && "garden city".includes(query))
        if (!matchesSearch) return false
      }

      // Gender filter
      if (gender !== "All" && pg.category !== gender) return false

      // Price filter
      if (price !== "Any" && pg.price >= PRICE_THRESHOLDS[price]) return false

      // Distance filter (cumulative max-distance: <3km shows <1km AND <3km)
      if (distance !== "Any") {
        const maxDistanceKm = DISTANCE_VALUES[distance]
        const pgDistanceKm = pg.distances[activeCollege]
        if (pgDistanceKm > maxDistanceKm) return false
      }

      return true
    })
  }, [searchQuery, gender, price, distance, activeCollege])

  return (
    <section id="listings" className="bg-background py-16 sm:py-20 lg:py-24 scroll-mt-16">
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
        </div>

        {/* Filter Toolbar - Amazon-style */}
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <div className="flex flex-1 flex-wrap items-center gap-3">
              <Select value={gender} onValueChange={(v) => setGender(v as GenderFilter)}>
                <SelectTrigger className="w-full border-gray-300 bg-white sm:w-36">
                  <SelectValue placeholder="All Genders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Genders</SelectItem>
                  <SelectItem value="Boys">Boys</SelectItem>
                  <SelectItem value="Girls">Girls</SelectItem>
                </SelectContent>
              </Select>
              <Select value={price} onValueChange={(v) => setPrice(v as PriceFilter)}>
                <SelectTrigger className="w-full border-gray-300 bg-white sm:w-36">
                  <SelectValue placeholder="Max Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any">Max Price</SelectItem>
                  <SelectItem value="8k">Under ₹8k</SelectItem>
                  <SelectItem value="10k">Under ₹10k</SelectItem>
                  <SelectItem value="12k">Under ₹12k</SelectItem>
                </SelectContent>
              </Select>
              <Select value={distance} onValueChange={(v) => setDistance(v as DistanceFilter)}>
                <SelectTrigger className="w-full border-gray-300 bg-white sm:w-36">
                  <SelectValue placeholder="Max Distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any">Max Distance</SelectItem>
                  <SelectItem value="<1km">{"<1km"}</SelectItem>
                  <SelectItem value="<3km">{"<3km"}</SelectItem>
                  <SelectItem value="<5km">{"<5km"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onResetFilters}
              className="shrink-0 border-gray-300 bg-white hover:bg-gray-50"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </div>

        {filteredPGs.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPGs.map((pg) => (
              <PGCard
                key={pg.id}
                name={pg.name}
                location={`${pg.category} | ${activeCollege === "cambridge" ? "Cambridge" : "Garden City"}`}
                proximityText={`📍 ${pg.distances[activeCollege]} km from ${activeCollege === "cambridge" ? "Cambridge" : "Garden City"}`}
                ownerPrice={pg.ownerPrice}
                vjPrice={pg.price}
                images={pg.carousel}
                amenities={[]}
                gender={pg.category.toLowerCase() as "boys" | "girls"}
                availability={true}
                specialBadge="VJ Price Guarantee"
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center">
            <p className="text-lg font-medium text-foreground">No PGs found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
            <Button variant="outline" className="mt-4" onClick={onResetFilters}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
