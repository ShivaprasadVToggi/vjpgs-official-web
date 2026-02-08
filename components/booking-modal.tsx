import { useState } from "react"
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle2, FileDown, AlertTriangle } from "lucide-react"
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
    return "VJ-" + Math.floor(10000 + Math.random() * 90000);
  }

  const generatePDF = async (id: string, sharingPrice: number) => {
    try {
      // 1. Fetch the template PDF
      const templateUrl = '/token_template.pdf'
      const existingPdfBytes = await fetch(templateUrl).then(res => res.arrayBuffer())

      // 2. Load the PDF
      const pdfDoc = await PDFDocument.load(existingPdfBytes)

      // 3. Embed font
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

      // 4. Get the first page
      const pages = pdfDoc.getPages()
      const page = pages[0]
      const { height } = page.getSize()

      // 1. PRECISION CLEARANCE (Shifted to match new table position)
      page.drawRectangle({
        x: 105,   // Shifted right from 55
        y: 535,   // Shifted down slightly to protect Part B text
        width: 450,
        height: 110,
        color: rgb(1, 1, 1),
      });

      // 2. THE RE-POSITIONED TABLE STRUCTURE
      const tableConfig = {
        x: 110,           // Shifted RIGHT (from 60) to sit opposite the logo area
        width: 430,       // Slightly narrower to stay safe on the right margin
        startY: 640,      // Shifted DOWN (from 652) towards Part B
        rowHeight: 18,    // Keeping the compact rows
        colSplit: 160,
      };

      // Get issue date
      const issueDate = new Date().toLocaleDateString('en-IN')

      const tableData = [
        ["TOKEN ID:", id],
        ["ISSUED DATE:", issueDate],
        ["STUDENT NAME:", formData.fullName],
        ["PG PROPERTY NAME:", pgName],
        ["SHARING TYPE:", formData.sharingType],
        ["FINAL PRICE (1st MONTH):", `Rs. ${sharingPrice.toLocaleString()}/-`]
      ];

      // 3. DRAW THE TABLE
      tableData.forEach((row, i) => {
        const y = tableConfig.startY - (i * tableConfig.rowHeight);

        // Draw Horizontal Line
        page.drawLine({
          start: { x: tableConfig.x, y },
          end: { x: tableConfig.x + tableConfig.width, y },
          thickness: 0.6,
          color: rgb(0, 0, 0),
        });

        // Draw Label (Left Side)
        page.drawText(row[0], {
          x: tableConfig.x + 6,
          y: y - 12,
          size: 8.5,
          font,
          color: rgb(0, 0, 0),
        });

        // Draw Value (Right Side)
        page.drawText(row[1], {
          x: tableConfig.x + tableConfig.colSplit + 8,
          y: y - 12,
          size: 8.5,
          font,
          color: i === 5 ? rgb(0, 0.5, 0) : rgb(0, 0, 0),
        });
      });

      // Draw the bottom-most line
      const bottomY = tableConfig.startY - (6 * tableConfig.rowHeight);
      page.drawLine({
        start: { x: tableConfig.x, y: bottomY },
        end: { x: tableConfig.x + tableConfig.width, y: bottomY },
        thickness: 0.6,
        color: rgb(0, 0, 0),
      });

      // Draw Vertical Lines
      [0, tableConfig.colSplit, tableConfig.width].forEach(offset => {
        page.drawLine({
          start: { x: tableConfig.x + offset, y: tableConfig.startY },
          end: { x: tableConfig.x + offset, y: bottomY },
          thickness: 0.6,
          color: rgb(0, 0, 0),
        });
      });



      // 9. Save the PDF
      const pdfBytes = await pdfDoc.save()

      // 10. Trigger download
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `VJ_Token_${id}.pdf`
      link.click()
      URL.revokeObjectURL(url)

    } catch (error) {
      console.error("PDF generation failed:", error)
      alert("Could not generate PDF. Please try again.")
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      // Step 1: Generate Token ID
      const newId = generateTokenId()
      setTokenId(newId)

      // Step 2: Get issue date
      const issueDate = new Date().toLocaleDateString('en-IN')

      // Step 3: Prepare form data for FormSubmit with Token ID in subject
      const submissionData = {
        _subject: `NEW BOOKING: ${newId} - ${formData.fullName}`,
        _captcha: "false",
        "Token ID": newId,
        "Issue Date": issueDate,
        "PG Name": pgName,
        "Sharing Type": formData.sharingType,
        "Price": `₹${pgPrice}`,
        "Full Name": formData.fullName,
        "Phone Number": formData.phoneNumber,
        "College Name": formData.collegeName,
        "Is WhatsApp": "true"
      }

      // Step 4: Send to FormSubmit
      await fetch("https://formsubmit.co/ajax/vjpgs.official@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionData)
      })

      // Step 5: Generate and download PDF
      await generatePDF(newId, pgPrice)

      // Step 6: Show Success State
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
              Token sent to VJ Team! PDF Downloading...
            </p>

            <div className="mt-6 flex items-start gap-4 rounded-r-lg border-l-4 border-amber-400 bg-amber-50 p-4 text-left w-full max-w-sm">
              <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-sm font-medium text-amber-800">
                ACTION REQUIRED: To claim your discount, you MUST take a physical printout of this token and submit it to the PG Owner during your visit.
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground max-w-[300px]">
              Please check your downloads folder for <span className="font-semibold">VJ_Token_{tokenId}.pdf</span>
            </p>
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
                  Securing Token...
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
