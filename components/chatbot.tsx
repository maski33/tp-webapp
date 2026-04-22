"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Bonjour ! Je suis TempoBot, votre assistant personnel de voyage temporel. Comment puis-je vous aider à planifier votre voyage à travers l'histoire aujourd'hui ?",
    role: "assistant",
    timestamp: new Date(),
  },
]

const quickReplies = [
  "Quelles destinations sont disponibles ?",
  "Le voyage temporel est-il sûr ?",
  "Combien ça coûte ?",
  "Quelle est la durée des voyages ?",
]

const responses: Record<string, string> = {
  destinations:
    "Nous proposons plus de 500 périodes historiques ! Nos destinations les plus populaires incluent Paris 1889 (inauguration de la Tour Eiffel), l'Ère Crétacé (safari dinosaures) et Florence 1504 (art de la Renaissance). Souhaitez-vous des détails sur une époque spécifique ?",
  safe: "Absolument ! Avec un taux de sécurité de 99,99%, notre technologie de déplacement quantique est incroyablement fiable. Tous les voyageurs suivent un briefing de sécurité complet et sont accompagnés par des chrononautes experts tout au long de leur voyage.",
  cost: "Nos expériences commencent à 25 000€ pour un voyage de 3 jours. Les prix varient selon la destination, la durée et le niveau d'immersion historique. Nous proposons également des forfaits premium avec accès exclusif aux événements historiques.",
  long: "La durée des voyages varie de 1 jour à 2 semaines. Nos forfaits les plus populaires sont des voyages de 3 à 5 jours, qui offrent suffisamment de temps pour une immersion historique profonde tout en minimisant le décalage temporel.",
  default:
    "C'est une excellente question ! Pour des demandes spécifiques, je vous recommande de parler avec l'un de nos coordinateurs temporels. Vous pouvez réserver une consultation via notre formulaire de réservation, ou je peux vous fournir plus d'informations sur nos destinations les plus populaires.",
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getResponse = (message: string): string => {
    const lower = message.toLowerCase()
    if (lower.includes("destination") || lower.includes("où") || lower.includes("aller")) {
      return responses.destinations
    }
    if (lower.includes("sûr") || lower.includes("danger") || lower.includes("risque") || lower.includes("sécurité")) {
      return responses.safe
    }
    if (lower.includes("coût") || lower.includes("prix") || lower.includes("combien") || lower.includes("tarif")) {
      return responses.cost
    }
    if (lower.includes("durée") || lower.includes("long") || lower.includes("temps") || lower.includes("jours")) {
      return responses.long
    }
    return responses.default
  }

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: getResponse(content),
      role: "assistant",
      timestamp: new Date(),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, botMessage])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
          isOpen
            ? "bg-secondary text-secondary-foreground rotate-0"
            : "bg-primary text-primary-foreground animate-pulse-glow"
        )}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[90vw] max-w-md transition-all duration-300 transform",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        )}
      >
        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-primary p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-primary-foreground">TempoBot</h3>
              <p className="text-xs text-primary-foreground/70">Toujours en ligne à travers toutes les lignes temporelles</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "flex-row-reverse" : ""
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.role === "user"
                      ? "bg-accent"
                      : "bg-primary/20"
                  )}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-accent-foreground" />
                  ) : (
                    <Bot className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                    message.role === "user"
                      ? "bg-accent text-accent-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez une question sur le voyage temporel..."
                className="flex-1 bg-muted border-border"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
