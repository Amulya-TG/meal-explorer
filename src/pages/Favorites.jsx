import { useEffect, useState } from "react";
import MealCard from "../components/MealCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(data);
  }, []);

  return (
    <div className="container">
      <h1>❤️ Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <div className="meal-container">
          {favorites.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} onClick={() => {}}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;