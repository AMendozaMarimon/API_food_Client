import { useState } from "react";
import { useSelector } from "react-redux";
import { RecipesDesing } from "../RecipesDesing/RecipesDesing";
import ICONO_GIF from "./icons8-loading-infinity.gif";
import styles from "./RecipesCards.module.css";

export const RecipesCards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  const nextHandle = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevHandle = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const myRecipes = useSelector((state) => state.myRecipes);

  if (!myRecipes || myRecipes.length === 0) {
    return (
      <div className={styles.containerLoading}>
        <img className={styles.loading} src={ICONO_GIF} alt="loading..." />
      </div>
    );
  }

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = myRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <div>
      <div className={styles.containerPrevNext}>
        <button className={styles.button} onClick={prevHandle} disabled={currentPage === 1}>
          Prev
        </button>
        <button className={styles.button} onClick={nextHandle} disabled={currentRecipes.length < recipesPerPage}>
          Next
        </button>
      </div>
      <div>
        <ul className={styles.recipeList} >
          {currentRecipes.map((recipe) => (
            <RecipesDesing
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              diets={recipe.diets}
              Diets={recipe.Diets}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
