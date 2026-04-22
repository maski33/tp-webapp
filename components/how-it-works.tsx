"use client"

import { Compass, Shield, Zap, Users } from "lucide-react"

const steps = [
  {
    icon: Compass,
    title: "Choisissez Votre Époque",
    description:
      "Parcourez notre vaste catalogue de périodes historiques et sélectionnez votre destination idéale. Des civilisations antiques à l'histoire récente.",
    step: "01",
  },
  {
    icon: Shield,
    title: "Briefing de Sécurité",
    description:
      "Suivez une préparation complète incluant les protocoles d'adaptation temporelle, la formation au contexte historique et les procédures de sécurité.",
    step: "02",
  },
  {
    icon: Zap,
    title: "Saut Temporel",
    description:
      "Entrez dans notre chambre de déplacement quantique à la pointe de la technologie. Vivez une transition fluide à travers le flux temporel.",
    step: "03",
  },
  {
    icon: Users,
    title: "Expérience Guidée",
    description:
      "Nos chrononautes experts vous accompagnent tout au long de votre voyage, garantissant une immersion historique authentique et sécurisée.",
    step: "04",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Le Processus
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance">
            Comment Fonctionne le Voyage Temporel
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Notre technologie propriétaire de déplacement quantique rend le voyage dans le temps
            sûr, confortable et accessible aux aventuriers de tous horizons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-border to-transparent z-0" />
              )}

              <div className="relative z-10 text-center space-y-4">
                {/* Step Number */}
                <div className="text-6xl font-bold text-muted/30 group-hover:text-primary/30 transition-colors">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "10 000+", label: "Voyageurs" },
            { value: "500+", label: "Périodes" },
            { value: "99,99%", label: "Taux de Sécurité" },
            { value: "24/7", label: "Assistance" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
