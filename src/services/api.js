const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories.php`);
  return res.json();
};

export const fetchMealsByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
  return res.json();
};

export const fetchRecipeDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  return res.json();
};

export const searchMeals = async (query) => {
  if (!query) return { meals: [] };

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const data = await res.json();
  return data;
};