function AboutUsComponent() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
          About us
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
          Building a polished storefront with practical full-stack patterns.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
          This project brings together product browsing, Mongo-backed CRUD,
          cart interactions, ISR pages, and a server-rendered quote experience
          to create a more realistic eCommerce training application.
        </p>
      </div>
    </section>
  );
}

export default AboutUsComponent;
