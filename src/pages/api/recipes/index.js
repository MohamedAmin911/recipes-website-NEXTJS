import { createRecipe, getAllRecipes } from "../../../lib/recipesService";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const recipes = await getAllRecipes();
      return res.status(200).json(recipes);
    }

    if (req.method === "POST") {
      const recipe = await createRecipe(req.body);
      return res.status(201).json(recipe);
    }

    return res.status(405).json({ message: "Method not allowed." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
