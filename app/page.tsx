"use client"

import React, { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedPGs } from "@/components/featured-pgs"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"
import type { GenderFilter, PriceFilter, DistanceFilter } from "@/lib/filters"

export default function Home() {
  const [gender, setGender] = useState<GenderFilter>("All")
  const [price, setPrice] = useState<PriceFilter>("Any")
  const [distance, setDistance] = useState<DistanceFilter>("Any")

  const resetFilters = () => {
    setGender("All")
    setPrice("Any")
    setDistance("Any")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection
          gender={gender}
          setGender={setGender}
          price={price}
          setPrice={setPrice}
          distance={distance}
          setDistance={setDistance}
        />
        <FeaturedPGs
          gender={gender}
          price={price}
          distance={distance}
          onResetFilters={resetFilters}
        />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}
