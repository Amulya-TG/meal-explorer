import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

    const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/meal/search?q=${search}`);
    setSearch("");
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => navigate("/")}>
          <span className="meal">🍽 Meal</span>
          <span className="explorer">Explorer</span>
        </div>

        <form className="nav-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search meals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="nav-right">
          <button onClick={() => setDarkMode(!darkMode)} className="mode-btn">
            {darkMode ? "🌙" : "☀️"}
          </button>

          <div className="hamburger" onClick={() => setMenuOpen(true)}>
            ☰
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}></div>
      )}

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="menu-header">
          <h2>Menu</h2>
          <span onClick={() => setMenuOpen(false)}>✕</span>
        </div>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home </Link>
        <Link to="/meal" onClick={() => setMenuOpen(false)}>Meals</Link>
        <Link to="/favorites" onClick={() => setMenuOpen(false)}>Favorites</Link>

        {user ? (
          <button
            style={{ fontFamily: "serif" }}
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
