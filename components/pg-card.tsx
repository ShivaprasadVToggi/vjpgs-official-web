"use client"

import React, { useState } from "react"
import Image from "next/image"
import { MapPin, Wifi, UtensilsCrossed, Users, Tag, Award, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface PGCardProps {
  name: string
  location: string
  proximityText: string
  ownerPrice: number
  vjPrice: number
  images: string[]
  amenities: string[]
  gender: "boys" | "girls" | "unisex"
  availability: boolean
  specialBadge?: string
}

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-3.5 w-3.5" />,
  Meals: <UtensilsCrossed className="h-3.5 w-3.5" />,
}

export function PGCard({
  name,
  location,
  proximityText,
  ownerPrice,
  vjPrice,
  images,
  amenities,
  gender,
  availability,
  specialBadge,
}: PGCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const savings = ownerPrice - vjPrice

  const whatsappMessage = encodeURIComponent(
    `Hi VJ-PG's! My name is [____] from [____] College. I am interested in booking ${name} (₹${vjPrice.toLocaleString()}/month) through your website to claim the FLAT ₹2,000 Discount. Please let me know the next steps for a visit.`
  )
  const whatsappLink = `https://wa.me/919743055967?text=${whatsappMessage}`

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Filter out AC from amenities display
  const filteredAmenities = amenities.filter((a) => a !== "AC")

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Savings Badge */}
      <div className="absolute right-3 top-3 z-20">
        <Badge className="bg-green-600 text-white hover:bg-green-700 shadow-lg">
          <Tag className="mr-1 h-3 w-3" />
          Save ₹{savings.toLocaleString()}
        </Badge>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {images.length > 0 ? (
            images.map((img, index) => (
              <div key={index} className="relative h-full w-full flex-shrink-0 snap-center">
                <Image
                  src={img}
                  alt={`${name} - Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))
          ) : (
            <div className="relative h-full w-full flex-shrink-0 snap-center">
              <Image
                src="/placeholder.svg"
                alt={`${name} - Placeholder`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
        </div>
        
        {/* Image Navigation Arrows - only show if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/80 p-1.5 text-foreground opacity-0 transition-opacity hover:bg-card group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/80 p-1.5 text-foreground opacity-0 transition-opacity hover:bg-card group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            {/* Image Dots Indicator */}
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentImageIndex(idx)
                  }}
                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                    idx === currentImageIndex
                      ? "bg-white w-3"
                      : "bg-white/60 hover:bg-white/80"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
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
            {gender === "boys" ? "Boys" : gender === "girls" ? "Girls" : "Co-ed"}
          </Badge>
          {specialBadge && (
            <Badge className="bg-primary text-primary-foreground backdrop-blur-sm">
              <Award className="mr-1 h-3 w-3" />
              {specialBadge}
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-foreground line-clamp-1">{name}</h3>
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
              {amenityIcons[amenity] || null}
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
        {/* Price Comparison */}
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-red-500 line-through">
              Owner Price: ₹{ownerPrice.toLocaleString()}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-green-600">₹{vjPrice.toLocaleString()}</span>
              <span className="text-sm font-medium text-green-600">/month</span>
            </div>
            <span className="text-xs font-medium text-green-600">VJ Price</span>
          </div>
          {availability ? (
            <Button asChild className="shrink-0">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
          ) : (
            <Button disabled className="shrink-0">
              Waitlist
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
