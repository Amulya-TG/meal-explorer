import { Link } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="navbar">
      <h2>🍽 Meal Explorer</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;