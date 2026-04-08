import { useEffect, useRef, useState } from "react";
import { fetchCategories } from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      const catData = await fetchCategories();
      setCategories(catData.categories.slice(0, 6));
    };
    loadData();
  }, []);

  const checkScroll = () => {
    const el = scrollRef.current;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth);
  };

  const scroll = (dir) => {
    const amount = 250;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>Discover Delicious Recipes 🍽</h1>
        <button onClick={() => navigate("/meal")}>Explore Meals</button>
      </div>

      <div className="section-header">
        <h2>Categories</h2>
        <span className="see-more" onClick={() => navigate("/meal")}>
          See all →
        </span>
      </div>

      <div className="scroll-container">
        {showLeft && (
          <button className="scroll-btn left" onClick={() => scroll("left")}>‹</button>
        )}
        <div className="scroll-row" ref={scrollRef} onScroll={checkScroll}>
          {categories.map((cat) => (
            <div
              key={cat.idCategory}
              className="small-card"
              onClick={() => {
                setSelectedCategory(cat.strCategory);
                navigate(`/meal/${cat.strCategory}`);
              }}
            >
              <img src={cat.strCategoryThumb} alt={cat.strCategory} loading="lazy"/>
              <p>{cat.strCategory}</p>
            </div>
          ))}
        </div>
        {showRight && (
          <button className="scroll-btn right" onClick={() => scroll("right")}>›</button>
        )}
      </div>
    </div>
  );
};

export default Home;
