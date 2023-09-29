import { NavLink } from 'react-router-dom';
import styles from './Card.module.css'
import {addFav, removeFav} from '../../redux/action.js'
import {connect} from 'react-redux'
import { useState, useEffect } from 'react';


const Card = ({id, name, status, species, gender, origin, image, onClose, addFav, removeFav, myFavorites}) => {
   
   const [isFav, setFav] = useState(false);
   const handleFavorite = () => {
      /*isFav ? removeFav(id) : addFav({id, name, status, species, gender, origin, image})
      setFav(!isFav);*/
      if(isFav) {
         removeFav(id);
      } else {
         addFav({id, name, status, species, gender, origin, image, onClose})
      };
      setFav(!isFav)
   };

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setFav(true);
         }
      });
   }, [myFavorites]);

   // <h2>Status: {status}</h2>
   // <h2>Species: {species}</h2>
   //<h2>Origin: {origin}</h2>
   return(
      <div className={styles.cardContainer}>
         <button onClick={()=> {onClose(id)}}>X</button>
         <NavLink className={styles.NavLink} to={`/detail/${id}`}>
         <img src={image} alt=""/>
         <h2>Name: {name}</h2>
         </NavLink>  
         <h2>Gender: {gender}</h2>
         {
            isFav ? (
               <button onClick={handleFavorite}>❤️</button>
               ) : (
               <button onClick={handleFavorite}>🤍</button>
               )
         }
      </div>
   )
};

const mapDispatchToProps = (dispatch) => {
   return {
   addFav: (character) => dispatch(addFav(character)),
   removeFav: (id) => dispatch(removeFav(id))
   }
};

const mapStateToProps = (state) => {
   return {
      myFavorites: state.myFavorites,
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);