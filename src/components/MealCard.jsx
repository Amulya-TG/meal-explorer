import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MealCard = ({ meal, onClick }) => {
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];
    const found = existing.find((m) => m.idMeal === meal.idMeal);
    setIsFav(!!found);
  }, [meal.idMeal]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login to add favorites");
      navigate("/login");
      return;
    }
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
    <motion.div className="meal-card"  whileHover={{ scale: 1.05 }} onClick={onClick}>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <button className="fav-btn" onClick={toggleFavorite}>
        {isFav ? "❤️" : "🤍"}
      </button>

      <div className="hover-overlay">
        <h3>{meal.strMeal}</h3>
      </div>
    </motion.div>
  );
};

export default MealCard;
