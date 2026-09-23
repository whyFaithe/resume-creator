"use client"

import { useState, useRef } from "react"
import ResumeDownload from "./resume-download"
import SideScreen from "./side-screen"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ResumePage() {
  const [accentColor, setAccentColor] = useState("#98C1B6")
  const [header, setHeader] = useState({
    name: "Faithe Yates",
    title: "Automation & Systems Specialist",
    location: "New York, NY",
    phone: "(631) 450-2007",
    email: "tech@whyfaithe.com",
    website: "",
    linkedin: "linkedin.com/in/whyfaithe",
    github: "",
  })
  const [contactOrder, setContactOrder] = useState(["location", "phone", "email", "linkedin"])
  const [sections, setSections] = useState({
    objective:
      "Automation Specialist with 5+ years of experience building systems for registration, attendance, reporting, payments, and staff operations. Strong experience with Google Apps Script, JavaScript, Airtable, Google Sheets, APIs, webhooks, and forms. Built full registration and attendance systems for education programs, including data tracking, follow-ups, absence reporting, and daily attendance records. Skilled at replacing manual work with simple systems that staff can use.",
    coreCompetencies: [
      "Code: JavaScript, Google Apps Script, HTML, CSS, React",
      "Platforms: Airtable, Google Sheets, Formsite, Google Forms, Jotform, Stripe, Firebase",
      "Integrations: REST APIs, Webhooks, Make.com",
      "Automation: Registration, Attendance, Data Syncing, Record Updates, Notifications, Reporting",
      "Airtable: Bases, Interfaces, Forms, Automations, Scripts, API Connections",
      "Other: Google Workspace, Excel, Git, Figma, Notion",
    ],
    experience: [
      {
        title: "Automation & Systems Consultant",
        company: "Freelance",
        location: "",
        date: "2020–Present",
        bullets: [
          "Build automations with Google Apps Script, JavaScript, Airtable, APIs, webhooks, and Make.com.",
          "Connect platforms so data moves between systems without repeated manual entry.",
          "Build systems to collect, organize, track, and update records.",
          "Use APIs and webhooks to send and update data across different platforms.",
          "Build rules and checks to improve data accuracy.",
          "Find and fix problems with APIs, workflow logic, and data.",
          "Build simple tools that let staff manage more complex systems behind the scenes.",
          "Write clear instructions so systems can be maintained by others.",
        ],
      },
      {
        title: "Web & Workflow Developer",
        company: "Freelance",
        location: "",
        date: "2020–Present",
        bullets: [
          "Build web apps and internal tools with JavaScript, React, HTML, CSS, and Firebase.",
          "Connect websites, forms, databases, and payment systems through APIs.",
          "Build registration and data collection systems for small programs and organizations.",
          "Debug code, API connections, and data problems.",
          "Create workflows that reduce repeated staff work.",
        ],
      },
      {
        title: "Assistant Director, Business Operations",
        company: "Manhattan Youth",
        location: "New York, NY",
        date: "2018–2024",
        bullets: [
          "Built and managed registration, attendance, scheduling, and communication systems for youth programs.",
          "Built a full registration system with Formsite, Google Sheets, and automated follow-ups.",
          "Created a two-step registration process that handled both DYCD registration and class registration.",
          "Moved registration from hundreds of paper forms to about five paper forms, mainly for families who needed non-English support.",
          "Built Google Sheet records that organized student registration information and fed data into attendance sheets.",
          "Included student allergies and other important information directly in attendance records.",
          "Built an absence form that let families or staff report absences before the program day.",
          "Set the attendance system to show only that day's reported absences and send them to the daily attendance sheet.",
          "Added early dismissal information to the same attendance process so staff could see important daily updates in one place.",
          "Built sports registration systems in Formsite.",
          "Used Google Forms for permission slips and other student forms.",
          "Built a Google Apps Script attendance process that reduced a 1–2 hour task to about 5 minutes.",
          "Trained staff and created instructions for new systems.",
        ],
      },
    ],
    education: [
      {
        degree: "Front-End Development",
        school: "Scrimba — JavaScript, React, APIs",
        location: "",
      },
      {
        degree: "B.S., Mechanical Engineering",
        school: "University of the Pacific",
        location: "",
      },
    ],
    certifications: [],
    technicalStack: [
      "Airtable + Stripe Management System — Built an Airtable system that connects with Stripe to manage invoices and payments; automated customer lookup, invoice creation, line items, payment tracking, and record updates.",
      "Education Registration & Attendance System — Built a full Formsite and Google Sheets registration process with absence, early dismissal, allergy, and daily attendance reporting.",
      "Hockey Camp Registration System — Built a lightweight registration system connected with Stripe for payments, online forms, and waivers.",
      "High-Volume API Automation — Built an API automation that could process 900+ designs per day, including data preparation, API requests, processing, and record updates.",
    ],
  })
  const [printSettings, setPrintSettings] = useState({
    margin: 96,
    fontSize: 11,
    headingFontSize: 22,
    sectionHeadingFontSize: 14,
    bulletFontSize: 10,
    lineSpacing: 1.3,
    sectionSpacing: 16,
  })
  const [zoom, setZoom] = useState(50)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const resumeContentRef = useRef<HTMLDivElement>(null)
  const [sectionVisibility, setSectionVisibility] = useState({
    objective: true,
    coreCompetencies: true,
    selectedImpact: false,
    experience: true,
    education: true,
    certifications: true,
    technicalStack: true,
  })
  const [sectionOrder, setSectionOrder] = useState([
    "objective",
    "coreCompetencies",
    "experience",
    "education",
    "technicalStack",
  ])
  const [skillsColumns, setSkillsColumns] = useState(1)

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0])
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const renderSection = (sectionKey: string) => {
    if (!sectionVisibility[sectionKey as keyof typeof sectionVisibility]) return null

    switch (sectionKey) {
      case "objective":
        return (
          <div key="objective" style={{ marginBottom: `${printSettings.sectionSpacing}px` }}>
            <h3
              className="text-lg font-medium mb-2 uppercase"
              style={{
                color: accentColor,
                fontSize: `${printSettings.sectionHeadingFontSize}px`,
              }}
            >
              Summary
            </h3>
            <p className="text-gray-700" style={{ fontSize: `${printSettings.fontSize}px` }}>
              {sections.objective}
            </p>
          </div>
        )

      case "coreCompetencies":
        return (
          <div key="coreCompetencies" style={{ marginBottom: `${printSettings.sectionSpacing}px` }}>
            <h3
              className="text-lg font-medium mb-2 uppercase"
              style={{
                color: accentColor,
                fontSize: `${printSettings.sectionHeadingFontSize}px`,
              }}
            >
              Skills
            </h3>
            <div
              className={
                skillsColumns === 1
                  ? "grid grid-cols-1 gap-y-1"
                  : skillsColumns === 2
                    ? "grid grid-cols-2 gap-x-4 gap-y-1"
                    : "grid grid-cols-3 gap-x-3 gap-y-1"
              }
            >
              {sections.coreCompetencies.map((competency, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-gray-700 mr-2" style={{ fontSize: `${printSettings.fontSize}px` }}>
                    •
                  </span>
                  <span className="text-gray-700" style={{ fontSize: `${printSettings.fontSize}px` }}>
                    {competency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )

      case "selectedImpact":
        return (
          <div key="selectedImpact" style={{ marginBottom: `${printSettings.sectionSpacing}px` }}>
            <h3
              className="text-lg font-medium mb-2 uppercase"
              style={{
                color: accentColor,
                fontSize: `${printSettings.sectionHeadingFontSize}px`,
              }}
            >
              Selected Impact
            </h3>
            <div className="space-y-1">
              {sections.selectedImpact.map((impact, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-gray-700 mr-2" style={{ fontSize: `${printSettings.fontSize}px` }}>
                    •
                  </span>
                  <span className="text-gray-700" style={{ fontSize: `${printSettings.fontSize}px` }}>
                    {impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )

      case "experience":
        return (
          <div key="experience" style={{ marginBottom: `${printSettings.sectionSpacing}px` }}>
            <h3
              className="text-lg font-medium mb-2 uppercase"
              style={{
                color: accentColor,
                fontSize: `${printSettings.sectionHeadingFontSize}px`,
              }}
            >
              Professional Experience
            </h3>
            {sections.experience.map((job, index) => (
              <div
                key={index}
                className="page-break-inside-avoid mb-4"
                style={{
                  marginBottom: `${printSettings.sectionSpacing / 2}px`,
                }}
              >
                <div className="mb-1">
                  <h4 className="font-semibold text-gray-800" style={{ fontSize: `${printSettings.fontSize + 1}px` }}>
                    {job.title}
                  </h4>
                  <p className="text-gray-600" style={{ fontSize: `${printSettings.fontSize}px` }}>
                    {[job.company, job.location, job.date].filter(Boolean).join(" | ")}
                  </p>
                </div>
                {/* Job descriptions */}
                {index === 0 && (
                  <p className="text-gray-700 mb-2" style={{ fontSize: `${printSettings.fontSize}px` }}>
                    {null}
                  </p>
                )}
                {index === 1 && (
                  <p className="text-gray-700 mb-2" style={{ fontSize: `${printSettings.fontSize}px` }}>
                    {null}
                  </p>
                )}
                {index === 2 && (
                  <p className="text-gray-700 mb-2" style={{ fontSize: `${printSettings.fontSize}px` }}>
                    {null}
                  </p>
                )}
                <div className="space-y-0.5">
                  {job.bullets.map((bullet, bulletIndex) => (
                    <div key={bulletIndex} className="flex items-start">
                      <span className="text-gray-700 mr-2" style={{ fontSize: `${printSettings.bulletFontSize}px` }}>
                        -
                      </span>
                      <span className="text-gray-700" style={{ fontSize: `${printSettings.bulletFontSize}px` }}>
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )

      case "education":
        return (
          <div key="education" style={{ marginBottom: `${printSettings.sectionSpacing}px` }}>
            <h3
              className="text-lg font-medium mb-2 uppercase"
              style={{
                color: accentColor,
                fontSize: `${printSettings.sectionHeadingFontSize}px`,
              }}
            >
              Education
            </h3>
            {sections.education.map((edu, index) => (
              <div key={index} className="mb-1">
                <p className="text-gray-800" style={{ fontSize: `${printSettings.fontSize}px` }}>
                  <strong>{edu.degree}</strong>
                </p>
                <p className="text-gray-800" style={{ fontSize: `${printSettings.fontSize}px` }}>
                  {[edu.school, edu.location].filter(Boolean).join(" | ")}
                </p>
              </div>
            ))}
          </div>
        )

      case "certifications":
        return (
          <div key="certifications" style={{ marginBottom: `${printSettings.sectionSpacing}px` }}>
            <h3
              className="text-lg font-medium mb-2 uppercase"
              style={{
                color: accentColor,
                fontSize: `${printSettings.sectionHeadingFontSize}px`,
              }}
            >
              Certifications
            </h3>
            {sections.certifications.map((cert, index) => (
              <p key={index} className="text-gray-800 mb-1" style={{ fontSize: `${printSettings.fontSize}px` }}>
                {cert}
              </p>
            ))}
          </div>
        )

      case "technicalStack":
        return (
          <div key="technicalStack" style={{ marginBottom: `${printSettings.sectionSpacing}px` }}>
            <h3
              className="text-lg font-medium mb-2 uppercase"
              style={{
                color: accentColor,
                fontSize: `${printSettings.sectionHeadingFontSize}px`,
              }}
            >
              Selected Automation Projects
            </h3>
            {sections.technicalStack.map((stack, index) => (
              <p key={index} className="text-gray-800 mb-1" style={{ fontSize: `${printSettings.fontSize}px` }}>
                {stack}
              </p>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  const ResumeContent = () => {
    const visibleSections = sectionOrder.filter(
      (section) => sectionVisibility[section as keyof typeof sectionVisibility],
    )

    // More granular content items for better page distribution
    const contentItems: Array<{
      type: "header" | "section-header" | "subsection"
      sectionKey: string
      content: any
      height: number
    }> = []

    // Add header
    contentItems.push({
      type: "header",
      sectionKey: "header",
      content: null,
      height: 120,
    })

    // Process each visible section
    visibleSections.forEach((sectionKey) => {
      switch (sectionKey) {
        case "objective":
        case "coreCompetencies":
        case "selectedImpact":
          // These are single-block sections - calculate height based on current font settings
          let sectionHeight = printSettings.sectionHeadingFontSize + printSettings.sectionSpacing
          if (sectionKey === "objective") {
            // Estimate text height based on content length and font size
            const textLines = Math.ceil(sections.objective.length / 80) // Rough chars per line
            sectionHeight += textLines * (printSettings.fontSize * printSettings.lineSpacing)
          } else if (sectionKey === "coreCompetencies") {
            const itemsPerColumn = Math.ceil(sections.coreCompetencies.length / skillsColumns)
            sectionHeight += itemsPerColumn * (printSettings.fontSize * printSettings.lineSpacing + 4)
          } else if (sectionKey === "selectedImpact") {
            sectionHeight += sections.selectedImpact.length * (printSettings.fontSize * printSettings.lineSpacing + 4)
          }

          contentItems.push({
            type: "section-header",
            sectionKey,
            content: null,
            height: sectionHeight,
          })
          break

        case "experience":
          // Add section header with dynamic height
          contentItems.push({
            type: "section-header",
            sectionKey: "experience-header",
            content: null,
            height: printSettings.sectionHeadingFontSize + printSettings.sectionSpacing,
          })
          // Add each job as separate item with dynamic height calculation
          sections.experience.forEach((job, index) => {
            const titleHeight = (printSettings.fontSize + 1) * printSettings.lineSpacing
            const companyHeight = printSettings.fontSize * printSettings.lineSpacing
            const descriptionHeight = printSettings.fontSize * printSettings.lineSpacing * 2 // Assuming 2 lines for description
            const bulletsHeight = job.bullets.length * (printSettings.bulletFontSize * printSettings.lineSpacing + 2)
            const spacing = printSettings.sectionSpacing / 2

            contentItems.push({
              type: "subsection",
              sectionKey: "experience",
              content: { job, index },
              height: titleHeight + companyHeight + descriptionHeight + bulletsHeight + spacing,
            })
          })
          break

        case "education":
          contentItems.push({
            type: "section-header",
            sectionKey: "education-header",
            content: null,
            height: printSettings.sectionHeadingFontSize + printSettings.sectionSpacing,
          })
          sections.education.forEach((edu, index) => {
            const itemHeight = printSettings.fontSize * printSettings.lineSpacing * 2 + 8 // Two lines plus spacing
            contentItems.push({
              type: "subsection",
              sectionKey: "education",
              content: { edu, index },
              height: itemHeight,
            })
          })
          break

        case "certifications":
          if (sections.certifications?.length) {
            contentItems.push({
              type: "section-header",
              sectionKey: "certifications-header",
              content: null,
              height: 220,
            })
            sections.certifications.forEach((cert, index) => {
              const itemHeight = printSettings.fontSize * printSettings.lineSpacing + 4
              contentItems.push({
                type: "subsection",
                sectionKey: "certifications",
                content: { cert, index },
                height: itemHeight,
              })
            })
          }
          break

        case "technicalStack":
          if (sections.technicalStack?.length) {
            contentItems.push({
              type: "section-header",
              sectionKey: "technicalStack-header",
              content: null,
              height: 400,
            })
            sections.technicalStack.forEach((tech, index) => {
              const itemHeight = 400
              contentItems.push({
                type: "subsection",
                sectionKey: "technicalStack",
                content: { tech, index },
                height: itemHeight,
              })
            })
          }
          break
      }
    })

    // Update header height calculation to be dynamic
    contentItems[0] = {
      type: "header",
      sectionKey: "header",
      content: null,
      height:
        printSettings.headingFontSize +
        printSettings.fontSize * contactOrder.length +
        printSettings.sectionSpacing +
        40, // 40 for HR and spacing
    }

    // Use standard letter size (8.5" x 11" = 816px x 1056px at 96 DPI) minus margins
    const pageHeight = 1056 - printSettings.margin * 2

    const page1Items: typeof contentItems = []
    const page2Items: typeof contentItems = []

    let currentPageHeight = 0
    let page2Started = false

    for (let i = 0; i < contentItems.length; i++) {
      const item = contentItems[i]

      // Try to fit on current page
      if (!page2Started && currentPageHeight + item.height <= pageHeight) {
        page1Items.push(item)
        currentPageHeight += item.height
      } else {
        // Once content moves to page 2, keep all later content there so
        // section order cannot visually jump backward onto page 1.
        page2Started = true
        page2Items.push(item)
      }
    }

    const renderContentItem = (item: (typeof contentItems)[0]) => {
      switch (item.sectionKey) {
        case "header":
          return (
            <div
              key="header"
              className="text-center mb-4"
              style={{ marginBottom: `${printSettings.sectionSpacing}px` }}
            >
              <h1
                className="text-4xl font-semibold mb-2"
                style={{
                  color: accentColor,
                  fontSize: `${printSettings.headingFontSize}px`,
                }}
              >
                {header.name}
              </h1>
              {header.title && (
                <p className="text-gray-700 mb-2" style={{ fontSize: `${printSettings.fontSize + 1}px` }}>
                  {header.title}
                </p>
              )}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {contactOrder.map((contactType) => {
                  const contactMap = {
                    location: { icon: null, value: header.location, display: header.location },
                    phone: { icon: null, value: header.phone, display: header.phone },
                    email: { icon: null, value: header.email, display: header.email },
                    website: { icon: null, value: header.website, display: header.website },
                    linkedin: { icon: null, value: header.linkedin, display: header.linkedin },
                    github: { icon: null, value: header.github, display: header.github },
                  }

                  const contact = contactMap[contactType as keyof typeof contactMap]
                  if (!contact || !contact.value) return null

                  return (
                    <span key={contactType} style={{ fontSize: `${printSettings.fontSize}px` }}>
                      {contact.display}
                      {contactType !== contactOrder[contactOrder.length - 1] && contact.value && " | "}
                    </span>
                  )
                })}
              </div>
              <hr className="border-gray-300 mt-4" />
            </div>
          )

        case "objective":
        case "coreCompetencies":
        case "selectedImpact":
          return renderSection(item.sectionKey)

        case "experience-header":
          return (
            <h3
              key="experience-header"
              className="text-lg font-medium mb-2 uppercase"
              style={{
                color: accentColor,
                fontSize: `${printSettings.sectionHeadingFontSize}px`,
                marginBottom: `${printSettings.sectionSpacing / 2}px`,
              }}
            >
              Professional Experience
            </h3>
          )

        case "experience":
          const { job, index } = item.content
          return (
            <div
              key={`experience-${index}`}
              className="page-break-inside-avoid mb-4"
              style={{ marginBottom: `${printSettings.sectionSpacing / 2}px` }}
            >
              <div className="mb-1">
                <h4 className="font-semibold text-gray-800" style={{ fontSize: `${printSettings.fontSize + 1}px` }}>
                  {job.title}
                </h4>
                <p className="text-gray-600" style={{ fontSize: `${printSettings.fontSize}px` }}>
                  {[job.company, job.location, job.date].filter(Boolean).join(" | ")}
                </p>
              </div>
              {index === 0 && (
                <p className="text-gray-700 mb-2" style={{ fontSize: `${printSettings.fontSize}px` }}>
                  {null}
                </p>
              )}
              {index === 1 && (
                <p className="text-gray-700 mb-2" style={{ fontSize: `${printSettings.fontSize}px` }}>
                  {null}
                </p>
              )}
              {index === 2 && (
                <p className="text-gray-700 mb-2" style={{ fontSize: `${printSettings.fontSize}px` }}>
                  {null}
                </p>
              )}
              <div className="space-y-0.5">
                {job.bullets.map((bullet: string, bulletIndex: number) => (
                  <div key={bulletIndex} className="flex items-start">
                    <span className="text-gray-700 mr-2" style={{ fontSize: `${printSettings.bulletFontSize}px` }}>
                      -
                    </span>
                    <span className="text-gray-700" style={{ fontSize: `${printSettings.bulletFontSize}px` }}>
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )

        case "education-header":
          return (
            <h3
              key="education-header"
              className="text-lg font-medium mb-2 uppercase"
              style={{
                color: accentColor,
                fontSize: `${printSettings.sectionHeadingFontSize}px`,
                marginBottom: `${printSettings.sectionSpacing / 2}px`,
              }}
            >
              Education
            </h3>
          )

        case "education":
          const { edu, index: eduIndex } = item.content
          return (
            <div key={`education-${eduIndex}`} className="mb-1">
              <p className="text-gray-800" style={{ fontSize: `${printSettings.fontSize}px` }}>
                <strong>{edu.degree}</strong>
              </p>
              <p className="text-gray-800" style={{ fontSize: `${printSettings.fontSize}px` }}>
                {[edu.school, edu.location].filter(Boolean).join(" | ")}
              </p>
            </div>
          )

        case "certifications-header":
          return (
            <h3
              key="certifications-header"
              className="text-lg font-medium mb-2 uppercase"
              style={{
                color: accentColor,
                fontSize: `${printSettings.sectionHeadingFontSize}px`,
                marginBottom: `${printSettings.sectionSpacing / 2}px`,
              }}
            >
              Certifications
            </h3>
          )

        case "certifications":
          const { cert, index: certIndex } = item.content
          return (
            <p
              key={`cert-${certIndex}`}
              className="text-gray-800 mb-1"
              style={{ fontSize: `${printSettings.fontSize}px` }}
            >
              {cert}
            </p>
          )

        case "technicalStack-header":
          return (
            <h3
              key="technicalStack-header"
              className="text-lg font-medium mb-2 uppercase"
              style={{
                color: accentColor,
                fontSize: `${printSettings.sectionHeadingFontSize}px`,
                marginBottom: `${printSettings.sectionSpacing / 2}px`,
              }}
            >
              Selected Automation Projects
            </h3>
          )

        case "technicalStack":
          const { tech, index: techIndex } = item.content
          return (
            <p
              key={`tech-${techIndex}`}
              className="text-gray-800 mb-1"
              style={{ fontSize: `${printSettings.fontSize}px` }}
            >
              {tech}
            </p>
          )

        default:
          return null
      }
    }

    return (
      <div className="resume-pages">
        {/* Page 1 */}
        <div
          className="bg-white page-content"
          style={{
            width: "816px",
            height: "1056px",
            padding: `${printSettings.margin}px`,
            lineHeight: printSettings.lineSpacing,
            pageBreakAfter: page2Items.length > 0 ? "always" : "auto",
          }}
        >
          {page1Items.map((item, index) => renderContentItem(item))}
        </div>

        {/* Page 2 - Only render if there are items for it */}
        {page2Items.length > 0 && (
          <div
            className="bg-white page-content"
            style={{
              width: "816px",
              height: "1056px",
              padding: `${printSettings.margin}px`,
              lineSpacing: printSettings.lineSpacing,
            }}
          >
            {page2Items.map((item, index) => renderContentItem(item))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen min-w-max w-full bg-gray-100 flex">
      {/* Main Content Area */}
      <div className={`flex-1 p-8 transition-all duration-300 ${sidebarOpen ? "ml-[320px]" : "ml-0"}`}>
        <div className="max-w-none mx-auto flex justify-center">
          <div className="mb-8 fixed top-8 left-1/2 transform -translate-x-1/2 z-10">
            <ResumeDownload />
          </div>
          <div
            className="overflow-auto flex justify-center items-start pt-20"
            style={{
              maxHeight: "calc(100vh - 40px)",
              width: "100%",
            }}
          >
            <div
              className="resume-wrapper"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "center top",
                transition: "transform 0.2s ease-in-out",
              }}
            >
              <div className="shadow-lg rounded-lg overflow-hidden" style={{ margin: "20px" }}>
                <ResumeContent />
              </div>
            </div>
          </div>
          <div className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border flex flex-col items-center gap-2">
            <Label htmlFor="zoom-control" className="text-sm font-medium">
              Zoom: {zoom}%
            </Label>
            <Slider
              id="zoom-control"
              min={25}
              max={200}
              step={25}
              value={[zoom]}
              onValueChange={handleZoomChange}
              className="w-32"
            />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <SideScreen
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        header={header}
        setHeader={setHeader}
        contactOrder={contactOrder}
        setContactOrder={setContactOrder}
        sections={sections}
        setSections={setSections}
        printSettings={printSettings}
        setPrintSettings={setPrintSettings}
        sectionVisibility={sectionVisibility}
        setSectionVisibility={setSectionVisibility}
        sectionOrder={sectionOrder}
        setSectionOrder={setSectionOrder}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        skillsColumns={skillsColumns}
        setSkillsColumns={setSkillsColumns}
      />

    </div>
  )
}
