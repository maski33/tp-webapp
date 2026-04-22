import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Destinations } from "@/components/destinations"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"

export const metadata: Metadata = {
  title: "Destinations | Agence VoyageTemporel",
  description: "Explorez toutes nos destinations de voyage temporel.",
}

export default function DestinationsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24">
        <Destinations sectionId="destinations-page" />
      </div>
      <Footer />
      <Chatbot />
    </main>
  )
}
