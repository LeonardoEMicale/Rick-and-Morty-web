  import { useState } from "react";
  import styles from './SearchBar.module.css'

  const SearchBar = ({onSearch}) => {
   const [id, setId] = useState("");

   const handleChange = (event) => {
      setId(event.target.value);
   }

   

   return (
      <div className={styles.SearchBar}>
         <input type='search' onChange={handleChange} value={id} />
         <button onClick={() => {onSearch(id)}}>Agregar</button>
      </div>
   );
}

export default SearchBar;