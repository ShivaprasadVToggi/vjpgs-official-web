import { useState } from "react"
import { jsPDF } from "jspdf"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle2, FileDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  pgName: string
  pgPrice: number
  preselectedSharing?: string
}

export function BookingModal({ isOpen, onClose, pgName, pgPrice, preselectedSharing }: BookingModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [tokenId, setTokenId] = useState<string>("")
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    collegeName: "",
    sharingType: preselectedSharing || ""
  })
  const [isWhatsAppChecked, setIsWhatsAppChecked] = useState(false)

  const generateTokenId = () => {
    return "VJ-" + Math.floor(1000 + Math.random() * 9000);
  }

  const generatePDF = async (id: string) => {
    const doc = new jsPDF()

    const loadImage = (url: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        fetch(url)
          .then(response => response.blob())
          .then(blob => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(blob)
          })
          .catch(reject)
      })
    }

    try {
      // Load Logo
      try {
        const logoData = await loadImage("https://i.postimg.cc/657XPkv7/logo.png")
        doc.addImage(logoData, "PNG", 85, 10, 40, 40)
      } catch (e) {
        console.error("Logo failed to load", e)
      }

      // 1. Professional Blue Border
      const primaryBlue = "#2563EB"
      doc.setDrawColor(37, 99, 235) // #2563EB
      doc.setLineWidth(1)
      doc.rect(5, 5, 200, 287) // A4 Border

      // 2. Header
      doc.setFontSize(22)
      doc.setTextColor(37, 99, 235)
      doc.setFont("helvetica", "bold")
      doc.text("VJ-PG's OFFICIAL DISCOUNT PASS", 105, 60, { align: "center" })

      // 3. Token Details Section
      doc.setDrawColor(200, 200, 200)
      doc.setLineWidth(0.5)
      doc.setFillColor(250, 250, 250)
      doc.roundedRect(30, 75, 150, 105, 3, 3, "FD") // Filled box

      doc.setFontSize(14)
      doc.setTextColor(0, 0, 0)

      let yPos = 90
      const leftX = 40
      const valueX = 90

      const addDetail = (label: string, value: string, isBoldValue = false) => {
        doc.setFont("helvetica", "bold")
        doc.text(label, leftX, yPos)
        doc.setFont("helvetica", isBoldValue ? "bold" : "normal")
        doc.text(value, valueX, yPos)
        yPos += 14
      }

      addDetail("Pass ID:", id, true)
      addDetail("Date of Issue:", new Date().toLocaleDateString())
      addDetail("Student Name:", formData.fullName)
      addDetail("College:", formData.collegeName)
      addDetail("Target PG:", pgName)
      addDetail("Sharing Type:", formData.sharingType)
      doc.setTextColor(37, 99, 235) // Blue for discount
      addDetail("Discount:", "FLAT ₹2,000 OFF", true)
      doc.setTextColor(0, 0, 0) // Reset

      // 4. Digital Seal
      const sealX = 150
      const sealY = 220

      doc.setDrawColor(37, 99, 235)
      doc.setLineWidth(1)
      doc.circle(sealX, sealY, 18)
      doc.circle(sealX, sealY, 15)

      doc.setFontSize(8)
      doc.setTextColor(37, 99, 235)
      doc.setFont("helvetica", "bold")
      doc.text("VJ-PG's VERIFIED", sealX, sealY - 3, { align: "center" })
      doc.text("DISCOUNT GUARANTEED", sealX, sealY + 4, { align: "center" })

      // Signature
      doc.setFont("times", "italic")
      doc.setFontSize(12)
      doc.text("Authorized by VJ-PGs Founders", sealX, sealY + 30, { align: "center" })

      // 5. Legal Terms
      doc.setFont("helvetica", "normal")
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)

      let termsY = 260
      const terms = [
        "1. This pass guarantees a FLAT ₹2,000 discount on the FIRST MONTH'S RENT only.",
        "2. Standard rent applies from the second month onwards as per PG owner's policy.",
        "3. VJ-PG's is a discovery and brokerage platform. We are NOT responsible for any future disputes,",
        "   safety issues, food quality, or conduct within the PG premises.",
        "4. The student must present this digital or printed pass to the PG owner during the first visit to claim the benefit.",
        "5. This token is non-transferable and valid for 7 days from the date of issue."
      ]

      terms.forEach(line => {
        doc.text(line, 20, termsY)
        termsY += 5
      })

      // Save
      const safeName = formData.fullName.replace(/\s+/g, '_')
      doc.save(`VJ_Pass_${safeName}.pdf`)

    } catch (error) {
      console.error("PDF Generation Error", error)
      alert("Could not generate PDF. Please try again.")
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      // Step A: Generate ID
      const newId = generateTokenId()
      setTokenId(newId)

      // Prepare form data for FormSubmit
      const submissionData = {
        _subject: `New Booking Token: ${newId}`,
        _captcha: "false",
        "Token ID": newId,
        "PG Name": pgName,
        "PG Price": `₹${pgPrice}`,
        "Full Name": formData.fullName,
        "Phone Number": formData.phoneNumber,
        "College Name": formData.collegeName,
        "Sharing Type": formData.sharingType,
        "Is WhatsApp": "true"
      }

      // Send to FormSubmit
      await fetch("https://formsubmit.co/ajax/vjpgs.official@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionData)
      })

      // Step B: Show Success State (No Auto Download/Redirect)
      setIsSuccess(true)
      setIsLoading(false)

    } catch (error) {
      console.error("Submission failed", error)
      alert("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  const phoneRegex = /^[6-9]\d{9}$/
  const isFormValid = formData.fullName && phoneRegex.test(formData.phoneNumber) && formData.collegeName && formData.sharingType && isWhatsAppChecked

  return (
    <Dialog open={isOpen} onOpenChange={(val) => {
      if (!val) {
        onClose()
        // Reset state after a delay to ensure smooth closing transition
        setTimeout(() => {
          setIsSuccess(false)
          setTokenId("")
          setFormData({ fullName: "", phoneNumber: "", collegeName: "", sharingType: "" })
        }, 300)
      }
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={isSuccess ? "text-center text-green-600" : ""}>
            {isSuccess ? "Booking Success!" : "Confirm Discount"}
          </DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in duration-300">
            <div className="mb-4 rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Token #{tokenId} Generated!</h3>
            <p className="mt-2 text-muted-foreground text-sm max-w-[280px]">
              Thank You! We have received your request. Download your PDF below.
            </p>

            <Button
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
              onClick={() => generatePDF(tokenId)}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download Verified PDF
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-5 py-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="rounded-md"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Phone Number <span className="text-red-500">*</span></Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your mobile number"
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                    setFormData({ ...formData, phoneNumber: val })
                  }}
                  className="rounded-md"
                  required
                />
                <p className="text-xs text-red-500">
                  ⚠️ We will verify this number via WhatsApp. Invalid numbers will lose the discount.
                </p>
                <div className="flex items-center space-x-2 pt-1">
                  <Checkbox
                    id="whatsapp-check"
                    checked={isWhatsAppChecked}
                    onCheckedChange={(checked) => setIsWhatsAppChecked(checked as boolean)}
                  />
                  <Label
                    htmlFor="whatsapp-check"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    This is my active WhatsApp number
                  </Label>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="collegeName">College Name <span className="text-red-500">*</span></Label>
                <Input
                  id="collegeName"
                  placeholder="Enter your college name"
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                  className="rounded-md"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sharingType">Sharing Type <span className="text-red-500">*</span></Label>
                <Select
                  value={formData.sharingType}
                  onValueChange={(value) => setFormData({ ...formData, sharingType: value })}
                >
                  <SelectTrigger className="rounded-md">
                    <SelectValue placeholder="Select sharing type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single Sharing</SelectItem>
                    <SelectItem value="2 Sharing">2 Sharing</SelectItem>
                    <SelectItem value="3 Sharing">3 Sharing</SelectItem>
                    <SelectItem value="4 Sharing">4 Sharing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Token...
                </>
              ) : (
                "Send for Verification & Download"
              )}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
