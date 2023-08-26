import { addRecipes, applyFilters } from "../../redux/actions";
import ICONO_GIF from "./icons8-loading-infinity.gif";
import styles from "./RecipesCards.module.css";
import NotFound from "./NotFound.svg";
import { RecipesDesing } from "../RecipesDesing/RecipesDesing";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const RecipesCards = () => {

  const [recipesLoaded, setRecipesLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); //PÁGINAS
  const recipesPerPage = 9; //RECETAS POR PÁGINAS

  const nextHandle = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };  

  const prevHandle = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const pageFiltereds = useSelector((state) => state.pageFiltered);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!recipesLoaded) {
      const fetchRecipes = async () => {
        await dispatch(addRecipes());
        dispatch(applyFilters("myRecipes"));
        setRecipesLoaded(true);
      };
      fetchRecipes();
    }
  }, [dispatch, recipesLoaded]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pageFiltereds]);

  if (!recipesLoaded || !pageFiltereds) {
    return (
      <div className={styles.containerLoading}>
        <img className={styles.loading} src={ICONO_GIF} alt="loading..." />
      </div>
    );
  }

  if (pageFiltereds.length === 0) {
    return (
      <div className={styles.containerNF}>
        <img className={styles.NFimg} src={NotFound} alt="NotFound..." />
        <p className={styles.NFp}>Not Found!</p>
      </div>
    )
  }

  const indexOfLastRecipe = currentPage * recipesPerPage; //ÚLTIMO ÍNDICE DE LA PÁGINA ACTUAL 
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //PRIMER ÍNDICE DE LA PÁGINA ACTUAL
  const currentRecipes = pageFiltereds.slice(indexOfFirstRecipe, indexOfLastRecipe); //NUEVO ARRAY CON LAS PÁGINAS
  
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
              healthScore={recipe.healthScore}
              diets={recipe.diets}
              Diets={recipe?.Diets}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
