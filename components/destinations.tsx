"use client"

import { DestinationCard } from "./destination-card"
import { destinations } from "@/lib/destinations-data"

interface DestinationsProps {
  sectionId?: string
}

export function Destinations({ sectionId = "destinations" }: DestinationsProps) {
  return (
    <section id={sectionId} className="relative py-24 sm:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Destinations Populaires
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance">
            Où Souhaitez-Vous Aller ?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Choisissez parmi notre sélection de moments historiques majeurs.
            Chaque voyage est méticuleusement planifié pour la sécurité et l&apos;authenticité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.title}
              {...destination}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
