async function requestJson(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Something went wrong.");
  }

  return response.json();
}

export function fetchRecipes() {
  return requestJson("/api/recipes");
}

export async function fetchRecipeById(id) {
  return requestJson(`/api/recipes/${id}`);
}

export function createRecipe(recipe) {
  return requestJson("/api/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
}

export function updateRecipe(id, recipe) {
  return requestJson(`/api/recipes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
}

export function deleteRecipe(id) {
  return requestJson(`/api/recipes/${id}`, {
    method: "DELETE",
  });
}
