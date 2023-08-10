/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchByQuery, addRecipes } from "../../../redux/actions";
import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  
  useEffect(() => { 
    if (location.pathname === "/search") {
      if (name.length === 0) {
        dispatch(addRecipes());
      } else {
        const delaySearch = setTimeout(() => {
          dispatch(searchByQuery(name));
        }, 500);
        return () => clearTimeout(delaySearch);
      }
    }
  }, [dispatch, name, location]);

  if (location.pathname !== '/search' ) {
    return null;
  }
  

  const handleChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  return (
    <div className={styles.divBotton}>
      <input className={styles.searchInput}
        type="search"
        placeholder="Enter the name of the recipe..."
        onChange={handleChange}
        value={name}
      />
    </div>
  );
};
