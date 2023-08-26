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
import Swal from 'sweetalert2';

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
        let options = {
          icon: 'error',
          title: data.message
        }

        if (status === 500 || status === 494 || status === 403 || status === 400) {
          Swal.fire(options)
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
        Swal.fire('¡Registered User!', 'Your registration was successful', 'success');

        if (access) {
          setAccess(access);
          navigate("/home");
        }
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        let options = {
          icon: 'error',
          title: data.message,
        };
    
        if (status === 400 || status === 409 || status === 500 || status === 404) {
          Swal.fire(options);
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