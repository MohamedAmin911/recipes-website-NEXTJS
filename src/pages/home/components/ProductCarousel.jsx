import ProductCard from "./ProductCard";

function ProductCarousel({ recipes = [], onEdit, onDelete }) {
  return (
    <div className="mt-8">
      <div className="home-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
        {recipes.map((recipe) => (
          <ProductCard
            key={recipe.id}
            product={recipe}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductCarousel;
