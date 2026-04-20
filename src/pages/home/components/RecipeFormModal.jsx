import { useState } from "react";

const defaultFormState = {
  id: "",
  name: "",
  cuisine: "",
  difficulty: "Easy",
  image: "",
  prepTimeMinutes: 15,
  cookTimeMinutes: 20,
  servings: 2,
  caloriesPerServing: 300,
  rating: 4.5,
  reviewCount: 0,
  mealType: "Dinner",
  tags: "",
  ingredients: "",
  instructions: "",
};

function normalizeRecipeToForm(recipe) {
  if (!recipe) {
    return defaultFormState;
  }

  return {
    id: recipe.id ?? recipe._id ?? "",
    name: recipe.name ?? "",
    cuisine: recipe.cuisine ?? "",
    difficulty: recipe.difficulty ?? "Easy",
    image: recipe.image ?? "",
    prepTimeMinutes: recipe.prepTimeMinutes ?? 15,
    cookTimeMinutes: recipe.cookTimeMinutes ?? 20,
    servings: recipe.servings ?? 2,
    caloriesPerServing: recipe.caloriesPerServing ?? 300,
    rating: recipe.rating ?? 4.5,
    reviewCount: recipe.reviewCount ?? 0,
    mealType: Array.isArray(recipe.mealType)
      ? recipe.mealType.join(", ")
      : recipe.mealType ?? "Dinner",
    tags: Array.isArray(recipe.tags) ? recipe.tags.join(", ") : "",
    ingredients: Array.isArray(recipe.ingredients)
      ? recipe.ingredients.join("\n")
      : "",
    instructions: Array.isArray(recipe.instructions)
      ? recipe.instructions.join("\n")
      : "",
  };
}

function parseCommaSeparatedList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseLineSeparatedList(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function RecipeFormModal({
  isOpen,
  mode,
  recipe,
  isSaving,
  onClose,
  onSubmit,
}) {
  const [formState, setFormState] = useState(() => normalizeRecipeToForm(recipe));

  if (!isOpen) {
    return null;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      name: formState.name.trim(),
      cuisine: formState.cuisine.trim(),
      difficulty: formState.difficulty,
      image: formState.image.trim(),
      prepTimeMinutes: Number(formState.prepTimeMinutes),
      cookTimeMinutes: Number(formState.cookTimeMinutes),
      servings: Number(formState.servings),
      caloriesPerServing: Number(formState.caloriesPerServing),
      rating: Number(formState.rating),
      reviewCount: Number(formState.reviewCount),
      mealType: parseCommaSeparatedList(formState.mealType),
      tags: parseCommaSeparatedList(formState.tags),
      ingredients: parseLineSeparatedList(formState.ingredients),
      instructions: parseLineSeparatedList(formState.instructions),
      userId: recipe?.userId ?? 1,
    });
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.35)] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              {mode === "edit" ? "Edit recipe" : "Add recipe"}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              {mode === "edit"
                ? "Update the selected recipe"
                : "Create a new recipe entry"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
          >
            Close
          </button>
        </div>

        <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
          {mode === "edit" ? (
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Recipe ID
              <input
                name="id"
                value={formState.id}
                readOnly
                className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 outline-none"
              />
            </label>
          ) : null}

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Recipe name
              <input
                required
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Cuisine
              <input
                required
                name="cuisine"
                value={formState.cuisine}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Difficulty
              <select
                name="difficulty"
                value={formState.difficulty}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Image URL
              <input
                required
                name="image"
                value={formState.image}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Prep time
              <input
                required
                min="0"
                type="number"
                name="prepTimeMinutes"
                value={formState.prepTimeMinutes}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Cook time
              <input
                required
                min="0"
                type="number"
                name="cookTimeMinutes"
                value={formState.cookTimeMinutes}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Servings
              <input
                required
                min="1"
                type="number"
                name="servings"
                value={formState.servings}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Calories per serving
              <input
                required
                min="0"
                type="number"
                name="caloriesPerServing"
                value={formState.caloriesPerServing}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Rating
              <input
                required
                min="0"
                max="5"
                step="0.1"
                type="number"
                name="rating"
                value={formState.rating}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Review count
              <input
                required
                min="0"
                type="number"
                name="reviewCount"
                value={formState.reviewCount}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Meal type
            <input
              name="mealType"
              value={formState.mealType}
              onChange={handleChange}
              placeholder="Breakfast, Lunch"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Tags
            <input
              name="tags"
              value={formState.tags}
              onChange={handleChange}
              placeholder="Healthy, Quick"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Ingredients
            <textarea
              required
              name="ingredients"
              value={formState.ingredients}
              onChange={handleChange}
              rows="6"
              placeholder="One ingredient per line"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Instructions
            <textarea
              required
              name="instructions"
              value={formState.instructions}
              onChange={handleChange}
              rows="6"
              placeholder="One instruction per line"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sky-500"
            />
          </label>

          <div className="flex flex-wrap justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving
                ? mode === "edit"
                  ? "Saving..."
                  : "Adding..."
                : mode === "edit"
                  ? "Save changes"
                  : "Add recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecipeFormModal;
