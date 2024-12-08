import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRecipes = async () => {
    try {
      const response = await fetch("https://dummyjson.com/recipes");
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <WebHeader />
      <h1 className="recipe-lable">Tasty Recipes -</h1>
      <div className="recipes-container">
        {loading ? (
          <p>Loading recipes...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          recipes.map((recipeObj) => (
            <CardComponent key={recipeObj.id} recipe={recipeObj} />
          ))
        )}
      </div>
    </>
  );
}

function WebHeader() {
  return (
    <header className="header">
      <div className="brand"><span className="span-logo">Recipe</span>Fusion</div>
      <nav className="nav">
        <ul>
          <li>Home</li>
          <li>Recipes</li>
          <li>About Us</li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="login-button" onClick={() => console.log("Login button clicked")}>
          Login
        </button>
        <button className="signup-button" onClick={() => console.log("Signup button clicked")}>
          Signup
        </button>
      </div>
    </header>
  );
}

function CardComponent({ recipe }) {
  return (
    <div className="card-bg">
      <img src={recipe.image} alt={recipe.name} />
      <p className="recipe-name">{recipe.name}</p>
      <p className="recipe-rating">Rating: {recipe.rating}</p>
      <p className="recipe-review">Review: {recipe.reviewCount}</p>
    </div>
  );
}

export default App;