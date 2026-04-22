function RecipeSectionHeader({ onAddRecipe, showAddButton = true }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
          Recipe collection
        </p>
       
      </div>

      {showAddButton && (
        <button
          type="button"
          onClick={onAddRecipe}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Add recipe
        </button>
      )}
    </div>
  );
}

export default RecipeSectionHeader;
