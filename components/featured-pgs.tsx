"use client"

import { useMemo } from "react"
import { PGCard } from "@/components/pg-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { pgs } from "@/lib/data"
import { PRICE_THRESHOLDS } from "@/lib/filters"
import type { GenderFilter, PriceFilter, DistanceFilter } from "@/lib/filters"

interface FeaturedPGsProps {
  gender: GenderFilter
  price: PriceFilter
  distance: DistanceFilter
  onResetFilters: () => void
}

export function FeaturedPGs({
  gender,
  price,
  distance,
  onResetFilters,
}: FeaturedPGsProps) {
  const filteredPGs = useMemo(() => {
    return pgs.filter((pg) => {
      if (gender !== "All" && pg.category !== gender) return false
      if (price !== "Any" && pg.price >= PRICE_THRESHOLDS[price]) return false
      if (distance !== "Any" && pg.distanceTag !== distance) return false
      return true
    })
  }, [gender, price, distance])

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
          <Button
            variant="outline"
            className="group bg-transparent"
            onClick={onResetFilters}
          >
            View all listings
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {filteredPGs.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPGs.map((pg) => (
              <PGCard
                key={pg.id}
                name={pg.name}
                location={`${pg.category} | ${pg.college}`}
                proximityText={pg.location}
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
              Try adjusting your filters or view all listings
            </p>
            <Button variant="outline" className="mt-4" onClick={onResetFilters}>
              View all listings
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
