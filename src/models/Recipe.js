import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    instructions: {
      type: [String],
      default: [],
    },
    prepTimeMinutes: {
      type: Number,
      default: 0,
      min: 0,
    },
    cookTimeMinutes: {
      type: Number,
      default: 0,
      min: 0,
    },
    servings: {
      type: Number,
      default: 1,
      min: 1,
    },
    difficulty: {
      type: String,
      default: "Easy",
      trim: true,
    },
    cuisine: {
      type: String,
      default: "",
      trim: true,
    },
    caloriesPerServing: {
      type: Number,
      default: 0,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    userId: {
      type: Number,
      default: 1,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    mealType: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default mongoose.models.Recipe ||
  mongoose.model("Recipe", RecipeSchema);
