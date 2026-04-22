"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { destinations, getDestinationBySlug } from "@/lib/destinations-data"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

type DestinationSlug = "paris-1889" | "cretaceous" | "florence-1504"

interface QuizOption {
  label: string
  scores: Record<DestinationSlug, number>
}

interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "ambiance",
    question: "Quelle ambiance vous attire le plus ?",
    options: [
      { label: "Elegance urbaine et culture", scores: { "paris-1889": 3, cretaceous: 0, "florence-1504": 1 } },
      { label: "Aventure sauvage et adrenaline", scores: { "paris-1889": 0, cretaceous: 3, "florence-1504": 1 } },
      { label: "Art, histoire et patrimoine", scores: { "paris-1889": 1, cretaceous: 0, "florence-1504": 3 } },
    ],
  },
  {
    id: "intensite",
    question: "Quel niveau d'intensite recherchez-vous ?",
    options: [
      { label: "Plutot detendu", scores: { "paris-1889": 3, cretaceous: 0, "florence-1504": 1 } },
      { label: "Equilibre entre confort et action", scores: { "paris-1889": 1, cretaceous: 1, "florence-1504": 3 } },
      { label: "Maximum sensations fortes", scores: { "paris-1889": 0, cretaceous: 3, "florence-1504": 0 } },
    ],
  },
  {
    id: "duree",
    question: "Pour combien de jours souhaitez-vous voyager ?",
    options: [
      { label: "3 jours", scores: { "paris-1889": 3, cretaceous: 1, "florence-1504": 1 } },
      { label: "4 jours", scores: { "paris-1889": 1, cretaceous: 0, "florence-1504": 3 } },
      { label: "5 jours", scores: { "paris-1889": 0, cretaceous: 3, "florence-1504": 1 } },
    ],
  },
  {
    id: "priorite",
    question: "Votre priorite principale ?",
    options: [
      { label: "Evenements iconiques", scores: { "paris-1889": 3, cretaceous: 1, "florence-1504": 2 } },
      { label: "Faune et nature prehistorique", scores: { "paris-1889": 0, cretaceous: 3, "florence-1504": 0 } },
      { label: "Creation artistique et innovation", scores: { "paris-1889": 1, cretaceous: 0, "florence-1504": 3 } },
    ],
  },
]

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Bonjour ! Je suis TempoBot. Je peux vous guider sur les destinations, la securite, les tarifs et aussi vous recommander un voyage ideal grace a un quiz rapide de 4 questions.",
    role: "assistant",
    timestamp: new Date(),
  },
]

