function QuoteToast({ quote }) {
  if (!quote?.quote) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[80] max-w-sm rounded-[1.5rem] border border-slate-200 bg-white/95 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.18)] backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
        Live quote
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-700">{quote.quote}</p>
      <p className="mt-3 text-sm font-semibold text-slate-950">
        {quote.author}
      </p>
    </div>
  );
}

export default QuoteToast;
