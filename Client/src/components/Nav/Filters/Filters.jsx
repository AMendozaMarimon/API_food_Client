import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    sortAlphabetically,
    sortScortHS,
    filterByDiets,
    filterByBDorAPI,
    addDiets,
    applyFilters,
    dietLoaded
} from "../../../redux/actions";
import { useLocation } from "react-router-dom";
import styles from "./Filters.module.css";

export const Filters = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const diets = useSelector((state) => state.myDiets);
    const dietsLoaded = useSelector((state) => state.dietsLoaded);

    const [alphabeticalOrder, setAlphabeticalOrder] = useState("");
    const [healthScoreOrder, setHealthScoreOrder] = useState("");
    const [selectedDiet, setSelectedDiet] = useState("");
    const [selectRecipeBDorAPI, setSelectRecipeBDorAPI] = useState("");

    useEffect(() => {
        if (!dietsLoaded) {
            const fetchDiets = async () => {
                await dispatch(addDiets());
                await dispatch(dietLoaded());
            }
            fetchDiets();
        }
    }, [dietsLoaded, dispatch]);

    if (location.pathname !== '/search') {
        return null;
    }
    
    const handleAlphabeticalChange = (e) => {
        const order = e.target.value;
        setAlphabeticalOrder(order);
        dispatch(sortAlphabetically(order));
    };

    const handleHealthScoreChange = (e) => {
        const order = e.target.value;
        setHealthScoreOrder(order);
        dispatch(sortScortHS(order));
    };

    const handleSelectDiet = (e) => {
        const selectedDiet = e.target.value;
        setSelectedDiet(selectedDiet);
        dispatch(filterByDiets(selectedDiet));
        dispatch(applyFilters("filteredRecipes"));
    };

    const handleFilteredRecipes = (e) => {
        const origin = e.target.value;
        setSelectRecipeBDorAPI(origin);
        dispatch(filterByBDorAPI(origin));
        dispatch(applyFilters("filtereByAPIorBD"));
    };

    const handleClearFilters = () => {
        setAlphabeticalOrder("");
        setHealthScoreOrder("");
        setSelectedDiet("");
        setSelectRecipeBDorAPI("");
        dispatch(applyFilters("myRecipes"));
    };

    return (
        <div className={styles.container}>
            <div>
                <select className={styles.options} value={alphabeticalOrder} onChange={handleAlphabeticalChange}>
                    <option value="ascALPHA">A-Z</option>
                    <option value="descALPHA">Z-A</option>
                </select>
            </div>
            <div>
                <select className={styles.options} value={healthScoreOrder} onChange={handleHealthScoreChange}>
                    <option value="asc">LOWER</option>
                    <option value="desc">HIGHER</option>
                </select>
            </div>
            <div>
                <select className={styles.options} value={selectedDiet} onChange={handleSelectDiet}>
                    {diets?.map((diet) => (
                        <option key={diet} value={diet}>
                            {diet}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <select className={styles.options} value={selectRecipeBDorAPI} onChange={handleFilteredRecipes}>
                    <option value="api">API</option>
                    <option value="bd">BD</option>
                </select>
            </div>
            <div>
                <button className={styles.button} onClick={handleClearFilters}>CLEAR FILTERS</button>
            </div>
        </div>
    );
};