const responses: Record<string, string> = {
  startQuiz: "Parfait. Repondez a cette premiere question :",
  destinations:
    "Nous proposons actuellement trois experiences phares : Paris 1889 pour une escapade elegante et iconique, Ere Cretace pour une aventure intense au milieu des dinosaures, et Florence 1504 pour une immersion artistique en pleine Renaissance.",
  safe:
    "Oui. Chaque voyage inclut un briefing complet, un accompagnement par un chrononaute expert et des protocoles de securite adaptes a la periode visitee.",
  cost:
    "Les experiences commencent a partir de 25 000 EUR. Le tarif depend surtout de la destination, de la duree et du niveau d'immersion souhaite.",
  booking:
    "Vous pouvez reserver depuis la page de reservation. Si vous voulez, je peux aussi vous aider a choisir la meilleure destination via le quiz personnalise.",
  quiz:
    "Bien sur. Cliquez sur 'Demarrer le quiz' et je vous poserai 4 questions pour vous recommander la destination la plus adaptee.",
  default:
    "Je peux vous aider sur les destinations, la securite, les tarifs, la reservation, ou vous proposer un quiz personnalise. Dites-moi ce que vous cherchez.",
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isQuizStarted, setIsQuizStarted] = useState(false)
  const [isQuizFinished, setIsQuizFinished] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [scores, setScores] = useState<Record<DestinationSlug, number>>({
    "paris-1889": 0,
    cretaceous: 0,
    "florence-1504": 0,
  })
  const [recommendedSlug, setRecommendedSlug] = useState<DestinationSlug | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addAssistantMessage = (content: string) => {
    const botMessage: Message = {
      id: (Date.now() + Math.random()).toString(),
      content,
      role: "assistant",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, botMessage])
  }

  const getGuidanceResponse = (message: string) => {
    const lower = message.toLowerCase()

    if (
      lower.includes("quiz") ||
      lower.includes("recommand") ||
      lower.includes("conseil") ||
      lower.includes("choisir")
    ) {
      return responses.quiz
    }

    if (
      lower.includes("destination") ||
      lower.includes("ou aller") ||
      lower.includes("où aller") ||
      lower.includes("epoque") ||
      lower.includes("époque")
    ) {
      return responses.destinations
    }

    if (
      lower.includes("sur") ||
      lower.includes("sûr") ||
      lower.includes("securite") ||
      lower.includes("sécurité") ||
      lower.includes("danger") ||
      lower.includes("risque")
    ) {
      return responses.safe
    }

    if (
      lower.includes("prix") ||
      lower.includes("cout") ||
      lower.includes("coût") ||
      lower.includes("tarif") ||
      lower.includes("combien")
    ) {
      return responses.cost
    }

    if (
      lower.includes("reservation") ||
      lower.includes("réservation") ||
      lower.includes("reserver") ||
      lower.includes("réserver") ||
      lower.includes("booking")
    ) {
      return responses.booking
    }

    return responses.default
  }

  const startQuiz = async () => {
    setIsQuizStarted(true)
    setIsQuizFinished(false)
    setCurrentQuestionIndex(0)
    setRecommendedSlug(null)
    setScores({ "paris-1889": 0, cretaceous: 0, "florence-1504": 0 })
    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsTyping(false)
    addAssistantMessage(`${responses.startQuiz} ${quizQuestions[0].question}`)
  }

  const finishQuiz = (finalScores: Record<DestinationSlug, number>) => {
    const recommendation = (Object.entries(finalScores).sort((a, b) => b[1] - a[1])[0]?.[0] ??
      "paris-1889") as DestinationSlug
    const destination = getDestinationBySlug(recommendation)

    setRecommendedSlug(recommendation)
    setIsQuizFinished(true)

    if (!destination) return
    addAssistantMessage(
      `Votre destination recommandee est ${destination.title} (${destination.era}). Cette experience correspond le mieux a vos preferences.`
    )
  }

  const answerQuestion = async (option: QuizOption) => {
    const updatedScores: Record<DestinationSlug, number> = {
      "paris-1889": scores["paris-1889"] + option.scores["paris-1889"],
      cretaceous: scores.cretaceous + option.scores.cretaceous,
      "florence-1504": scores["florence-1504"] + option.scores["florence-1504"],
    }
    setScores(updatedScores)

    const userMessage: Message = {
      id: Date.now().toString(),
      content: option.label,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, 700))
    setIsTyping(false)

    const nextIndex = currentQuestionIndex + 1
    if (nextIndex >= quizQuestions.length) {
      finishQuiz(updatedScores)
      return
    }

    setCurrentQuestionIndex(nextIndex)
    addAssistantMessage(quizQuestions[nextIndex].question)
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

    await new Promise((resolve) => setTimeout(resolve, 900))
    setIsTyping(false)

    const response = getGuidanceResponse(content)
    addAssistantMessage(response)
  }

  const restartQuiz = () => {
    setMessages(initialMessages)
    setInput("")
    startQuiz()
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

          {!isQuizStarted && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              <button
                onClick={startQuiz}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                Demarrer le quiz
              </button>
              <button
                onClick={() => addAssistantMessage(responses.destinations)}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                Voir les destinations
              </button>
              <button
                onClick={() => addAssistantMessage(responses.cost)}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                Tarifs
              </button>
            </div>
          )}

          {isQuizStarted && !isQuizFinished && (
            <div className="px-4 pb-3 space-y-2">
              {quizQuestions[currentQuestionIndex].options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => answerQuestion(option)}
                  className="w-full text-left text-xs px-3 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {isQuizFinished && recommendedSlug && (
            <div className="px-4 pb-3">
              <div className="rounded-xl border border-border bg-muted/50 p-3 space-y-2">
                <p className="text-xs text-muted-foreground">
                  Recommandation personnalisee prete.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                    <Link href={`/destinations/${recommendedSlug}`}>Voir la destination</Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/booking?destination=${recommendedSlug}`}>Reserver</Link>
                  </Button>
                  <Button size="sm" variant="secondary" onClick={restartQuiz}>
                    Refaire le quiz
                  </Button>
                </div>
              </div>
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
