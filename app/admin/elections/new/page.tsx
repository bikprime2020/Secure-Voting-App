"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft, 
  Plus, 
  Trash2,
  Calendar,
  Users,
  Vote,
  Settings
} from "lucide-react"

export default function NewElectionPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "single",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    candidates: [{ name: "", party: "", bio: "" }]
  })

  const addCandidate = () => {
    setFormData({
      ...formData,
      candidates: [...formData.candidates, { name: "", party: "", bio: "" }]
    })
  }

  const removeCandidate = (index: number) => {
    setFormData({
      ...formData,
      candidates: formData.candidates.filter((_, i) => i !== index)
    })
  }

  const updateCandidate = (index: number, field: string, value: string) => {
    const newCandidates = [...formData.candidates]
    newCandidates[index] = { ...newCandidates[index], [field]: value }
    setFormData({ ...formData, candidates: newCandidates })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    router.push("/admin/elections")
  }

  const steps = [
    { number: 1, title: "Basic Info", icon: Vote },
    { number: 2, title: "Schedule", icon: Calendar },
    { number: 3, title: "Candidates", icon: Users },
    { number: 4, title: "Settings", icon: Settings }
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back Button */}
      <Link 
        href="/admin/elections"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to elections
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create New Election</h1>
        <p className="text-muted-foreground mt-1">Set up a new election or poll for your organization</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center gap-2 ${currentStep >= step.number ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                currentStep >= step.number ? 'bg-primary text-primary-foreground' : 'bg-secondary'
              }`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className="hidden sm:block font-medium">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 sm:w-16 h-0.5 mx-2 ${
                currentStep > step.number ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the basic details for your election
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-foreground">
                Election Title
              </label>
              <Input
                id="title"
                placeholder="e.g., Student Council President 2026"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                id="description"
                className="w-full min-h-24 px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Describe the purpose of this election..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Election Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "single", label: "Single Choice", desc: "Voters select one option" },
                  { id: "multiple", label: "Multiple Choice", desc: "Voters can select multiple" },
                  { id: "ranked", label: "Ranked Choice", desc: "Voters rank preferences" },
                  { id: "yesno", label: "Yes/No Vote", desc: "Simple approval voting" }
                ].map((type) => (
                  <div
                    key={type.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.type === type.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setFormData({ ...formData, type: type.id })}
                  >
                    <p className="font-medium text-card-foreground">{type.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{type.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Schedule */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <CardDescription>
              Set the start and end dates for your election
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startDate" className="text-sm font-medium text-foreground">
                  Start Date
                </label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="startTime" className="text-sm font-medium text-foreground">
                  Start Time
                </label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="endDate" className="text-sm font-medium text-foreground">
                  End Date
                </label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="endTime" className="text-sm font-medium text-foreground">
                  End Time
                </label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Candidates */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Candidates / Options</CardTitle>
            <CardDescription>
              Add the candidates or options voters can choose from
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.candidates.map((candidate, index) => (
              <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Candidate {index + 1}
                  </span>
                  {formData.candidates.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCandidate(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input
                    placeholder="Name"
                    value={candidate.name}
                    onChange={(e) => updateCandidate(index, "name", e.target.value)}
                  />
                  <Input
                    placeholder="Party / Affiliation"
                    value={candidate.party}
                    onChange={(e) => updateCandidate(index, "party", e.target.value)}
                  />
                </div>
                <Input
                  placeholder="Short bio or description"
                  value={candidate.bio}
                  onChange={(e) => updateCandidate(index, "bio", e.target.value)}
                />
              </div>
            ))}

            <Button variant="outline" className="w-full" onClick={addCandidate}>
              <Plus className="h-4 w-4 mr-2" />
              Add Candidate
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Settings */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Settings</CardTitle>
            <CardDescription>
              Configure security and notification settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-medium text-card-foreground">Anonymous Voting</p>
                <p className="text-sm text-muted-foreground">{"Voters' identities won't be linked to their votes"}</p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5" />
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-medium text-card-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Send reminders to eligible voters</p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5" />
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-medium text-card-foreground">Show Real-time Results</p>
                <p className="text-sm text-muted-foreground">Display results before voting ends</p>
              </div>
              <input type="checkbox" className="h-5 w-5" />
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-medium text-card-foreground">Require 2FA</p>
                <p className="text-sm text-muted-foreground">Voters must use two-factor authentication</p>
              </div>
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
        >
          Previous
        </Button>

        {currentStep < 4 ? (
          <Button onClick={() => setCurrentStep(currentStep + 1)}>
            Continue
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Election"}
          </Button>
        )}
      </div>
    </div>
  )
}
