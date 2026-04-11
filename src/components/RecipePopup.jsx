import { motion } from "framer-motion";

const RecipePopup = ({ recipe, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <motion.div className="popup-content"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close-btn" onClick={onClose}>✖</span>
        <img src={recipe.strMealThumb} alt="" />
        <h2>{recipe.strMeal}</h2>
        <p>{recipe.strInstructions}</p>
      </motion.div>
    </div>
  );
};

export default RecipePopup;