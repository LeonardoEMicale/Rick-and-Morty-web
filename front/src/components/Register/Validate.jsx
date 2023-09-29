const validate = (users) => {
    const errors = {};
if(!users.email || users.email.trim().length === 0) {
    errors.email = 'Email is required';
} else if (!/\S+@\S+\.\S+/.test(users.email)) {
    errors.email = 'Email is invalid';
}
if (!users.password || users.password.trim().length === 0) {
    errors.password = 'Password is required';
} else if (users.password.length > 10 || users.password.length < 5) {
    errors.password = 'Password must be between 5 and 10 characters';
}
return errors;
};

export default validate;