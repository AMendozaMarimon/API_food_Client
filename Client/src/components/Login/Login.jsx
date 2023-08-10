/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Login.module.css";
import validation from "./validation";
import PHOTO_LOGIN from "./PHOTO_LOGIN.png";

export const Login = (props) => {

    const { login, Register } = props;

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const [userDataReg, setUserDataReg] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChangeR = (e) => {
        const { name, value } = e.target;
        const updatedUserDataReg = {
            ...userDataReg,
            [name]: value,
        };
        const validationError = validation(updatedUserDataReg);
        setUserDataReg(updatedUserDataReg);
        setErrors(validationError);
    };

    const [isSignUp, setIsSignUp] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedUserData = {
            ...userData,
            [name]: value,
        };
        const validationError = validation(updatedUserData);
        setUserData(updatedUserData);
        setErrors(validationError);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            Register(userDataReg)
        } else {
            login(userData);
        }
    };

    const handleToggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.titleContainer}>
                    <h2 className={styles.title}>
                        <span className={styles.welcomeText}>Welcome</span> to your <br />
                        new favorite page!
                    </h2>
                </div>
                <div className={styles.formContainer}>
                    {!isSignUp ? (
                        <form onSubmit={handleSubmit}>
                            <label>Email: </label>
                            <input
                                type="text"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                placeholder="Enter your email..."
                            />
                            {errors.email && <p className={styles.p}>{errors.email}</p>}
                            <label>Password: </label>
                            <input
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                placeholder="Enter your password..."
                            />
                            {errors.password && <p className={styles.p}>{errors.password}</p>}
                            <button type="submit">Log in.</button>
                            <p>
                                <span>If you don't have an account yet, </span>
                                <span className={styles.linkText} onClick={handleToggleForm}>
                                    Sing up!
                                </span>
                            </p>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <label>Email: </label>
                            <input
                                type="text"
                                name="email"
                                value={userDataReg.email}
                                onChange={handleChangeR}
                                placeholder="Enter you email to register..."
                            />
                            {errors.email && <p className={styles.p}>{errors.email}</p>}
                            <label>Password: </label>
                            <input
                                type="password"
                                name="password"
                                value={userDataReg.password}
                                onChange={handleChangeR}
                                placeholder="Enter your password to register..."
                            />
                            {errors.password && <p className={styles.p}>{errors.password}</p>}
                            <button type="submit">Sing up.</button>
                            <p>
                                <span>Do you already have an account? </span>
                                <span className={styles.linkText} onClick={handleToggleForm}>
                                    Log in!
                                </span>
                            </p>
                        </form>
                    )}
                </div>
            </div>
            <div className={styles.rightContainer}>
                <div>
                    <img className={styles.imageContainer} src={PHOTO_LOGIN} alt="Image" />
                </div>
            </div>
        </div>
    );
};
