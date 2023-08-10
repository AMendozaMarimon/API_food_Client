/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./RecipesDesing.module.css";

export const RecipesDesing = (props) => {
  const { id, title, image, diets, Diets } = props;

  const dietNamesFromDB = Diets?.map((diet) => diet.name) || [];

  return (
    <div className={styles.divRecipes}>
      <div>
        <img className={styles.image} src={image} alt={title} />
      </div>
      <div>
        <Link to={`/detail/${id}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <p className={styles.p}>
          {diets?.map((diet, index) => (
            <span key={index}>• {diet} </span>
          ))}
        </p>
        <p className={styles.p}>
          {dietNamesFromDB.map((diet, index) => (
            <span key={index}>• {diet} </span>
          ))}
        </p>
      </div>
    </div>
  );
};
