const {User} = require('../DB_connection');

const postUsers = async (email, password) =>
await User.create({email, password});

const postUser = async (req, res) => {
    const {email, password} = req.body;
    const errors = [];

    const existingUser = await User.findOne({
        where: {
            email: email
        }
    });

    if(existingUser) {
        errors.push('Email already exist');
    }
    if(password < 5 || password > 10) {
        errors.push('Password must be between 5 and 10 characters');
    }
    
    if(errors.length > 0) {
        return res.status(400).json({errors});
    }

    try {
        const newUser = await postUsers(email, password);
        return res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

module.exports = postUser;