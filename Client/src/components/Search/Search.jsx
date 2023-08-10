import { Routes, Route, useLocation } from "react-router-dom";
import { RecipesCards } from "../RecipesCards/RecipesCards"

export const Search = () => {

    const location = useLocation();

    if (location.pathname !== "/search") {
        return null;
    }

    return (
        <div>
            <Routes>
                <Route element={<RecipesCards />}/>
            </Routes>
        </div>
    )
}