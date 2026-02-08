"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { X, MapPin, Wifi, UtensilsCrossed, Zap, Shield, ChevronLeft, ChevronRight, Shirt, Video, Monitor, Droplets, Lock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PG } from "@/lib/data"

interface PGDetailModalProps {
    pg: PG | null
    onClose: () => void
    onBookNow: (sharingType: string) => void
}

const amenityIcons: Record<string, React.ReactNode> = {
    "WiFi": <Wifi className="h-4 w-4" />,
    "Meals": <UtensilsCrossed className="h-4 w-4" />,
    "3 Meals": <UtensilsCrossed className="h-4 w-4" />,
    "Laundry": <Shirt className="h-4 w-4" />,
    "Washing Machine": <Shirt className="h-4 w-4" />,
    "Power Backup": <Zap className="h-4 w-4" />,
    "CCTV": <Video className="h-4 w-4" />,
    "Security": <Lock className="h-4 w-4" />,
    "TV": <Monitor className="h-4 w-4" />,
    "Hot Water": <Droplets className="h-4 w-4" />,
    "Geyser": <Droplets className="h-4 w-4" />,
    "Biometric Entry": <Lock className="h-4 w-4" />,
}

export function PGDetailModal({ pg, onClose, onBookNow }: PGDetailModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [selectedSharing, setSelectedSharing] = useState<"single" | "double" | "triple" | "quad">("triple")
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (pg) {
            document.body.style.overflow = 'hidden'
            // Set default sharing to the lowest available option
            if (pg.sharing_prices.quad) setSelectedSharing("quad")
            else if (pg.sharing_prices.triple) setSelectedSharing("triple")
            else if (pg.sharing_prices.double) setSelectedSharing("double")
            else if (pg.sharing_prices.single) setSelectedSharing("single")
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [pg])

    if (!pg) return null

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

    const nextImage = () => {
        const newIndex = (currentImageIndex + 1) % pg.carousel.length
        setCurrentImageIndex(newIndex)
        scrollToImage(newIndex)
    }

    const prevImage = () => {
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

    const getIcon = (amenity: string) => {
        for (const key in amenityIcons) {
            if (amenity.includes(key) || key.includes(amenity)) {
                return amenityIcons[key]
            }
        }
        return <Tag className="h-4 w-4" />
    }

    const proximityText = pg.distances.cambridge < pg.distances.gardencity
        ? `${pg.distances.cambridge}km from Cambridge`
        : `${pg.distances.gardencity}km from Garden City`

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50" onClick={onClose}>
            <div
                className="relative bg-background w-full h-[90vh] sm:h-auto sm:max-h-[85vh] sm:max-w-2xl sm:rounded-lg overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-50 rounded-full bg-background/90 p-2 text-foreground shadow-lg hover:bg-background"
                    aria-label="Close"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto pb-20">
                    {/* Image Carousel */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                        <div
                            ref={scrollContainerRef}
                            onScroll={handleScroll}
                            className="flex h-full w-full overflow-x-auto snap-x snap-mandatory snap-stop-always scrollbar-hide"
                        >
                            {pg.carousel.map((img, index) => (
                                <div key={index} className="relative h-full w-full flex-shrink-0 snap-center">
                                    <Image
                                        src={img}
                                        alt={`${pg.name} - Image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        {pg.carousel.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground hover:bg-background"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground hover:bg-background"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>

                                {/* Dots Indicator */}
                                <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-1.5">
                                    {pg.carousel.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setCurrentImageIndex(idx)
                                                scrollToImage(idx)
                                            }}
                                            className={`h-2 w-2 rounded-full transition-all ${idx === currentImageIndex ? "bg-white w-4" : "bg-white/60 hover:bg-white/80"
                                                }`}
                                            aria-label={`Go to image ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Title & Distance */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{pg.name}</h2>
                            <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                                <MapPin className="h-4 w-4 shrink-0" />
                                <span className="text-sm">📍 {proximityText}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">About</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">{pg.description}</p>
                        </div>

                        {/* Price Selection */}
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-3">Select Sharing Type</h3>
                            <div className="flex flex-wrap gap-2">
                                {pg.sharing_prices.single && (
                                    <button
                                        onClick={() => setSelectedSharing("single")}
                                        className={`px-4 py-2 rounded-lg border-2 transition-all ${selectedSharing === "single"
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-border bg-background hover:border-primary/50"
                                            }`}
                                    >
                                        <p className="text-xs font-medium">Single</p>
                                        <p className="text-sm font-bold">₹{pg.sharing_prices.single.toLocaleString()}</p>
                                    </button>
                                )}
                                {pg.sharing_prices.double && (
                                    <button
                                        onClick={() => setSelectedSharing("double")}
                                        className={`px-4 py-2 rounded-lg border-2 transition-all ${selectedSharing === "double"
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-border bg-background hover:border-primary/50"
                                            }`}
                                    >
                                        <p className="text-xs font-medium">Double</p>
                                        <p className="text-sm font-bold">₹{pg.sharing_prices.double.toLocaleString()}</p>
                                    </button>
                                )}
                                {pg.sharing_prices.triple && (
                                    <button
                                        onClick={() => setSelectedSharing("triple")}
                                        className={`px-4 py-2 rounded-lg border-2 transition-all ${selectedSharing === "triple"
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-border bg-background hover:border-primary/50"
                                            }`}
                                    >
                                        <p className="text-xs font-medium">Triple</p>
                                        <p className="text-sm font-bold">₹{pg.sharing_prices.triple.toLocaleString()}</p>
                                    </button>
                                )}
                                {pg.sharing_prices.quad && (
                                    <button
                                        onClick={() => setSelectedSharing("quad")}
                                        className={`px-4 py-2 rounded-lg border-2 transition-all ${selectedSharing === "quad"
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-border bg-background hover:border-primary/50"
                                            }`}
                                    >
                                        <p className="text-xs font-medium">Quad</p>
                                        <p className="text-sm font-bold">₹{pg.sharing_prices.quad.toLocaleString()}</p>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-3">Amenities</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {pg.amenities.map((amenity) => (
                                    <div key={amenity} className="flex items-center gap-2 text-sm text-foreground">
                                        <span className="text-primary">{getIcon(amenity)}</span>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* House Rules */}
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-3">House Rules</h3>
                            <ul className="space-y-2">
                                {pg.rules.map((rule, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <span className="text-primary mt-0.5">•</span>
                                        <span>{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sticky Footer */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background p-4 shadow-lg">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-muted-foreground line-through">₹{((pg.sharing_prices[selectedSharing] || 0) + 2000).toLocaleString()}</p>
                                <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wide">(Owner Price)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-xl font-bold text-green-600">₹{(pg.sharing_prices[selectedSharing] || 0).toLocaleString()}/mo</p>
                                <span className="text-[10px] text-green-600 uppercase font-bold tracking-wide">(VJ Price)</span>
                            </div>
                        </div>
                        <Button
                            onClick={() => onBookNow(selectedSharing)}
                            className="bg-primary hover:bg-primary/90 px-6 h-12 text-base shadow-md transition-transform active:scale-95"
                        >
                            Confirm Discount
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
