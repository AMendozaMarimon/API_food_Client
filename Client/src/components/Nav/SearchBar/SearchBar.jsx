/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchByQuery, applyFilters } from "../../../redux/actions";
import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Solo realiza la búsqueda si hay un nombre ingresado
    if (name.length > 0) {
      const delaySearch = setTimeout(async () => {
        await dispatch(searchByQuery(name));
        dispatch(applyFilters("filteredByQuery"));
      }, 1000);

      return () => clearTimeout(delaySearch);
    } else if(name.length === 0) {
      dispatch(applyFilters("myRecipes"));
    }
  }, [dispatch, name]);

  if (location.pathname !== '/search') {
    return null;
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  return (
    <div className={styles.divBotton}>
      <input
        className={styles.searchInput}
        type="search"
        placeholder="Enter the name of the recipe..."
        onChange={handleChange}
        value={name}
      />
    </div>
  );
};
