import { Search, MessageCircle, Home } from "lucide-react"

const steps = [
  {
    icon: Search,
    step: "1",
    title: "Search your College",
    description: "Find PGs near your campus",
  },
  {
    icon: MessageCircle,
    step: "2",
    title: "Book via WhatsApp",
    description: "Lock the ₹2,000 Discount",
  },
  {
    icon: Home,
    step: "3",
    title: "Pay the Owner & Move In",
    description: "Start your new life",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary py-16 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-2xl font-bold text-foreground sm:text-3xl">
          How It Works
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.step} className="relative flex flex-col items-center text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-10 hidden h-0.5 w-full bg-border md:block" />
              )}

              {/* Step circle */}
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <step.icon className="h-8 w-8" />
              </div>

              {/* Step number */}
              <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                {step.step}
              </div>

              {/* Content */}
              <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
