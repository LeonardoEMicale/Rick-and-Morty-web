export default (data) => {
    let errors = {};
    if(!/\S+@\S+\.\S+/.test(data.email)) {
        errors.e1 = 'Email inválido'
    };
    if(!data.email) {
        errors.e2 = 'Ingresa tu email'
    };
    if(data.email.length > 35) {
        errors.e3 = 'Carácteres máximos 35'
    };
    if(!/\d/.test(data.password)) {
        errors.p1 = 'La contraseña debe tener al menos 1 número'
    };
    if(data.password.length < 6 || data.password.length > 10) {
        errors.p2 = 'La contraseña debe tener entre 6 y 10 caracteres'
    }
    return errors;
};