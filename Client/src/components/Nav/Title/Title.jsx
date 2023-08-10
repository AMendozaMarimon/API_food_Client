import { useLocation } from "react-router-dom";
import styles from "./Title.module.css";

export const Title = () => {

    const location = useLocation();

    if (location.pathname !== '/search') {
        return null;
    }

    return (
        <div>
            <h2 className={styles.title}>Search your recipes!</h2>
        </div>
    );  
};