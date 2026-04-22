import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { destinations, getDestinationBySlug } from "@/lib/destinations-data"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const destination = getDestinationBySlug(slug)

  if (!destination) {
    return {
      title: "Destination introuvable | Agence VoyageTemporel",
    }
  }

  return {
    title: `${destination.title} | Agence VoyageTemporel`,
    description: destination.longDescription,
  }
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params
  const destination = getDestinationBySlug(slug)

  if (!destination) {
    notFound()
  }

  const difficultyColors = {
    Facile: "bg-green-500/20 text-green-400 border-green-500/30",
    Modere: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Avance: "bg-red-500/20 text-red-400 border-red-500/30",
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-36 pb-24 sm:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <p className="text-primary text-sm font-medium tracking-wider uppercase">
                Fiche Destination
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-balance">
                {destination.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {destination.longDescription}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="glass">
                <Calendar className="h-3 w-3 mr-1" />
                {destination.era}
              </Badge>
              <Badge className={difficultyColors[destination.difficulty]}>
                {destination.difficulty}
              </Badge>
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {destination.duration}
              </Badge>
              <Badge variant="outline">
                <MapPin className="h-3 w-3 mr-1" />
                Visite Guidee
              </Badge>
            </div>

            <Card className="p-8 bg-card border-border">
              <h2 className="text-2xl font-bold mb-4">Points forts inclus</h2>
              <ul className="space-y-3 text-muted-foreground">
                {destination.highlights.map((highlight) => (
                  <li key={highlight}>- {highlight}</li>
                ))}
              </ul>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href={`/booking?destination=${destination.slug}`}>
                  Reserver cette destination
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/destinations">Voir toutes les destinations</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Chatbot />
    </main>
  )
}
