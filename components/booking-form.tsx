"use client"

import { useState } from "react"
import { Calendar, Users, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { destinations } from "@/lib/destinations-data"
interface BookingFormProps {
  sectionId?: string
  initialDestination?: string
}

export function BookingForm({ sectionId = "booking", initialDestination = "" }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    destination: initialDestination,
    departureDate: "",
    travelers: "",
    requests: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.destination || !formData.travelers) return
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      destination: initialDestination,
      departureDate: "",
      travelers: "",
      requests: "",
    })
  }

  if (isSubmitted) {
    return (
      <section id={sectionId} className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-12 text-center bg-card border-primary/30">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Demande de Réservation Reçue !</h3>
            <p className="text-muted-foreground mb-6">
              Merci pour votre intérêt pour le voyage temporel. Nos coordinateurs temporels vous contacteront dans les 24 heures pour finaliser votre voyage.
            </p>
            <Button
              onClick={resetForm}
              variant="outline"
            >
              Reserver un Autre Voyage
            </Button>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id={sectionId} className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Commencez Votre Voyage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance">
            Réservez Votre Expérience de Voyage Temporel
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Remplissez le formulaire ci-dessous et nos coordinateurs temporels
            créeront le voyage parfait à travers le temps pour vous.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto p-6 sm:p-10 bg-card border-border">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  placeholder="Jean"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  className="bg-muted border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  placeholder="Dupont"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  className="bg-muted border-border"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Adresse Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jean@exemple.com"
                required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="bg-muted border-border"
              />
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="destination">
                <MapPin className="h-4 w-4 inline mr-2" />
                Destination
              </Label>
              <Select
                required
                value={formData.destination}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, destination: value }))}
              >
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue placeholder="Selectionnez une periode" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest.slug} value={dest.slug}>
                      {dest.title} - {dest.era}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date and Travelers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="departureDate">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Date de Départ
                </Label>
                <Input
                  id="departureDate"
                  type="date"
                  required
                  value={formData.departureDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, departureDate: e.target.value }))}
                  className="bg-muted border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="travelers">
                  <Users className="h-4 w-4 inline mr-2" />
                  Nombre de Voyageurs
                </Label>
                <Select
                  required
                  value={formData.travelers}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, travelers: value }))}
                >
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Selectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Voyageur" : "Voyageurs"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <Label htmlFor="requests">Demandes Spéciales (Optionnel)</Label>
              <textarea
                id="requests"
                rows={4}
                placeholder="Des exigences spécifiques ou des expériences que vous aimeriez inclure..."
                value={formData.requests}
                onChange={(e) => setFormData((prev) => ({ ...prev, requests: e.target.value }))}
                className="w-full rounded-lg bg-muted border border-border px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Traitement en cours...
                </span>
              ) : (
                "Demander une Réservation"
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              En soumettant ce formulaire, vous acceptez nos conditions générales de voyage temporel.
            </p>
          </form>
        </Card>
      </div>
    </section>
  )
}
