/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import { NavBar } from "./NavBar/NavBar";
import { Title } from "./Title/Title";
import { SearchBar } from "./SearchBar/SearchBar";
import { Filters } from "./Filters/Filters";

export const Nav = (props) => { 

    const { LogOut } = props;

    const location = useLocation();

    if (location.pathname === '/' || location.pathname === '/create') {
        return null;
    }

    return (
        <nav>
            <NavBar LogOut={LogOut}/>
            <Title />
            <SearchBar />
            <Filters />
        </nav>
    )
};