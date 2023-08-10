import axios from "axios";
export const ADD_RECIPES = "ADD_RECIPES";
export const QUERY_RECIPES = "QUERY_RECIPES";
export const ADD_DIETS = "ADD_DIETS";

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
