import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PHOTO from "../Login/PHOTO_LOGIN.png";
// import GIF from "../RecipesCards/icons8-loading-infinity.gif";
import styles from "./CreateRecipe.module.css";
import { addDiets, addRecipes } from "../../redux/actions";

export const CreateRecipe = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const myDiets = useSelector((state) => state.myDiets);

    useEffect(() => {
        if (!myDiets) {
            dispatch(addDiets());
        }
    }, [dispatch, myDiets]);

    const [formData, setFormData] = useState({
        title: "",
        image: "",
        summary: "",
        healthScore: 0,
        step_by_step: "",
        selectedDiets: [],
    });

    console.log(formData.selectedDiets)

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'healthScore') {
            if (value < 0 || value > 100) {
                return;
            }
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                selectedDiets: [...prevFormData.selectedDiets, value],
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                selectedDiets: prevFormData.selectedDiets.filter((diet) => diet !== value),
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const URL = "http://localhost:3001/recipes";
            const { status } = await axios.post(URL, formData);
            if (status === 200) {
                await dispatch(addRecipes());
                alert("Recipe created");
                navigate("/search");
            }
        } catch (error) {
            if (error.response) {
                const { data, status } = error.response;
                if (status === 400) {
                    alert(data.message);
                }
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <h2>
                    <span className={styles.color}>Create</span> <br />your recipe!
                </h2>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <input className={styles.formContainerINPUT}
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter the name of the recipe..."
                    />

                    <input className={styles.formContainerINPUT}
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Enter the image URL..."
                    />

                    <input className={styles.formContainerINPUT}
                        type="text"
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        placeholder="Enter the description..."
                    />

                    <input className={styles.formContainerINPUT}
                        type="number"
                        name="healthScore"
                        value={formData.healthScore}
                        onChange={handleChange}
                        placeholder="Enter the health score..."
                    />

                    <input className={styles.formContainerINPUT}
                        type="text"
                        name="step_by_step"
                        value={formData.step_by_step}
                        onChange={handleChange}
                        placeholder="Enter the steps..."
                    />

                    <div className={styles.checkboxContainer}>
                        <h3>Select diets:</h3>
                        <div className={styles.checkboxColumns}>
                            {myDiets?.map((diet) => (
                                <label key={diet} className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        value={diet}
                                        checked={formData.selectedDiets.includes(diet)}
                                        onChange={handleCheckboxChange}
                                        className={styles.checkboxInput}
                                    />
                                    {diet}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button className={styles.button} type="submit">Create Recipe</button>
                </form>
            </div>
            <div className={styles.rightContainer}>
                <img className={styles.imageContainer} src={PHOTO} alt="Photo.." />
            </div>
        </div>
    );
};
