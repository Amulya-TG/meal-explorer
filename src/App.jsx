import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import Meal from "./pages/Meal";
import Meals from "./pages/Meals"; 
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setMeals={setMeals}      
        setSelectedCategory={setSelectedCategory} 
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/meal"
          element={
            <Meal
              setSelectedCategory={setSelectedCategory}
            />
          }
        />
        <Route
          path="/meal/:category"
          element={
            <Meals
              meals={meals}
              setMeals={setMeals}
            />
          }
        />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;