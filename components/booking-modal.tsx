"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  pgName: string
  pgPrice: number
}

export function BookingModal({ isOpen, onClose, pgName, pgPrice }: BookingModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    collegeName: "",
    sharingType: ""
  })

  const handleWhatsAppRedirect = () => {
    const { fullName, collegeName, sharingType } = formData

    // Construct the message
    // "Hi VJ! I am [Name] from [College]. I want to book [PG Name] for [Sharing] Sharing. Please verify my ₹2,000 Discount Pass."
    const message = `Hi VJ! I am ${fullName || "[Name]"} from ${collegeName || "[College]"}. I want to book ${pgName} for ${sharingType || "[Type]"} Sharing. Please verify my ₹2,000 Discount Pass.`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/919743055967?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")
    onClose()
  }

  const isFormValid = formData.fullName && formData.collegeName && formData.sharingType

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Discount</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="collegeName">College Name</Label>
            <Input
              id="collegeName"
              placeholder="Enter your college name"
              value={formData.collegeName}
              onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sharingType">Sharing Type</Label>
            <Select
              value={formData.sharingType}
              onValueChange={(value) => setFormData({ ...formData, sharingType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sharing type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single">Single Sharing</SelectItem>
                <SelectItem value="2">2 Sharing</SelectItem>
                <SelectItem value="3">3 Sharing</SelectItem>
                <SelectItem value="4">4 Sharing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={handleWhatsAppRedirect}
            disabled={!isFormValid}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Get Discount via WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
