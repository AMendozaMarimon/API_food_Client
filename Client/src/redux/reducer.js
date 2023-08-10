import { ADD_RECIPES, QUERY_RECIPES, ADD_DIETS } from "./actions";

const initialState = {
  myRecipes: [],
  myDiets: [],
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_RECIPES:
      return { myRecipes: payload };
    case QUERY_RECIPES:
      console.log(payload);
      return { myRecipes: payload };
    case ADD_DIETS:
      console.log(payload)
      return { myDiets: payload };
    default:
      return {state};
  }
};

export default rootReducer;
