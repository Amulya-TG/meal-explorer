const CategoryCard = ({ category, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h3>{category.strCategory}</h3>
      <img src={category.strCategoryThumb} alt={category.strCategory} />
    </div>
  );
};

export default CategoryCard;