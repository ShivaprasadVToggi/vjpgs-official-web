import { useState } from "react"
import { jsPDF } from "jspdf"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle2, FileDown } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  pgName: string
  pgPrice: number
}

export function BookingModal({ isOpen, onClose, pgName, pgPrice }: BookingModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [tokenId, setTokenId] = useState<string>("")
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    collegeName: "",
    sharingType: ""
  })

  const generateTokenId = () => {
    return "VJ-" + Math.floor(1000 + Math.random() * 9000);
  }

  const generatePDF = (id: string) => {
    const doc = new jsPDF()

    // -- Set Styles --
    const primaryColor = "#16a34a" // green-600

    // Header
    doc.setFontSize(22)
    doc.setTextColor(primaryColor)
    doc.setFont("helvetica", "bold")
    doc.text("OFFICIAL VJ-PGs BOOKING PASS", 105, 20, { align: "center" })

    doc.setLineWidth(0.5)
    doc.setDrawColor(200, 200, 200)
    doc.line(20, 25, 190, 25)

    // Token Details
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.setFont("helvetica", "normal")

    let yPos = 40
    const addLine = (label: string, value: string) => {
      doc.setFont("helvetica", "bold")
      doc.text(label, 20, yPos)
      doc.setFont("helvetica", "normal")
      doc.text(value, 80, yPos)
      yPos += 12
    }

    // Draw Big Token ID
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(primaryColor)
    doc.text(`Token ID: ${id}`, 105, yPos + 10, { align: "center" })
    yPos += 30

    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.setFont("helvetica", "normal")

    addLine("Student Name:", formData.fullName)
    addLine("Phone Number:", formData.phoneNumber)
    addLine("College:", formData.collegeName)
    addLine("PG Name:", pgName)
    addLine("Sharing Type:", formData.sharingType)
    addLine("Discount Price:", `Rs. ${pgPrice}/month`)
    addLine("Date Issued:", new Date().toLocaleDateString())

    // Digital Seal
    doc.setDrawColor(primaryColor)
    doc.setLineWidth(1.5)
    doc.circle(150, 60, 20, "S")

    doc.setFontSize(10)
    doc.setTextColor(primaryColor)
    doc.setFont("helvetica", "bold")
    doc.text("VJ-PGs", 150, 58, { align: "center" })
    doc.text("VERIFIED", 150, 64, { align: "center" })

    // Footer Note
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.setFont("helvetica", "italic")
    doc.text("* Present this digital token at the property to claim the discount.", 105, 250, { align: "center" })
    doc.text("* Valid for 7 days from issue date.", 105, 255, { align: "center" })

    // Save
    doc.save(`VJ-Token-${id}.pdf`)
  }

  const handleOpenWhatsApp = (id: string) => {
    const message = `Hi VJ! I have generated my Discount Token: *${id}*.

Name: ${formData.fullName}
PG: ${pgName}
College: ${formData.collegeName}
Sharing: ${formData.sharingType}

I am attaching the PDF proof now.`

    window.open("https://wa.me/919743055967?text=" + encodeURIComponent(message), "_blank")
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
      }

      // Send to FormSubmit
      await fetch("https://formsubmit.co/ajax/shivaprasadtoggi45@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionData)
      })

      // Step B: Generate PDF (Trigger Download)
      generatePDF(newId)

      // Step D: Execute Sequence - Wait then Redirect
      setTimeout(() => {
        handleOpenWhatsApp(newId)
        setIsSuccess(true)
        setIsLoading(false)
      }, 1500)

    } catch (error) {
      console.error("Submission failed", error)
      alert("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  const isFormValid = formData.fullName && formData.phoneNumber && formData.collegeName && formData.sharingType

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
              Please attach the downloaded PDF in the WhatsApp chat that just opened.
            </p>

            <Button
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
              onClick={() => handleOpenWhatsApp(tokenId)}
            >
              Open WhatsApp Again
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
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="rounded-md"
                  required
                />
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
                "Generate Discount Token"
              )}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
