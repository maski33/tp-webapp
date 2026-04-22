import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Destinations } from "@/components/destinations"
import { HowItWorks } from "@/components/how-it-works"
import { BookingForm } from "@/components/booking-form"
import { Chatbot } from "@/components/chatbot"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Destinations />
      <HowItWorks />
      <BookingForm />
      <Footer />
      <Chatbot />
    </main>
  )
}
