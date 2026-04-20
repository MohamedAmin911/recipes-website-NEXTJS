import Image from "next/image";
import Link from "next/link";
import { useCart } from "Xprompt/context/CartContext";
import { getRecipePrice } from "../../lib/recipePricing";
import { getAllRecipes, getRecipeById } from "../../lib/recipesService";

function RecipeDetailsPage({ initialRecipe = null }) {
  const { addToCart } = useCart();
  const recipe = initialRecipe;

  if (!recipe) {
    return (
      <main className="min-h-screen px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
          Recipe not found.
        </div>
      </main>
    );
  }

  const recipePrice = getRecipePrice(recipe);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef4ff_45%,_#ffffff_100%)] px-4 pb-16 pt-14 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to recipes
        </Link>

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
                    {Number(recipe.prepTimeMinutes || 0) +
                      Number(recipe.cookTimeMinutes || 0)}{" "}
                    minutes
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

              <button
                type="button"
                onClick={() =>
                  addToCart({
                    ...recipe,
                    title: recipe.name,
                    thumbnail: recipe.image,
                    price: recipePrice,
                  })
                }
                className="mt-8 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Buy recipe for ${recipePrice.toFixed(2)}
              </button>
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
      </div>
    </main>
  );
}

export async function getStaticPaths() {
  try {
    const recipes = await getAllRecipes();

    return {
      paths: recipes.slice(0, 20).map((recipe) => ({
        params: { id: recipe.id },
      })),
      fallback: "blocking",
    };
  } catch {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const initialRecipe = await getRecipeById(params.id);

    if (!initialRecipe) {
      return {
        notFound: true,
        revalidate: 10,
      };
    }

    return {
      props: {
        initialRecipe,
      },
      revalidate: 10,
    };
  } catch {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
}

export default RecipeDetailsPage;
