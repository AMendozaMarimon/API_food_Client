import axios from "axios";
import { addDiets, addRecipes } from "../../redux/actions";
import styles from "./CreateRecipe.module.css";
import Swal from 'sweetalert2';
import PHOTO from "../Login/PHOTO_LOGIN.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const CreateRecipe = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const myDiets = useSelector((state) => state.myDiets);

    useEffect(() => { //SI DIETA ES UNDEFINE SE SOLICITA LAS DIETAS
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

        if (name === 'healthScore') { //LÍMITA EL PUNTAJE PARA SOLO VALORES PERMITIDOS
            if (value < 0 || value > 100) {
                return;
            }
        }

        setFormData((prevFormData) => ({ //SE GUARDAN LOS VALORES DEL FORM EN EL ESTADO L.
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setFormData((prevFormData) => ({ //AÑADE LAS DIETAS SELECCIONADAS
                ...prevFormData,
                selectedDiets: [...prevFormData.selectedDiets, value],
            }));
        } else {
            setFormData((prevFormData) => ({ //ELIMINA LAS DIETAS DESELECCIONADAS
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
                Swal.fire({
                    icon: 'success',
                    title: 'Created Recipe',    
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'Acept',
                }).then((result) => {
                    result.isConfirmed ? navigate("/search") : null;
                });
            }
        } catch (error) {
            if (error.response) {
                const { data, status } = error.response;
                if (status === 400) {
                    Swal.fire(data.message, 'Remember to fill all the steps', 'error');
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
                                        checked={formData.selectedDiets.includes(diet)} //REFLEJA VISUALMENTE SI YA SE ENCUENTRA EN EL ESTADO
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
