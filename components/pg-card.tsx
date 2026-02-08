"use client"

import React, { useState } from "react"
import Image from "next/image"
import { MapPin, Wifi, UtensilsCrossed, Users, Tag, Award, ChevronLeft, ChevronRight, Shirt, Zap, Video, Monitor, Droplets, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { BookingModal } from "@/components/booking-modal"
import { PGDetailModal } from "@/components/pg-detail-modal"
import type { PG } from "@/lib/data"

interface PGCardProps {
  pg: PG
  displayDistance: number
  displayCollege: "cambridge" | "gardencity"
}

const amenityIcons: Record<string, React.ReactNode> = {
  "WiFi": <Wifi className="h-3.5 w-3.5" />,
  "Meals": <UtensilsCrossed className="h-3.5 w-3.5" />,
  "3 Meals": <UtensilsCrossed className="h-3.5 w-3.5" />,
  "Laundry": <Shirt className="h-3.5 w-3.5" />,
  "Washing Machine": <Shirt className="h-3.5 w-3.5" />,
  "Power Backup": <Zap className="h-3.5 w-3.5" />,
  "CCTV": <Video className="h-3.5 w-3.5" />,
  "Security": <Lock className="h-3.5 w-3.5" />,
  "TV": <Monitor className="h-3.5 w-3.5" />,
  "Hot Water": <Droplets className="h-3.5 w-3.5" />,
  "Geyser": <Droplets className="h-3.5 w-3.5" />,
}


export function PGCard({ pg, displayDistance, displayCollege }: PGCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedSharing, setSelectedSharing] = useState<string | undefined>(undefined)

  const savings = pg.ownerPrice - pg.price
  const location = `${pg.category} | ${displayCollege === "cambridge" ? "Cambridge" : "Garden City"}`
  const proximityText = `📍 ${displayDistance} km from ${displayCollege === "cambridge" ? "Cambridge" : "Garden City"}`


  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const scrollToImage = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const width = container.offsetWidth
      container.scrollTo({
        left: width * index,
        behavior: "smooth",
      })
    }
  }

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const newIndex = (currentImageIndex + 1) % pg.carousel.length
    setCurrentImageIndex(newIndex)
    scrollToImage(newIndex)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const newIndex = (currentImageIndex - 1 + pg.carousel.length) % pg.carousel.length
    setCurrentImageIndex(newIndex)
    scrollToImage(newIndex)
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const index = Math.round(container.scrollLeft / container.offsetWidth)
      if (index !== currentImageIndex) {
        setCurrentImageIndex(index)
      }
    }
  }

  // Filter out AC from amenities display
  const filteredAmenities = pg.amenities.filter((a) => a !== "AC")

  // Helper to find icon
  const getIcon = (amenity: string) => {
    for (const key in amenityIcons) {
      if (amenity.includes(key) || key.includes(amenity)) {
        return amenityIcons[key]
      }
    }
    return <Tag className="h-3.5 w-3.5" />
  }

  return (
    <>
      <Card
        className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        onClick={() => setIsDetailModalOpen(true)}
      >
        {/* Savings Badge */}
        <div className="absolute right-3 top-3 z-20">
          <Badge className="bg-green-600 text-white hover:bg-green-700 shadow-lg">
            <Tag className="mr-1 h-3 w-3" />
            Save ₹{savings.toLocaleString()}
          </Badge>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex h-full w-full overflow-x-auto snap-x snap-mandatory snap-stop-always scrollbar-hide"
          >
            {pg.carousel.length > 0 ? (
              pg.carousel.map((img, index) => (
                <div key={index} className="relative h-full w-full flex-shrink-0 snap-center">
                  <Image
                    src={img}
                    alt={`${pg.name} - Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))
            ) : (
              <div className="relative h-full w-full flex-shrink-0 snap-center">
                <Image
                  src="/placeholder.svg"
                  alt={`${pg.name} - Placeholder`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
          </div>

          {/* Image Navigation Arrows - only show if multiple images */}
          {pg.carousel.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-card/80 p-1.5 text-foreground opacity-0 transition-opacity hover:bg-card group-hover:opacity-100"
                aria-label="Previous image"
                suppressHydrationWarning
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-card/80 p-1.5 text-foreground opacity-0 transition-opacity hover:bg-card group-hover:opacity-100"
                aria-label="Next image"
                suppressHydrationWarning
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Image Dots Indicator */}
              <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 gap-1.5">
                {pg.carousel.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setCurrentImageIndex(idx)
                      scrollToImage(idx)
                    }}
                    className={`h-1.5 w-1.5 rounded-full transition-all ${idx === currentImageIndex
                      ? "bg-white w-3"
                      : "bg-white/60 hover:bg-white/80"
                      }`}
                    aria-label={`Go to image ${idx + 1}`}
                    suppressHydrationWarning
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="bg-card/90 text-foreground backdrop-blur-sm"
            >
              <Users className="mr-1 h-3 w-3" />
              {pg.category === "Boys" ? "Boys" : "Girls"}
            </Badge>
            <Badge className="bg-primary text-primary-foreground backdrop-blur-sm">
              <Award className="mr-1 h-3 w-3" />
              VJ Price Guarantee
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">{pg.name}</h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <p className="mt-1.5 text-sm font-semibold text-muted-foreground">{proximityText}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {filteredAmenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
              >
                {getIcon(amenity)}
                {amenity}
              </span>
            ))}
            {filteredAmenities.length > 3 && (
              <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">
                +{filteredAmenities.length - 3} more
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 border-t border-border p-4">
          {/* Price Display */}
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-red-500 line-through">Owner Price - ₹{pg.ownerPrice.toLocaleString()}</span>
              <span className="text-2xl font-extrabold text-green-600">₹{pg.price.toLocaleString()} <span className="text-sm font-medium text-green-600">/month</span></span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full gap-2">
            <Button
              onClick={(e) => {
                e.stopPropagation()
                setIsDetailModalOpen(true)
              }}
              variant="outline"
              className="flex-1"
              suppressHydrationWarning
            >
              View Details
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                setIsBookingModalOpen(true)
              }}
              className="flex-1 bg-primary hover:bg-primary/90"
              suppressHydrationWarning
            >
              Confirm Discount
            </Button>
          </div>
        </CardFooter>
      </Card>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        pgName={pg.name}
        pgPrice={pg.price}
        preselectedSharing={selectedSharing}
      />

      <PGDetailModal
        pg={isDetailModalOpen ? pg : null}
        onClose={() => setIsDetailModalOpen(false)}
        onBookNow={(sharingType) => {
          setSelectedSharing(sharingType)
          setIsDetailModalOpen(false)
          setIsBookingModalOpen(true)
        }}
      />
    </>
  )
}
