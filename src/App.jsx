import React, { useState, useEffect } from "react";
import "./index.css"

const App = () => {
  const [meal, setMeal] = useState([]);
  const [loading, setloading] = useState(false);
  const API_URL = "https://www.themealdb.com/api/json/v1/1/categories.php";
  const getCategories = async () => {
    setloading(true);
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(res);
     
    setMeal(data.categories);
    setloading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const [mealId , setMealId] = useState(null);
  const [category , setCategory] = useState([]);  
  const getMealId = async () => {
    const mealApi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealId}`;
    const res = await fetch(mealApi);
    const data = await res.json();
    // console.log(data.meals); 
    setCategory(data.meals)
  }; 

  useEffect (() => {
    getMealId();
  },[mealId])

  const [showPopup, setShowPopup] = useState(false);
  const [recipeData, setRecipeData] = useState(null);

  const getRecipeDetails = async (id) => {
    const detailsApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const res = await fetch(detailsApi);
    const data = await res.json();
    console.log(data.meals[0]);
    setRecipeData(data.meals[0]);  
    setShowPopup(true);            
  };


  return (
    <div className="container">
      <h1>Meal Categories</h1>
      {loading ? (
        <h2>loading...</h2>
      ):(
        <div className="category-container">
          {meal ?.map((e, i) => (
            <div className="card" onClick={() => setMealId(e.strCategory)} key={i}>
              {e.strCategory}
              <img
                width="100"
                height="100"
                src={e.strCategoryThumb}
                alt={e.strCategory}
              />
            </div>
          ))}
        </div>
      )}

      <h2>Meals</h2>
      <div className="meal-container">
        {category?.map((recipe, index) => (
          <div
            key={index}
            className="card"
            onClick={() => getRecipeDetails(recipe.idMeal)}
          >
            <p>{recipe.strMeal}</p>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          </div>
        ))}
      </div>

      <div>
        {showPopup && recipeData && (
          <div className="popup-overlay">
            <div className="popup-head">
              <h2>{recipeData.strMeal}</h2>
              <img src={recipeData.strMealThumb} alt="" />  
            </div>
            <div>
                <h3>Instructions</h3>
                <p>{recipeData.strInstructions}</p>
            </div>
            <div className="close-btn">  
            <div></div>
            <button className="btn" onClick={() => setShowPopup(false)}>
              Close
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
