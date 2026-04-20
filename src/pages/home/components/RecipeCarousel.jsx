import RecipeCard from "./RecipeCard";

function RecipeCarousel({ recipes = [], onEdit, onDelete, onBuy }) {
  return (
    <div className="mt-8">
      <div className="home-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onEdit={onEdit}
            onDelete={onDelete}
            onBuy={onBuy}
          />
        ))}
      </div>
    </div>
  );
}

export default RecipeCarousel;
