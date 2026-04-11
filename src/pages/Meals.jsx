import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  fetchMealsByCategory,
  fetchRecipeDetails,
  searchMeals,
} from "../services/api";
import { useNavigate } from "react-router-dom";

import MealCard from "../components/MealCard";
import RecipePopup from "../components/RecipePopup";

const Meals = ({ meals, setMeals }) => {
  const { category } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");
  useEffect(() => {
    if (!category || category === "search") return;

    const loadMeals = async () => {
      try {
        setLoading(true);
        if (category === "search" && searchQuery) {
          const data = await fetchMealsByCategory(category);
          setMeals(data.meals || []);
        } else if (category) {
          const data = await fetchMealsByCategory(category);
          setMeals(data.meals || []);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    loadMeals();
  }, [category]);

  const handleRecipe = async (id) => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login to view recipe");
      navigate("/login");
      return;
    }

    const data = await fetchRecipeDetails(id);
    setRecipe(data.meals[0]);
  };

  return (
    <div className="container">
      <h1>
        {searchQuery ? `Results for "${searchQuery}"` : `${category} Meals`}
      </h1>
      {loading ? (
        <h2>Loading..</h2>
      ) : meals.length === 0 ? (
        <p>No meals found</p>
      ) : (
        <div className="meal-container">
          {meals.map((meal) => (
            <MealCard
              key={meal.idMeal}
              meal={meal}
              onClick={() => handleRecipe(meal.idMeal)}
            />
          ))}
        </div>
      )}

      {recipe && (
        <RecipePopup recipe={recipe} onClose={() => setRecipe(null)} />
      )}
    </div>
  );
};

export default Meals;
