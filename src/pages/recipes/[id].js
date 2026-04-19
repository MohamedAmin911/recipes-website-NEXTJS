import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchRecipeById } from "../../lib/recipesApi";

function RecipeDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    async function loadRecipe() {
      try {
        setIsLoading(true);
        setError("");
        const data = await fetchRecipeById(id);
        setRecipe(data);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef4ff_45%,_#ffffff_100%)] px-4 pb-16 pt-28 text-slate-900 sm:px-6 sm:pt-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to recipes
        </Link>

        {isLoading ? (
          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
            Loading recipe details...
          </div>
        ) : null}

        {error ? (
          <div className="mt-8 rounded-[2rem] border border-red-200 bg-red-50 p-8 text-red-700 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
            {error}
          </div>
        ) : null}

        {recipe ? (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[320px]">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="p-8 sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                  {recipe.cuisine}
                </p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
                  {recipe.name}
                </h1>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-400">Difficulty</p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {recipe.difficulty}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-400">Rating</p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {recipe.rating} / 5
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-400">Prep + cook</p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {recipe.prepTimeMinutes + recipe.cookTimeMinutes} minutes
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-400">Servings</p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {recipe.servings}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {(recipe.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-8 border-t border-slate-200 p-8 sm:p-10 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  Ingredients
                </h2>
                <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
                  {(recipe.ingredients || []).map((ingredient) => (
                    <li
                      key={ingredient}
                      className="rounded-2xl bg-slate-50 px-4 py-3"
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  Instructions
                </h2>
                <ol className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
                  {(recipe.instructions || []).map((instruction, index) => (
                    <li
                      key={`${recipe.id}-${index}`}
                      className="rounded-2xl bg-slate-50 px-4 py-3"
                    >
                      <span className="mr-2 font-semibold text-slate-950">
                        {index + 1}.
                      </span>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}

export default RecipeDetailsPage;
