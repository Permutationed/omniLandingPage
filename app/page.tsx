import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      {/* Typography check */}
      <h1 className="text-4xl font-bold text-foreground">
        Omni Card Foundation
      </h1>
      <p className="text-muted-foreground">
        Design tokens and components are working correctly.
      </p>

      {/* Color token check */}
      <div className="flex flex-wrap gap-4">
        <div className="size-16 rounded-lg bg-primary" title="Primary" />
        <div className="size-16 rounded-lg bg-secondary" title="Secondary" />
        <div className="size-16 rounded-lg bg-accent" title="Accent" />
        <div className="size-16 rounded-lg bg-muted" title="Muted" />
        <div className="size-16 rounded-lg bg-destructive" title="Destructive" />
      </div>

      {/* Button variants */}
      <div className="flex flex-wrap gap-4">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>

      {/* Button sizes */}
      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
          </svg>
        </Button>
      </div>

      {/* Shadow check */}
      <div className="flex gap-4">
        <div className="size-16 rounded-lg bg-card shadow-sm" />
        <div className="size-16 rounded-lg bg-card shadow-md" />
        <div className="size-16 rounded-lg bg-card shadow-lg" />
      </div>

      {/* Radius check */}
      <div className="flex gap-4">
        <div className="size-16 bg-primary rounded-sm" />
        <div className="size-16 bg-primary rounded-md" />
        <div className="size-16 bg-primary rounded-lg" />
        <div className="size-16 bg-primary rounded-xl" />
      </div>
    </main>
  )
}
