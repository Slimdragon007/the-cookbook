export interface Recipe {
  id: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  preparation: string;
  servings: number | null;
  cookTime: number | null;
  prepTime: number | null;
  sourceUrl: string | null;
  cuisineTag: string | null;
  dietaryTags: string[];
  julieRating: number | null;
  caloriesPerServing: number | null;
  totalCalories: number | null;
  manualCalorieOverride: number | null;
  totalBatchWeightG: number | null;
  ingredients: Ingredient[];
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number | null;
  unit: string | null;
  category: string | null;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  /** Optional clarifier ("kosher", "grated", "skin-on"). Renders as an
   *  asterisk superscript on the ingredient name + a footnote block under
   *  the ingredient list (per prototype mobile.jsx MRecipe). Not yet sourced
   *  from any DB column — future follow-up will either parse from comma-
   *  separated names ("salt, kosher" → name "salt" + note "kosher") or add
   *  an `ingredients.note` column via migration. Until then the field is
   *  always undefined and no asterisks render. */
  note?: string | null;
}
