import axios from "axios";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PHOTO from "../Login/PHOTO_LOGIN.png";
import GIF from "../RecipesCards/icons8-loading-infinity.gif";
import styles from "./CreateRecipe.module.css";
import { addDiets } from "../../redux/actions";

export const CreateRecipe = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const myDiets = useSelector((state) => state.myDiets);

    useEffect(() => {
        if (location.pathname !== "/create") {
            return null;
        } else {
            dispatch(addDiets());
        }
    }, [location.pathname, dispatch]);

    const [formData, setFormData] = useState({
        title: "",
        image: "",
        summary: "",
        healthScore: 0,
        step_by_step: "",
        selectedDiets: [],
    });

    if (!myDiets) {
        return <div className={styles.containerLoading}>
            <img className={styles.loading} src={GIF} alt="Loading.." />
        </div>;
    }

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

    const handleSelectChange = (selectedOptions) => {
        const selectedDiets = selectedOptions.map((option) => option.value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            selectedDiets: selectedDiets,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const URL = "http://localhost:3001/recipes";
            const { status } = await axios.post(URL, formData);
            if (status === 200) {
                alert("Created recept");
                navigate("/search");
            }
        } catch (error) {
            if (error.response) {
                const { data, status } = error.response;

                if (status === 400) {
                    alert(data.message)
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
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter the name of the recipe..."
                    />

                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Enter the image URL..."
                    />

                    <input
                        type="text"
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        placeholder="Enter the description..."
                    />

                    <input
                        type="number"
                        name="healthScore"
                        value={formData.healthScore}
                        onChange={handleChange}
                        placeholder="Enter the health score..."
                    />

                    <input
                        type="text"
                        name="step_by_step"
                        value={formData.step_by_step}
                        onChange={handleChange}
                        placeholder="Enter the steps..."
                    />

                    <Select
                        className={styles.select}
                        isMulti
                        name="selectedDiets"
                        options={myDiets?.map((diet) => ({
                            value: diet,
                            label: diet,
                        }))}
                        value={formData.selectedDiets.map((diet) => ({
                            value: diet,
                            label: diet,
                        }))}
                        onChange={handleSelectChange}
                    />

                    <button className={styles.button} type="submit">Create Recipe</button>
                </form>
            </div>
            <div className={styles.rightContainer}>
                <img className={styles.imageContainer} src={PHOTO} alt="Photo.." />
            </div>
        </div>
    );
};