import type { Metadata } from "next"
import { Header } from "@/components/header"
import { BookingForm } from "@/components/booking-form"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { getDestinationBySlug } from "@/lib/destinations-data"

type BookingPageProps = {
  searchParams: Promise<{ destination?: string }>
}

export const metadata: Metadata = {
  title: "Reservation | Agence VoyageTemporel",
  description: "Completez votre demande de reservation de voyage temporel.",
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const { destination } = await searchParams
  const safeDestination = destination && getDestinationBySlug(destination) ? destination : ""

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24">
        <BookingForm sectionId="booking-page" initialDestination={safeDestination} />
      </div>
      <Footer />
      <Chatbot />
    </main>
  )
}
