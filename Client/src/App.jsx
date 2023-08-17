import axios from "axios";
import { CreateRecipe } from "./components/CreateRecipe/CreateRecipe";
import { Detail } from "./components/Details/Detail";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Nav } from "./components/Nav/Nav";
import { Routes, Route } from "react-router-dom";
import { RecipesCards } from "./components/RecipesCards/RecipesCards";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {

  const navigate = useNavigate();
  const [access, setAccess] = useState(false);

  const login = async (userData) => {
    try {
      const { email, password } = userData;
      const URL = `http://localhost:3001?email=${email}&password=${password}`;
      const { data } = await axios(URL);
      const { access } = data;

      if (access) {
        setAccess(access);
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 500) {
          alert(data.message)
        } else if (status === 494) {
          alert(data.message)
        } else if (status === 403) {
          alert(data.message)
        } else if (status === 400) {
          alert(data.message)
        }
      }
    }
  };

  const LogOut = () => {
    setAccess(false);
  };

  useEffect(() => {
    !access && navigate("/");
  }, [access, navigate]);


  const Register = async (userDataReg) => {
    try {
      const URL = `http://localhost:3001/`;
      const { data, status } = await axios.post(URL, userDataReg);

      const { access } = data;

      if (status === 200) {
        alert('Registered user!');

        if (access) {
          setAccess(access);
          navigate("/home");
        }
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          alert(data.message);
        } else if (status === 409) {
          alert(data.message);
        } else if (status === 500) {
          alert(data.message)
        } else if (status === 404) {
          alert(data.message)
        }
      }
    }
  };

  return (
    <div>
      <Nav LogOut={LogOut} />
      <Routes>
        <Route path="/" element={<Login login={login} Register={Register} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<RecipesCards />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App;