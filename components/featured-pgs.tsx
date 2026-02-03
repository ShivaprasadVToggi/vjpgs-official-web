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
import { normalize } from "@/lib/utils"
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
    const rawQuery = searchQuery.trim()
    const query = normalize(rawQuery)

    // Keyword definitions
    const CAMBRIDGE_KEYWORDS = ["cambridge", "cit", "krpuram", "basavanapura", "ramamurthynagar", "nearcambridge"]
    const GARDEN_CITY_KEYWORDS = ["garden", "gcu", "tcpalya", "battarahalli", "neargardencity", "rmnagar", "tc"]

    // 1. Detect Context from Query
    let effectiveCollege = activeCollege
    const isCambridgeSearch = CAMBRIDGE_KEYWORDS.some(k => query.includes(k))
    const isGardenSearch = GARDEN_CITY_KEYWORDS.some(k => query.includes(k))

    if (isCambridgeSearch) effectiveCollege = "cambridge"
    if (isGardenSearch) effectiveCollege = "gardencity"

    // 2. Filter Logic
    // If it's a location/college keyword search -> SHOW ALL (do not filter by name)
    const isLocationQuery = isCambridgeSearch || isGardenSearch

    const filtered = pgs.filter((pg) => {
      // Name Search
      if (rawQuery && !isLocationQuery) {
        // Strict name search only if NOT a location query
        if (!normalize(pg.name).includes(query) && !normalize(pg.category).includes(query)) return false
      }

      // Gender filter
      if (gender !== "All" && pg.category !== gender) return false

      // Price filter
      if (price !== "Any" && pg.price >= PRICE_THRESHOLDS[price]) return false

      // Distance filter - Uses EFFECTIVE college
      if (distance !== "Any") {
        const maxDistanceKm = DISTANCE_VALUES[distance]
        const pgDistanceKm = pg.distances[effectiveCollege]
        if (pgDistanceKm > maxDistanceKm) return false
      }

      return true
    })

    // 3. Sorting: Price High to Low (Descending) ALWAYS
    return filtered.sort((a, b) => b.price - a.price).map(pg => ({
      ...pg,
      // Inject the effective distance for display relative to the searched context
      displayDistance: pg.distances[effectiveCollege],
      displayCollege: effectiveCollege
    }))
  }, [searchQuery, gender, price, distance, activeCollege])

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
        </div>

        {/* Filter Toolbar - Compact Mobile */}
        <div id="listings" className="mt-8 scroll-mt-32 rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
          <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center w-full sm:flex sm:flex-row sm:items-center sm:gap-3">
            <Select value={gender} onValueChange={(v) => setGender(v as GenderFilter)}>
              <SelectTrigger className="w-full border-gray-300 bg-white px-1 py-2 text-xs sm:w-36 sm:text-sm sm:px-3 sm:py-2">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Gender</SelectItem>
                <SelectItem value="Boys">Boys</SelectItem>
                <SelectItem value="Girls">Girls</SelectItem>
              </SelectContent>
            </Select>

            <Select value={price} onValueChange={(v) => setPrice(v as PriceFilter)}>
              <SelectTrigger className="w-full border-gray-300 bg-white px-1 py-2 text-xs sm:w-36 sm:text-sm sm:px-3 sm:py-2">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Price</SelectItem>
                <SelectItem value="8k">Under ₹8k</SelectItem>
                <SelectItem value="10k">Under ₹10k</SelectItem>
                <SelectItem value="12k">Under ₹12k</SelectItem>
              </SelectContent>
            </Select>

            <Select value={distance} onValueChange={(v) => setDistance(v as DistanceFilter)}>
              <SelectTrigger className="w-full border-gray-300 bg-white px-1 py-2 text-xs sm:w-36 sm:text-sm sm:px-3 sm:py-2">
                <SelectValue placeholder="Dist." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Dist.</SelectItem>
                <SelectItem value="<1km">{"<1km"}</SelectItem>
                <SelectItem value="<3km">{"<3km"}</SelectItem>
                <SelectItem value="<5km">{"<5km"}</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={onResetFilters}
              className="h-9 w-9 shrink-0 border-gray-300 bg-white p-2 hover:bg-gray-50 sm:w-auto sm:px-4 sm:h-10"
              title="Reset Filters"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline sm:ml-2">Reset Filters</span>
            </Button>
          </div>
        </div>

        {filteredPGs.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPGs.map((pg) => (
              <PGCard
                key={pg.id}
                name={pg.name}
                location={`${pg.category} | ${pg.displayCollege === "cambridge" ? "Cambridge" : "Garden City"}`}
                proximityText={`📍 ${pg.displayDistance} km from ${pg.displayCollege === "cambridge" ? "Cambridge" : "Garden City"}`}
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
