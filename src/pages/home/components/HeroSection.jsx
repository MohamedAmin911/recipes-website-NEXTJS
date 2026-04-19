function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(2,6,23,0.82),rgba(15,23,42,0.45),rgba(2,6,23,0.68))]" />

      <div className="relative flex min-h-[340px] items-center px-6 py-16 sm:px-10 lg:min-h-[420px] lg:px-12 lg:py-20">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Discover standout recipes in a cleaner, more modern storefront.
        </h1>
      </div>
    </section>
  );
}

export default HeroSection;
