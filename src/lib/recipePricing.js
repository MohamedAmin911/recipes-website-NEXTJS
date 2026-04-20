export function getRecipePrice(recipe) {
  if (recipe.price !== undefined && recipe.price !== null) {
    return Number(recipe.price);
  }

  const prepTime = Number(recipe.prepTimeMinutes || 0);
  const cookTime = Number(recipe.cookTimeMinutes || 0);
  const servings = Number(recipe.servings || 1);
  const rating = Number(recipe.rating || 0);

  const computedPrice = 8 + prepTime * 0.18 + cookTime * 0.22 + servings * 1.15 + rating * 1.4;
  return Number(computedPrice.toFixed(2));
}
