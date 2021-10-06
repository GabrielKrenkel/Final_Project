const createHttpError = require("http-errors");
const { User } = require("../db/models");

async function createUser(req, res, next) {

    const { nameRegister, emailRegister, phoneRegister, passwordRegister } = req.body;     
    try {        
        const [user, created] = await User.findOrCreate({
            where: {
                email: emailRegister
            },
            defaults: { name: nameRegister, email: emailRegister, phone: phoneRegister, password: passwordRegister, role: "user" }
        });

        if (!created) {
            throw new createHttpError(409, "User already exists");
        }

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function getUser(req, res, next) {

    const userId = res.locals.userId;

    try {        
        const user = await User({ where: { id: userId }});

        res.json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}


module.exports = {
    createUser,
    getUser
}