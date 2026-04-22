"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/video-poster.jpg"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-spinning-around-the-earth-29351-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/60 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Expériences de Voyage Temporel Premium</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
            <span className="block text-glow">Voyagez à Travers</span>
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              Le Tissu du Temps
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Vivez l&apos;histoire en direct. Marchez avec les dinosaures, assistez à la Renaissance,
            ou tenez-vous au pied de la Tour Eiffel fraîchement construite. Votre aventure à travers le temps vous attend.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg animate-pulse-glow"
            >
              <Link href="/destinations">Explorer les Destinations</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border hover:bg-secondary px-8 py-6 text-lg"
            >
              <Link href="/#how-it-works">
                Comment ça marche
              </Link>
            </Button>
          </div>

          <div className="pt-16 animate-bounce">
            <Link
              href="/destinations"
              className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-sm">Défiler pour explorer</span>
              <ArrowDown className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
