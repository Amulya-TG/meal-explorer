// pages/Home.jsx
import { useEffect, useState } from "react";
import { fetchCategories, fetchMealsByCategory,
  fetchRecipeDetails, searchMeals,} from "../services/api";

import CategoryCard from "../components/CategoryCard";
import MealCard from "../components/MealCard";
import RecipePopup from "../components/RecipePopup";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  // Loading
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data.categories);
      setLoading(false);
    };

    loadCategories();
  }, []);

  // Load meals when category changes
  useEffect(() => {
    if (!selectedCategory) return;

    const loadMeals = async () => {
      const data = await fetchMealsByCategory(selectedCategory);
      setMeals(data.meals);
    };
    loadMeals();
  }, [selectedCategory]);


  //recipe details
  const handleRecipe = async (id) => {
    const data = await fetchRecipeDetails(id);
    setRecipe(data.meals[0]);
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      alert("Enter something");
      return;
    }

    try {
      setSelectedCategory(null);
      setLoading(true);

      const data = await searchMeals(search);
      setMeals(data.meals || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Meal Categories</h1>
      <input
        type="text"
        placeholder="Search meals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="category-container">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.idCategory}
              category={cat}
              onClick={() => setSelectedCategory(cat.strCategory)}
            />
          ))}
        </div>
      )}

      <h2>Meals</h2>
      <div className="meal-container">
        {meals?.map((meal) => (
          <MealCard
            key={meal.idMeal}
            meal={meal}
            onClick={() => handleRecipe(meal.idMeal)}
          />
        ))}
      </div>

      {recipe && (
        <RecipePopup recipe={recipe} onClose={() => setRecipe(null)} />
      )}
    </div>
  );
};

export default Home;
