import axios from "axios";
export const ADD_RECIPES = "ADD_RECIPES";
export const QUERY_RECIPES = "QUERY_RECIPES";
export const ADD_DIETS = "ADD_DIETS";
export const SORT_ALPHABETICALLY = "SORT_ALPHABETICALLY";
export const SORT_SCORE_HS = "SORT_SCORE_HS";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const FILTER_BY_BD_API = "FILTER_BY_BD_API";
export const APPLY_FILTER = "APPLY_FILTER";
export const DIETS_LOADED = "DIETS_LOADED";

export const addRecipes = () => {
  const enpoind = "http://localhost:3001/recipes";
  return async (dispatch) => {
    try {
      const { data, status } = await axios(enpoind);
      if (status === 500) {
        return window.alert(data.error)
      }
      return dispatch({
        type: ADD_RECIPES,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const searchByQuery = (name) => {
  const enpoind = `http://localhost:3001/recipes/search?name=${name}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(enpoind);
      dispatch({
        type: QUERY_RECIPES,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const addDiets = () => {
  const enpoind = `http://localhost:3001/diets`;
  return async (dispatch) => {
    try {
      const { data } = await axios(enpoind);
      dispatch({
        type: ADD_DIETS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const sortAlphabetically = (order) => {
  return {
    type: SORT_ALPHABETICALLY,
    payload: order,
  };
};

export const sortScortHS = (order) => {
  return {
    type: SORT_SCORE_HS,
    payload: order,
  };
};

export const filterByDiets = (selectedDiet) => {
  return {
    type: FILTER_BY_DIETS,
    payload: selectedDiet,
  }
};

export const filterByBDorAPI = (origin) => {
  return {
    type: FILTER_BY_BD_API,
    payload: origin,
  };
};

export const applyFilters = (filter) => {
  return {
    type: APPLY_FILTER,
    payload: filter,
  }
};

export const dietLoaded = () => {
  return {
    type: DIETS_LOADED,
    payload: true,
  }
}