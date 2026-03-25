import { useEffect, useState } from "react";
import {
  fetchCategories,
} from "../services/api";
import { useNavigate } from "react-router-dom";

import CategoryCard from "../components/CategoryCard";

const Meal = ({setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
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

  return (
    <div className="container">
      <h1>Meal Categories</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="category-container">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.idCategory}
              category={cat}
              onClick={() => {
                setSelectedCategory(cat.strCategory);
                navigate(`/meal/${cat.strCategory}`); 
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Meal;
