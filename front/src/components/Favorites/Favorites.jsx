import { connect, useDispatch} from "react-redux";
import Card from '../Card/Card'
import { filterCards, orderCards } from "../../redux/action";
import { useState } from "react";
import styles from './Favorites.module.css'


const Favorites = ({myFavorites}) => {

const [aux, setAux] = useState(false)

const dispatch = useDispatch()

const handleOrder = (event) => {
    dispatch(orderCards(event.target.value))
    setAux(!aux)
};
const handleFilter = (event) => {
    dispatch(filterCards(event.target.value))
};

    return(
        <div className={styles.container}>
            
            <div className={styles.selects}>
            <select onChange={handleOrder}>
            <option value="A">Ascendente</option>
            <option value="D">Descendente</option>
            </select>
            <select onChange={handleFilter}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Genderless">Genderless</option>
                <option value="unknown">unknown</option>
                <option value="allCharacters">allCharacters</option>
            </select>
            </div>
            
            <div className={styles.card}>
            {
            myFavorites?.map(({id, name, status, species, gender, origin, image, onClose}) => {
                return(
                    <Card
                    key={id}
                    id={id}
                    name={name}
                    status={status}
                    species={species}
                    gender={gender}
                    origin={origin}
                    image={image}
                    onClose={onClose}
                    />
                    )
            })
            }
        </div>
        
        </div>
    )
};


const mapStateToProps = (state) => {
    return {
        myFavorites: state.myFavorites,
    }
};

  
export default connect(mapStateToProps, null)(Favorites);