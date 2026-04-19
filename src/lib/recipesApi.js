const API_BASE_URL =
  process.env.NEXT_PUBLIC_RECIPES_API_URL || "http://localhost:3001";

export function getRecipesApiUrl(path = "/recipes") {
  return `${API_BASE_URL}${path}`;
}

export async function fetchRecipes() {
  const response = await fetch(getRecipesApiUrl());

  if (!response.ok) {
    throw new Error("Failed to fetch recipes from json-server.");
  }

  return response.json();
}

export async function fetchRecipeById(id) {
  const response = await fetch(getRecipesApiUrl(`/recipes/${id}`));

  if (!response.ok) {
    throw new Error("Failed to fetch recipe details.");
  }

  return response.json();
}

export async function createRecipe(recipe) {
  const response = await fetch(getRecipesApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error("Failed to add recipe.");
  }

  return response.json();
}

export async function updateRecipe(id, recipe) {
  const response = await fetch(getRecipesApiUrl(`/recipes/${id}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error("Failed to update recipe.");
  }

  return response.json();
}

export async function deleteRecipe(id) {
  const response = await fetch(getRecipesApiUrl(`/recipes/${id}`), {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete recipe.");
  }

  return true;
}
