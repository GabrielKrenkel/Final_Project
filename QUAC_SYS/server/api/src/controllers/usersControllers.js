const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { User, Empresa } = require("../db/models");

async function createUser(req, res, next) {

    const { nameRegister, emailRegister, phoneRegister, passwordRegister } = req.body;     
    try {
        const create = await Empresa.findOne({ 
            where: {
                email: emailRegister
            }
        })
        
        if (create) {
            throw new createHttpError(409, "User already exists");
        }

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

        if (!user) {
            throw new createHttpError(404, "not foun user")
        }
        res.json(user);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function findOneUser(req, res, next) {

    const user = req.headers.authorization;

    const [, token] = user.split(" ");

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    try {        

        const userId = payload.sub

        let user = await User.findOne({ where: { id: userId }});


        if (!user) {
            user = await Empresa.findOne({ where: {id: userId }})
        }

        if (!user) {
            throw new createHttpError(404, "not foun user")
        }
        
        res.json(user);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function findUser(req, res, next) {

    const userId = req.params.id;
    
    try {        
        const user = await User.findOne({ where: { id: userId }});

        res.json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    createUser,
    getUser,
    findUser,
    findOneUser
}