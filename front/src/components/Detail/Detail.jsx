import axios from "axios";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
//const URL_BASE = 'https://rym2-production.up.railway.app/api/character'
//const API_KEY = 'key=henrym-leonardoemicale'
import './Detail.css'

const Detail = () => {
  const [character, setCharacter] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios(`http://localhost:3001/rickandmorty/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      }
    );
    return setCharacter({});
  }, [id]);

  return (
    <div className='superdiv'>
      <Link to="/home">
      <button className="back-button">
            Back to Home
          </button>
      </Link>
    <div className='card-detail'>
      <img src={character.image && character.image} alt="" />
      <h1>Name: "{character.name && character.name}"</h1>
      <h1>Status: "{character.status && character.status}"</h1>
      <h1>Species: "{character.species && character.species}"</h1>
      <h1>Gender: "{character.gender && character.gender}"</h1>
      <h1>Origin: "{character.origin && character.origin?.name}"</h1>
    </div>
    </div>
  );
};

export default Detail;