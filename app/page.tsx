export default function Page() {
  return (
    <>
      {/* Hero placeholder */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Omni Card
          </h1>
          <p className="text-muted-foreground mb-8">
            Earn rewards on your biggest expense
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">Section placeholder</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <p className="text-muted-foreground">Section placeholder</p>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Calculator</h2>
          <p className="text-muted-foreground">Section placeholder</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">FAQ</h2>
          <p className="text-muted-foreground">Section placeholder</p>
        </div>
      </section>
    </>
  )
}
