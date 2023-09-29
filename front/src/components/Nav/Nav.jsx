import SearchBar from '../SearchBar/SearchBar'
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = ({onSearch, randomize}) => {
    return(
        <div className={styles.Nav}>

            <div className={styles.NavButtons}>
                <NavLink to='/about'>
                    <button>About</button>
                </NavLink>
            
                <NavLink to='/home'>
                    <button>Home</button>
                </NavLink>

                <NavLink to='/favorites'>
                    <button>Favoritos</button>
                </NavLink>

                <NavLink to="/">
                    <button>Logout</button>
                </NavLink>
            </div>    

            <div className={styles.SearchBar}>
                <SearchBar onSearch={onSearch} />
                    <button className={styles.randomize} onClick={randomize}>Random</button>
            </div>

        </div>
    )
};

export default Nav;