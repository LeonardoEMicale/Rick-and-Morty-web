import Card from '../Card/Card';
import styles from './Cards.module.css'

 const Cards = ({characters, onClose}) => {
   return(
      <div className={styles.Cards} >
        {
         characters.map(({id, name, status, species, gender, origin, image}) => {
            return(
            <Card
            id={id}
            key={id}
            name= {name} 
            status= {status}
            species= {species}
            gender= {gender}
            origin= {origin.name}
            image= {image}
            onClose={onClose}
            />
            )
         })
        }
      </div>
   )
}

export default Cards;


