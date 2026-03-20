import { useState, useEffect } from "react";

const MealCard = ({ meal, onClick }) => {
  const [isFav, setIsFav] = useState(false);
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];
    const found = existing.find((m) => m.idMeal === meal.idMeal);
    setIsFav(!!found);
  }, [meal.idMeal]);

  const toggleFavorite = (e) => {
    e.stopPropagation();

    let existing = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFav) {
      const updated = existing.filter((m) => m.idMeal !== meal.idMeal);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFav(false);
    } else {
      existing.push(meal);
      localStorage.setItem("favorites", JSON.stringify(existing));
      setIsFav(true);
    }
  };

  return (
    <div className="card" onClick={onClick}>
      <p>{meal.strMeal}</p>
      <img src={meal.strMealThumb} alt={meal.strMeal} />

      <button onClick={toggleFavorite}>
        {isFav ? "💔 Remove" : "❤️ Add"}
      </button>
    </div>
  );
};

export default MealCard;