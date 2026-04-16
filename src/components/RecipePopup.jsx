const RecipePopup = ({ recipe, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-head">
        <h2>{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      </div>

      <div>
        <h3>Instructions</h3>
        <p>{recipe.strInstructions}</p>
      </div>

      <button className="popup-close-btn" onClick={onClose}>
        Close ✕
      </button>
    </div>
  );
};

export default RecipePopup;
