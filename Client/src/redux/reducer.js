/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
import {
  ADD_RECIPES,
  QUERY_RECIPES,
  ADD_DIETS,
  SORT_ALPHABETICALLY,
  SORT_SCORE_HS,
  FILTER_BY_DIETS,
  FILTER_BY_BD_API,
  APPLY_FILTER,
  DIETS_LOADED,
} from "./actions";

const initialState = {
  myRecipes: [],
  myDiets: [],
  dietsLoaded: false,
  filtered: {
    filteredRecipes: [],
    filteredByQuery: [],
    filtereByAPIorBD: [],
  },
  pageFiltered: [],
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_RECIPES:
      return { myRecipes: payload }; //RECIBE LOS 100 RECIPES Y SI HAY EN LA BASE DE DATOS TAMBIÉN

    //--------------------------------------------------------//

    case ADD_DIETS:
      return { ...state, myDiets: payload }; //RECIBE LAS DIETAS DE LA BASE DE DATOS

    //--------------------------------------------------------//

    case QUERY_RECIPES:
      return {
        ...state,
        filtered: { ...state.filtered, filteredByQuery: payload }, //FILTRA POR NOMBRE
      };

    //--------------------------------------------------------//

    case SORT_ALPHABETICALLY:
      const alphaOrder = payload === "ascALPHA" ? 1 : -1;
      const sortedAlphabetically = state.pageFiltered
        .slice()
        .sort((a, b) => alphaOrder * a.title.localeCompare(b.title));
      return {
        ...state,
        pageFiltered: sortedAlphabetically,
      };
    //--------------------------------------------------------//

    case SORT_SCORE_HS:
      const healthScoreOrder = payload === "asc" ? 1 : -1;
      const sortedByHealthScore = state.pageFiltered.slice().sort(
        (a, b) => healthScoreOrder * (a.healthScore - b.healthScore) //COMPARA LOS NÚMEROS Y DEVUELVE EL ORDEN SOLICITADOS
      );
      console.log(sortedByHealthScore);
      return {
        ...state,
        pageFiltered: sortedByHealthScore,
      };
    //--------------------------------------------------------//

    case FILTER_BY_DIETS:
      const selectedDiet = payload;
      const filteredByDiets = state.myRecipes.filter(
        (
          recipe //FILTRA LAS RECETAS QUE INCLUYAN LA DIETA SELECC.
        ) => recipe.diets && recipe.diets.includes(selectedDiet)
      );
      return {
        ...state,
        filtered: { ...state.filtered, filteredRecipes: filteredByDiets },
      };

    //--------------------------------------------------------//

    case FILTER_BY_BD_API:
      const filteredRecipes = state.myRecipes.filter((recipe) => {
        //FILTRA POR ID
        if (payload === "api") {
          const isAPI = !isNaN(recipe.id);
          return isAPI;
        } else {
          const isBD = isNaN(recipe.id);
          return isBD;
        }
      });
      return {
        ...state,
        filtered: { ...state.filtered, filtereByAPIorBD: filteredRecipes },
      };

    //--------------------------------------------------------//

    case APPLY_FILTER: {
      let filteredData = null;
      if (payload === "filteredByQuery") {
        filteredData = state.filtered.filteredByQuery;
      } else if (payload === "filtereByAPIorBD") {
        filteredData = state.filtered.filtereByAPIorBD;
      } else if (payload === "filteredRecipes") {
        filteredData = state.filtered.filteredRecipes;
      } else if (payload === "myRecipes") {
        filteredData = state.myRecipes;
        console.log(filteredData);
      }
      return {
        ...state,
        pageFiltered: filteredData,
      };
    }

    //--------------------------------------------------------//

    case DIETS_LOADED:
      return { ...state, dietsLoaded: payload }; //RECIBE TRUE CUANDO LAS DIETAS YA FUERON TOMADAS

    //--------------------------------------------------------//

    default:
      return state;
  }
};

export default rootReducer;
