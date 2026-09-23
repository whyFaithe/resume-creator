"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

export default function ResumeDownload() {
  const [isLoading, setIsLoading] = useState(false)

  const handlePrint = () => {
    const printContent = document.querySelector(".resume-pages") as HTMLElement
    if (printContent) {
      const styles = Array.from(document.styleSheets)
        .map((styleSheet) => {
          try {
            return Array.from(styleSheet.cssRules)
              .map((rule) => rule.cssText)
              .join("\n")
          } catch (e) {
            console.log("Error accessing styleSheet", e)
            return ""
          }
        })
        .join("\n")

      const iframe = document.createElement("iframe")
      iframe.style.position = "fixed"
      iframe.style.right = "0"
      iframe.style.bottom = "0"
      iframe.style.width = "0"
      iframe.style.height = "0"
      iframe.style.border = "0"
      iframe.setAttribute("aria-hidden", "true")
      document.body.appendChild(iframe)

      const iframeDoc = iframe.contentWindow?.document
      if (!iframeDoc || !iframe.contentWindow) {
        document.body.removeChild(iframe)
        console.error("Failed to create print frame")
        return
      }

      let hasPrinted = false
      const printFrame = () => {
        if (hasPrinted) return
        hasPrinted = true
        iframe.contentWindow?.focus()
        iframe.contentWindow?.print()
        window.setTimeout(() => {
          if (iframe.parentNode) document.body.removeChild(iframe)
        }, 1000)
      }

      iframe.onload = printFrame

      iframeDoc.open()
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Resume</title>
            <style>${styles}</style>
          </head>
          <body>
            ${printContent.outerHTML}
          </body>
        </html>
      `)
      iframeDoc.close()

      // document.write() does not consistently emit iframe.onload in every browser.
      // Keep the load handler for browsers that do fire it, with a guarded fallback
      // so the button still opens the native print dialog reliably.
      window.setTimeout(printFrame, 100)
    } else {
      console.error("Resume content not found")
    }
  }

  const handleTxtDownload = async () => {
    setIsLoading(true)
    try {
      const resume = document.querySelector(".resume-pages")
      if (!resume) {
        throw new Error("Resume content not found")
      }

      let content = resume.textContent || ""
      content = content.replace(/\s+/g, " ").trim() // Remove extra whitespace
      const blob = new Blob([content], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "resume.txt"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
      alert("Download failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePdfDownload = async () => {
    setIsLoading(true)
    try {
      const pages = Array.from(document.querySelectorAll<HTMLElement>(".resume-pages .page-content"))
      if (!pages.length) {
        throw new Error("Resume pages not found")
      }

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "letter",
        compress: true,
      })

      for (const [index, page] of pages.entries()) {
        const previewWrapper = page.closest<HTMLElement>(".resume-wrapper")
        const previousTransform = previewWrapper?.style.transform ?? ""
        if (previewWrapper) previewWrapper.style.transform = "none"

        let canvas: HTMLCanvasElement
        try {
          canvas = await html2canvas(page, {
            backgroundColor: "#ffffff",
            scale: 2,
            useCORS: true,
            logging: false,
          })
        } finally {
          if (previewWrapper) previewWrapper.style.transform = previousTransform
        }

        if (index > 0) pdf.addPage("letter", "portrait")
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 612, 792)
      }

      pdf.save("faithe-yates-resume.pdf")
    } catch (error) {
      console.error("PDF download failed:", error)
      alert("PDF download failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center p-4 bg-white rounded-lg shadow-sm">
      <Button onClick={handlePrint} className="w-full sm:w-auto bg-[#98C1B6] hover:bg-[#7AA498] text-white">
        <FileDown className="mr-2 h-4 w-4" />
        Print Resume
      </Button>
      <Button
        onClick={handlePdfDownload}
        variant="outline"
        className="w-full sm:w-auto border-[#98C1B6] text-[#98C1B6] hover:bg-[#98C1B6] hover:text-white"
        disabled={isLoading}
      >
        <FileDown className="mr-2 h-4 w-4" />
        {isLoading ? "Generating PDF..." : "Download PDF"}
      </Button>
      <Button
        onClick={handleTxtDownload}
        variant="outline"
        className="w-full sm:w-auto border-[#98C1B6] text-[#98C1B6] hover:bg-[#98C1B6] hover:text-white"
        disabled={isLoading}
      >
        <FileDown className="mr-2 h-4 w-4" />
        {isLoading ? "Generating TXT..." : "Download TXT"}
      </Button>
    </div>
  )
}
