import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Instagram, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const listPropertyLink = "https://wa.me/919743055967?text=Hi%20VJ-PGs%2C%20I%20want%20to%20list%20my%20property."

  return (
    <footer id="contact" className="border-t border-border bg-card scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8">
          {/* Brand */}
          <Link href="/" className="flex items-center bg-transparent">
            <Image
              src="https://i.postimg.cc/Jz83sLmJ/logo-removebg-preview.png"
              alt="VJ-PG's Logo"
              width={80}
              height={80}
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* List Property Button */}
          <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
            <a href={listPropertyLink} target="_blank" rel="noopener noreferrer">
              List Your Property (For Owners)
            </a>
          </Button>

          {/* Connect with Founders Section */}
          <div className="w-full max-w-3xl">
            <h3 className="mb-6 text-center text-lg font-semibold text-foreground">
              Connect with Us
            </h3>

            <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
              {/* WhatsApp Column */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-medium text-foreground">WhatsApp</h4>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://wa.me/919743055967"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Primary: <span className="font-semibold text-foreground">97430 55967</span>
                  </a>
                  <a
                    href="https://wa.me/918792021456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Support: <span className="font-semibold text-foreground">87920 21456</span>
                  </a>
                </div>
              </div>

              {/* Socials Column */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                  <Instagram className="h-6 w-6 text-pink-600" />
                </div>
                <h4 className="font-medium text-foreground">Instagram</h4>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.instagram.com/shivaprasadvt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    <span className="font-semibold text-foreground">@shivaprasadvt</span>
                  </a>
                  <a
                    href="https://www.instagram.com/varun.gowda_._._/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    <span className="font-semibold text-foreground">@varun.gowda_._._</span>
                  </a>
                </div>
              </div>

              {/* Email Column */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-medium text-foreground">Email</h4>
                <a
                  href="mailto:shivaprasadtoggi45@gmail.com"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  <span className="font-semibold text-foreground">shivaprasadtoggi45@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            2026 VJ-PG's. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
