import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMealsByCategory,
  fetchRecipeDetails,
} from "../services/api";

import MealCard from "../components/MealCard";
import RecipePopup from "../components/RecipePopup";

const Meals = ({ meals, setMeals }) => {
  const { category } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (!category || category === "search") return;

  const loadMeals = async () => {
    try {
      setLoading(true);
      const data = await fetchMealsByCategory(category);
      setMeals(data.meals || []);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  loadMeals();
}, [category]);

  const handleRecipe = async (id) => {
    const data = await fetchRecipeDetails(id);
    setRecipe(data.meals[0]);
  };

  return (
    <div className="container">
      <h1>{category} Meals</h1>
      {
        loading ? (
          <h2>Loading..</h2>
        ):(
          <div className="meal-container">
        {meals.map((meal) => (
          <MealCard
            key={meal.idMeal}
            meal={meal}
            onClick={() => handleRecipe(meal.idMeal)}
          />
        ))}
      </div>
        )
      }
      

      

      {recipe && (
        <RecipePopup
          recipe={recipe}
          onClose={() => setRecipe(null)}
        />
      )}
    </div>
  );
};

export default Meals;