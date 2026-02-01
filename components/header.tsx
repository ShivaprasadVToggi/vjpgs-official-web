"use client"

import Link from "next/link"
import { Menu, X, Home } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <div className="bg-blue-900 p-2 rounded-lg">
            <Home className="text-white w-8 h-8" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#listings" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Browse PGs
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            How it Works
          </Link>
          <Link href="#owners" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            For Owners
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <div className="space-y-1 px-4 py-3">
            <Link href="#listings" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Browse PGs
            </Link>
            <Link href="#how-it-works" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              How it Works
            </Link>
            <Link href="#owners" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              For Owners
            </Link>
            <Link href="#" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
