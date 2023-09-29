import { useState } from 'react';
import style from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import validate from './Validate';

const Register = () => {

    const navigate = useNavigate()

    const [users, setUsers] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
       

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUsers({
            ...users,
            [name]: value
        })

        setErrors({
            ...errors,
            [name]: validate({...users, [name]: value})[name],
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validate(users);
        if(Object.keys(validationErrors).length === 0) {
        try {
            await axios.post("http://localhost:3001/rickandmorty/register", users);
            alert('User created succesfully');
            navigate('/');
        } catch (error) {
            alert(error.response.data.errors.join("\n"));
        }
    } else {
        setErrors(validationErrors)
    }
};

const isEmailValid = !errors.email && users.email.length !== 0;
const isPasswordValid = !errors.password && users.password.length !== 0;
const isFormValid = isEmailValid && isPasswordValid;

    return (
        <div className={style.registerContainer}>
            <div className={style.formContainer}>
                <form className={style.form} onSubmit={handleSubmit}>
            <h2 className={style.title}>Sign in to continue to Rick and Morty</h2>
                    <div className={style.userContainer}>
                        <input
                            type="text"
                            value={users.email}
                            onChange={handleChange}
                            name='email'
                            placeholder='Email'
                            className={isEmailValid ? style.success : null}
                        />
                        <span className={errors.email ? style.error : null}>
                            {errors.email}
                        </span>
                    </div>
                    <div className={style.emailContainer}>
                        <input
                            type="password" 
                            value={users.password}
                            onChange={handleChange}
                            name='password'
                            placeholder='Password'
                            className={isPasswordValid ? style.success : null}
                        />
                        <span className={errors.password ? style.error : null}>
                            {errors.password}
                        </span>
                    </div>
                    <div className={style.submit}>
                        <button 
                            type='submit'
                            disabled={!isFormValid}
                            className={isFormValid ? style.buttonEnabled : style.buttonDisabled}
                        >
                            Register
                        </button>
                        <Link to='/'>
                        <button className={style.login}>Login</button>
                        </Link>
                    </div>

                    
                    
                </form>
            </div>
        </div>
    );
};

export default Register;