import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import ProductCarousel from "./components/ProductCarousel";
import RecipeFormModal from "./components/RecipeFormModal";
import {
  createRecipe,
  deleteRecipe,
  fetchRecipes,
  updateRecipe,
} from "../../lib/recipesApi";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadRecipes();
  }, []);

  async function loadRecipes() {
    try {
      setIsLoading(true);
      setError("");
      const data = await fetchRecipes();
      setRecipes(data);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenAddModal() {
    setModalMode("add");
    setSelectedRecipe(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(recipe) {
    setModalMode("edit");
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  }

  async function handleSubmitRecipe(formData) {
    try {
      setIsSaving(true);

      if (modalMode === "edit" && selectedRecipe?.id) {
        await updateRecipe(selectedRecipe.id, formData);
      } else {
        await createRecipe(formData);
      }

      await loadRecipes();
      handleCloseModal();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteRecipe(id) {
    try {
      await deleteRecipe(id);
      setRecipes((current) => current.filter((recipe) => recipe.id !== id));
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef4ff_45%,_#ffffff_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <HeroSection />

        <section className="mt-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                Recipe collection
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                Manage recipes from your local json-server database.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Add new recipes, edit existing ones, remove entries, and open a
                dedicated details page for each recipe.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddModal}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Add recipe
            </button>
          </div>

          {error ? (
            <div className="mt-6 rounded-[1.5rem] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {isLoading ? (
            <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              Loading recipes from json-server...
            </div>
          ) : (
            <ProductCarousel
              recipes={recipes}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteRecipe}
            />
          )}
        </section>
      </div>

      <RecipeFormModal
        key={`${modalMode}-${selectedRecipe?.id ?? "new"}-${isModalOpen ? "open" : "closed"}`}
        isOpen={isModalOpen}
        mode={modalMode}
        recipe={selectedRecipe}
        isSaving={isSaving}
        onClose={handleCloseModal}
        onSubmit={handleSubmitRecipe}
      />
    </main>
  );
}

export default HomePage;
