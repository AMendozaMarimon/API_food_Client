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
    filteredSortByAlpha: [],
    filteredSortByScoreH: [],
  },
  pageFiltered: [],
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_RECIPES:
      return { myRecipes: payload };

    //--------------------------------------------------------//

    case ADD_DIETS:
      return { ...state, myDiets: payload };

    //--------------------------------------------------------//

    case QUERY_RECIPES:
      return {
        ...state,
        filtered: { ...state.filtered, filteredByQuery: payload },
      };

    //--------------------------------------------------------//

    case SORT_ALPHABETICALLY:
      const alphaOrder = payload === "ascALPHA" ? 1 : -1;
      const sortedAlphabetically = [...state.myRecipes].sort(
        (a, b) => alphaOrder * a.title.localeCompare(b.title)
      );
      console.log(sortedAlphabetically);
      return {
        ...state,
        filtered: {
          ...state.filtered,
          filteredSortByAlpha: sortedAlphabetically,
        },
      };
    //--------------------------------------------------------//

    case SORT_SCORE_HS:
      const healthScoreOrder = payload === "asc" ? 1 : -1;
      const sortedByHealthScore = [...state.myRecipes].sort(
        (a, b) => healthScoreOrder * (a.healthScore - b.healthScore)
      );
      console.log(sortedByHealthScore);
      return {
        ...state,
        filtered: {
          ...state.filtered,
          filteredSortByScoreH: sortedByHealthScore,
        },
      };
    //--------------------------------------------------------//

    case FILTER_BY_DIETS:
      const selectedDiet = payload;
      const filteredByDiets = state.myRecipes.filter((recipe) =>
        recipe.diets && recipe.diets.includes(selectedDiet)
      );
      return {
        ...state,
        filtered: { ...state.filtered, filteredRecipes: filteredByDiets },
      };
    
    //--------------------------------------------------------//

    case FILTER_BY_BD_API:
      const filteredRecipes = state.myRecipes.filter((recipe) => {
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
      } else if (payload === "filteredSortByAlpha") {
        filteredData = state.filtered.filteredSortByAlpha;
      } else if (payload === "filteredSortByScoreH") {
        filteredData = state.filtered.filteredSortByScoreH;
      } else if (payload === "myRecipes") {
        filteredData = state.myRecipes;
        console.log(filteredData)
      }
      return {
        ...state,
        pageFiltered: filteredData,
      };
    }

    //--------------------------------------------------------//

    case DIETS_LOADED:
      return { ...state, dietsLoaded: payload };

    //--------------------------------------------------------//

    default:
      return state;
  }
};

export default rootReducer;
