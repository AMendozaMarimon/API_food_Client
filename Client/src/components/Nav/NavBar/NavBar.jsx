/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import LOGO from "./LOGO/LOGO_FOOD.png";
import styles from "./NavBar.module.css";

export const NavBar = (props) => {

  const { LogOut } = props;

  const handleChangeAboutMe = () => {
    const aboutMe = "https://www.linkedin.com/in/aimar-mendoza-29120a27a/";
    window.open(aboutMe, "_blank");
  };

  return (
    <div>
      <div className={styles.divNav}> 
        <div className={styles.logoContainer}>
          <Link to={'/home'}>
            <img className={styles.logo} src={LOGO} alt="logo" />
          </Link>
        </div>
        <div>
          <Link to={'/home'}>
            <button className={styles.button}>HOME</button>
          </Link>
          <Link to={'/create'}>
             <button className={styles.button} >CREATE YOUR OWN RECIPE!</button>
          </Link>
          <button className={styles.button} onClick={handleChangeAboutMe}>ABOUT ME</button>
          <button className={styles.buttonLO} onClick={LogOut} >Log Out.</button>
        </div>
      </div>
    </div>
  );
};
