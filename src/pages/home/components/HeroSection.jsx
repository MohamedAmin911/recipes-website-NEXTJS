function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(2,6,23,0.82),rgba(15,23,42,0.42),rgba(2,6,23,0.68))]" />

      <div className="relative flex min-h-[340px] items-center px-6 py-16 sm:px-10 lg:min-h-[420px] lg:px-12 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200">
            Modern commerce
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Browse, manage, and buy products from a Mongo-powered storefront.
          </h1>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
