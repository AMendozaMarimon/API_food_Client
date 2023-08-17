import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import GIF from "../RecipesCards/icons8-loading-infinity.gif";

export const Detail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const { data } = await axios(`http://localhost:3001/recipes/${id}`);
                if (data.title) {
                    setRecipe(data);
                }
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response;

                    if (status === 500) {
                        alert(data.message);
                    } else if (status === 400) {
                        alert(data.message)
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecipe();
    }, [id]);

    return (
        <div className={style.recipe_detail}>
            {isLoading ? (
                <div className={style.loading}>
                    <img src={GIF} alt="Loading" />
                </div>
            ) : (
                <>
                    <h1>{recipe.title}</h1>
                    <img src={recipe.image} alt={recipe.title} className={style.recipe_image} />
                    <p>{recipe.summary ? recipe.summary.replace(/<[^>]+>/g, "") : ""}</p>
                    <h2>Health Score:</h2>
                    <p>{recipe.healthScore} ✨ </p>
                    <h2>Step by step:</h2>
                    <p>{recipe.stepbystep ? recipe.stepbystep.replace(/<[^>]+>/g, "") : ""}</p>
                    <div className={style.diets}>
                        <h2>Diets:</h2>
                        {recipe.diets && recipe.diets.length > 0 ? (
                            <ul>
                                {recipe.diets.map((diet, index) => (
                                    <li key={index}>{diet}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No diets available.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
