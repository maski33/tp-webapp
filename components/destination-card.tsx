"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface DestinationCardProps {
  title: string
  era: string
  image: string
  description: string
  duration: string
  difficulty: "Facile" | "Modere" | "Avance"
  slug: string
  index: number
}

export function DestinationCard({
  title,
  era,
  image,
  description,
  duration,
  difficulty,
  slug,
  index,
}: DestinationCardProps) {
  const difficultyColors = {
    Facile: "bg-green-500/20 text-green-400 border-green-500/30",
    Modere: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Avance: "bg-red-500/20 text-red-400 border-red-500/30",
  }

  return (
    <Card
      className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Era Badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="glass">
            <Calendar className="h-3 w-3 mr-1" />
            {era}
          </Badge>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-4 right-4">
          <Badge className={difficultyColors[difficulty]}>
            {difficulty}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>Visite Guidée</span>
          </div>
        </div>

        <Button
          asChild
          className="w-full bg-secondary hover:bg-primary text-secondary-foreground hover:text-primary-foreground transition-all duration-300"
        >
          <Link href={`/destinations/${slug}`}>Voir les Details</Link>
        </Button>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
      </div>
    </Card>
  )
}
