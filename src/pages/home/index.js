import { useEffect, useState } from "react";
import { useCart } from "Xprompt/context/CartContext";
import { getRecipePrice } from "../../lib/recipePricing";
import { getAllRecipes } from "../../lib/recipesService";
import HeroSection from "./components/HeroSection";
import PageMessage from "./components/PageMessage";
import RecipeCarousel from "./components/RecipeCarousel";
import RecipeFormModal from "./components/RecipeFormModal";
import RecipeSectionHeader from "./components/RecipeSectionHeader";
import {
  createRecipe,
  deleteRecipe,
  fetchRecipes,
  updateRecipe,
} from "../../lib/recipesApi";

function HomePage({ initialRecipes = [] }) {
  const { addToCart } = useCart();
  const [recipes, setRecipes] = useState(initialRecipes);
  const [isLoading, setIsLoading] = useState(initialRecipes.length === 0);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    refreshRecipes(initialRecipes.length === 0);
  }, [initialRecipes.length]);

  async function refreshRecipes(showLoader = true) {
    if (showLoader) {
      setIsLoading(true);
    }

    setError("");

    try {
      const data = await fetchRecipes();
      setRecipes(data);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      if (showLoader) {
        setIsLoading(false);
      }
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

      await refreshRecipes(false);
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

  function handleBuyRecipe(recipe) {
    addToCart({
      ...recipe,
      title: recipe.name,
      thumbnail: recipe.image,
      price: getRecipePrice(recipe),
    });
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef4ff_45%,_#ffffff_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-16 pt-14 sm:px-6 lg:px-8">
        <HeroSection />

        <section className="mt-16">
          <RecipeSectionHeader onAddRecipe={handleOpenAddModal} />

          {error ? <PageMessage tone="error">{error}</PageMessage> : null}

          {isLoading ? (
            <PageMessage>
              Loading recipes from MongoDB...
            </PageMessage>
          ) : (
            <RecipeCarousel
              recipes={recipes}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteRecipe}
              onBuy={handleBuyRecipe}
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

export async function getStaticProps() {
  try {
    const initialRecipes = await getAllRecipes();

    return {
      props: {
        initialRecipes,
      },
      revalidate: 10,
    };
  } catch {
    return {
      props: {
        initialRecipes: [],
      },
      revalidate: 10,
    };
  }
}
