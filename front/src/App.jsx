import { useState, useEffect } from "react";
import "./App.css";
import Cards from "./components/Cards/Cards.jsx";
import Nav from "./components/Nav/Nav";
import axios from "axios";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import About from "./components/About/About";
import Detail from "./components/Detail/Detail";
import Error from "./components/Error/Error";
import Form from "./components/Form/Form";
import Favorites from "../src/components/Favorites/Favorites";
import Register from "./components/Register/Register";
//solicitud a mi propia api key
//const EMAIL = 'leomicale.lm@gmail.com';
//const PASSWORD = 'leo123';
//const URL_BASE = 'https://rym2-production.up.railway.app/api/character'
//const API_KEY = 'key=henrym-leonardoemicale'
//axios(`${URL_BASE}/${id}?${API_KEY}`)

const App = () => {
  const [characters, setCharacters] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);

  const login = async (userData) => {
    // const { email, password } = userData;
    // const URL = "http://localhost:3001/rickandmorty/login/";
    // axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
    //   const { access } = data;
    //   setAccess(access);
    //   access && navigate("/home");
    // });
    try {
      const { email, password } = userData;
      const URL = "http://localhost:3001/rickandmorty/login/";
      const { data } = await axios.get(
        URL + `?email=${email}&password=${password}`
      );
      const { access } = data;
      setAccess(access);
      access && navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSearch = async (id) => {
    //evito agregar personajes repetidos
    const characterShown = characters.some(
      (character) => character.id === Number(id)
    );
    if (characterShown) {
      window.alert("El personaje ya se encuentra renderizado en tu lista!");
      return;
    }

    // axios(`http://localhost:3001/rickandmorty/character/${id}`).then(
    //   ({ data }) => {
    //     if (data.name) {
    //       setCharacters((oldChars) => [...oldChars, data]);
    //     } else {
    //       window.alert("¡No hay personajes con este ID!");
    //     }
    //   }
    // );
    try {
      const { data } = await axios(
        `http://localhost:3001/rickandmorty/character/${id}`
      );

      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        alert("¡No hay personajes con este ID!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClose = (id) => {
    setCharacters(
      characters.filter((char) => {
        return char.id !== Number(id); //el filter retorna un array con todos los elementos distintos al id pasado como argumento.
      })
    );
  };

  //genero character random
  const generateRandomCharacter = () => {
    let randomID = Math.floor(Math.random() * 826) + 1;
    //check local state of characters to see if the id already exists in the array
    const characterExists = characters.some(
      (character) => character.id === randomID
    );
    //if it exists it generates a new random character using recursion
    if (characterExists) {
      return generateRandomCharacter();
    }
    //if the generated id is now shown it returns it
    return randomID;
  };
  // randomize function that will be given by props to the button on the nav component
  const randomize = () => {
    let randomID = generateRandomCharacter();
    onSearch(randomID);
  };
  //genero character random*/

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  return (
    <div className="App">
      {pathname === "/home" ||
      pathname === "/favorites" ||
      pathname === "/about" ? (
        <Nav randomize={randomize} onSearch={onSearch} />
      ) : null}

      <Routes>
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Form login={login} />} />
      </Routes>
    </div>
  );
};

export default App;
