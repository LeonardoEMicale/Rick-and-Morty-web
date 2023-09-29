import styles from "./Form.module.css";
import { useState } from "react";
import validation from "./validation";
import { Link } from 'react-router-dom';


const Form = ({ login }) => {
  
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setErrors(
      validation({ ...userData, [event.target.name]: event.target.value })
    );
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(userData);
  };

  return (
    <div className={styles.Form}>
      <form className={styles.login} >
        <br />
        <div>
          <label htmlFor="login">Welcome, please login to continue to Rick and Morty</label>
          <br />
          <br />
          <input
            onChange={handleChange}
            value={userData.email}
            name="email"
            placeholder="Email"
            type="text"
          />
          {errors.e1 ? (
            <p>{errors.e1} </p>
          ) : errors.e2 ? (
            <p>{errors.e2} </p>
          ) : (
            <p>{errors.e3} </p>
          )}
        </div>
        <br />
        <div>
          <input
            onChange={handleChange}
            value={userData.password}
            name="password"
            placeholder="Password"
            type="text"
          />
          {errors.p1 ? <p>{errors.p1} </p> : <p>{errors.p2} </p>}
        </div>
        <div className={styles.buttons}>
        <button onClick={handleSubmit}>Login</button>
        <Link to='/register'>
        <button>Create account</button>
        </Link>
        </div>
      </form>
    </div>
  );
};

export default Form;
