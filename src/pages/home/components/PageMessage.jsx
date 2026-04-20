function PageMessage({ children, tone = "normal" }) {
  const styles =
    tone === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : "border-slate-200 bg-white text-slate-500 shadow-[0_18px_45px_rgba(15,23,42,0.08)]";

  return (
    <div className={`mt-6 rounded-[1.5rem] border px-5 py-4 text-sm ${styles}`}>
      {children}
    </div>
  );
}

export default PageMessage;
