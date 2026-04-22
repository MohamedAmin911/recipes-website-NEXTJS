import Image from "next/image";
import Link from "next/link";
import { getRecipePrice } from "../../../lib/recipePricing";

const fallbackRecipe = {
  id: "preview",
  name: "Preview recipe",
  cuisine: "Global",
  image: "https://dummyjson.com/image/400x300/eff6ff/1e293b?text=Recipe",
  difficulty: "Easy",
  rating: 4.5,
  reviewCount: 0,
  prepTimeMinutes: 15,
  cookTimeMinutes: 20,
  caloriesPerServing: 320,
  mealType: ["Dinner"],
  description: "Preview recipe card fallback",
};

function RecipeCard({
  recipe = fallbackRecipe,
  onEdit = () => {},
  onDelete = () => {},
  onBuy = () => {},
  showEditDelete = true,
}) {
  const totalTime =
    Number(recipe.prepTimeMinutes || 0) + Number(recipe.cookTimeMinutes || 0);
  const recipePrice = getRecipePrice(recipe);

  return (
    <article className="group flex min-w-[290px] max-w-[290px] snap-start flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:min-w-[320px] sm:max-w-[320px]">
      <div className="relative overflow-hidden bg-[linear-gradient(180deg,_#eff6ff_0%,_#ffffff_100%)] p-5">
        <span className="absolute left-4 top-4 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
          {recipe.cuisine}
        </span>
        <Image
          src={recipe.image || fallbackRecipe.image}
          alt={recipe.name}
          width={320}
          height={208}
          className="mx-auto h-52 w-full rounded-2xl object-cover transition duration-300 group-hover:scale-105"
          unoptimized
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-950">
              {recipe.name}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {recipe.difficulty} difficulty
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {Number(recipe.rating || 0).toFixed(1)} rating
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Prep and cook this dish in about {totalTime} minutes with a clean,
          practical layout for discovery and recipe management.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-slate-400">Cook time</p>
            <p className="mt-1 font-semibold text-slate-900">{totalTime} mins</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-slate-400">Calories</p>
            <p className="mt-1 font-semibold text-slate-900">
              {recipe.caloriesPerServing} kcal
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-400">Meal idea</p>
            <p className="mt-1 text-lg font-semibold text-slate-950">
              {(recipe.mealType && recipe.mealType[0]) || "Featured recipe"}
            </p>
          </div>
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
            {recipe.reviewCount} reviews
          </span>
        </div>

        <div className="mt-6 grid gap-3">
          <button
            type="button"
            onClick={() => onBuy(recipe)}
            className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Buy recipe for ${recipePrice.toFixed(2)}
          </button>

          {showEditDelete && (
            <div className="grid grid-cols-3 gap-3">
              <Link
                href={`/recipes/${recipe.id}`}
                className="rounded-full border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View
              </Link>
              <button
                type="button"
                onClick={() => onEdit(recipe)}
                className="rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(recipe.id)}
                className="rounded-full border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
