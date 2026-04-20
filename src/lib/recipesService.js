import mongoose from "mongoose";
import { connectToDatabase } from "./mongodb";
import Recipe from "../models/Recipe";

function mapRecipe(document) {
  const raw = document?.toObject ? document.toObject() : document;

  if (!raw) {
    return null;
  }

  return {
    ...raw,
    id: String(raw._id),
    _id: String(raw._id),
    createdAt: raw.createdAt ? new Date(raw.createdAt).toISOString() : null,
    updatedAt: raw.updatedAt ? new Date(raw.updatedAt).toISOString() : null,
  };
}

function splitByComma(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitByLine(value) {
  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeRecipeInput(input) {
  return {
    name: input.name?.trim() || "",
    ingredients: Array.isArray(input.ingredients)
      ? input.ingredients.filter(Boolean)
      : splitByLine(input.ingredients),
    instructions: Array.isArray(input.instructions)
      ? input.instructions.filter(Boolean)
      : splitByLine(input.instructions),
    prepTimeMinutes: Number(input.prepTimeMinutes || 0),
    cookTimeMinutes: Number(input.cookTimeMinutes || 0),
    servings: Number(input.servings || 1),
    difficulty: input.difficulty?.trim() || "Easy",
    cuisine: input.cuisine?.trim() || "",
    caloriesPerServing: Number(input.caloriesPerServing || 0),
    tags: Array.isArray(input.tags)
      ? input.tags.filter(Boolean)
      : splitByComma(input.tags),
    userId: Number(input.userId || 1),
    image: input.image?.trim() || "",
    rating: Number(input.rating || 0),
    reviewCount: Number(input.reviewCount || 0),
    mealType: Array.isArray(input.mealType)
      ? input.mealType.filter(Boolean)
      : splitByComma(input.mealType),
    price:
      input.price === undefined || input.price === null || input.price === ""
        ? null
        : Number(input.price),
  };
}

export async function getAllRecipes() {
  await connectToDatabase();
  const recipes = await Recipe.find({}).sort({ createdAt: -1 }).lean();
  return recipes.map(mapRecipe);
}

export async function getRecipeById(id) {
  await connectToDatabase();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const recipe = await Recipe.findById(id).lean();
  return mapRecipe(recipe);
}

export async function createRecipe(input) {
  await connectToDatabase();
  const recipe = await Recipe.create(normalizeRecipeInput(input));
  return mapRecipe(recipe);
}

export async function updateRecipeById(id, input) {
  await connectToDatabase();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const recipe = await Recipe.findByIdAndUpdate(id, normalizeRecipeInput(input), {
    new: true,
    runValidators: true,
  });

  return mapRecipe(recipe);
}

export async function deleteRecipeById(id) {
  await connectToDatabase();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }

  const deleted = await Recipe.findByIdAndDelete(id);
  return Boolean(deleted);
}
