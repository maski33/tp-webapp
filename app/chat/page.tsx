import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Chatbot | Agence VoyageTemporel",
  description: "Discutez avec TempoBot pour etre guide et lancer un quiz de recommandation personnalisee.",
}

export default function ChatPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-36 pb-24 sm:pb-32">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto p-8 bg-card border-border text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold">TempoBot</h1>
            <p className="text-muted-foreground">
              Utilisez la bulle en bas a droite pour poser vos questions sur les destinations,
              la securite, les tarifs ou la reservation, puis lancer le quiz de recommandation
              personnalisee quand vous voulez.
            </p>
          </Card>
        </div>
      </section>
      <Footer />
      <Chatbot />
    </main>
  )
}
