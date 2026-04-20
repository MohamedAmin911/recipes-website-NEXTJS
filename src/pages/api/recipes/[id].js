import {
  deleteRecipeById,
  getRecipeById,
  updateRecipeById,
} from "../../../lib/recipesService";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const recipe = await getRecipeById(id);

      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found." });
      }

      return res.status(200).json(recipe);
    }

    if (req.method === "PUT") {
      const recipe = await updateRecipeById(id, req.body);

      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found." });
      }

      return res.status(200).json(recipe);
    }

    if (req.method === "DELETE") {
      const deleted = await deleteRecipeById(id);

      if (!deleted) {
        return res.status(404).json({ message: "Recipe not found." });
      }

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ message: "Method not allowed." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
