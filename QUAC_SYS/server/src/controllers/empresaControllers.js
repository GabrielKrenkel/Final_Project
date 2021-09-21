const createHttpError = require("http-errors");
const { Empresa } = require("../db/models")


async function CadastrarEmpresa(req, res, next) {
    const { nome, endereco, latitude, longitude, horario_atendimento, numero_contato, email, password } = req.body;     
    try {        
        const [empresa, created] = await Empresa.findOrCreate({
            where: {
                email
            },
            defaults: { nome, endereco, latitude, longitude, horario_atendimento, numero_contato, email, password, role: "moderador" }
        });

        if (!created) {
            throw new createHttpError(409, "Empresa já existe!");
        }

        res.status(201).json(empresa);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function getEmpresa(req, res, next) {
    const empresaId = res.locals.userId;

    try {        
        const empresa = await User({ where: { id: empresaId }});

        res.json(empresa);
    } catch (error) {
        console.log(error);
        next(error);
    }
}


module.exports = {
    CadastrarEmpresa,
    getEmpresa
}