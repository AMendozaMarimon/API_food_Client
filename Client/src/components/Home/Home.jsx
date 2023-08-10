import styles from "./Home.module.css";
import FOOD from '../Home/FOOD.webp';
import { Link } from "react-router-dom";

export const Home = () => {

    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    <span className={styles.starts}> ★ ★ ★ ★ ★</span>
                    <br />
                    <span>Find the</span>
                    <br />
                    <span>recipe </span>
                    <br />
                    <span>you want!</span>
                </h1>
                <img className={styles.image} src={FOOD} alt='FOOD' />
            </div>
            <div className={styles.searchContainer}>
                <Link to={'/search'}>
                    <button className={styles.search}>Search recipes</button>
                </Link>
            </div>
        </div>
    );
};