const createHttpError = require("http-errors");
const { Empresa } = require("../db/models")


async function cadastrarEmpresa(req, res, next) {
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

async function getTodasEmpresa(req, res, next) {
    try {        
        const empresa = await Empresa.findAll()

        res.json(empresa);

    } catch (err) {

        console.log(err);
        
        next(err);
    };
};

async function deleteEmpresa(req, res, next) {
    
    const empresaId = req.params.id;

    try {                

        const empresa = await Empresa.findOne( { where: { id: empresaId } } )

        if (!empresa) {

            throw new createHttpError(404, "Empresa não encontrada!");

        }

        await empresa.destroy();

        res.status(204).end();

    } catch (err) {

        console.log(err);

        next(err);
    };
}

async function getCorp(req, res, next) {
    
    const empresaID = req.params.id;

    try {
        
        const empresa = await Empresa.findOne( { where: { id: empresaID } } )

        if (!empresa) {

            throw new createHttpError(404, "Empresa não encontrada!");

        }

        res.json(empresa);

    } catch (err) {
        
        console.log(err);

        next(err)

    }
}


module.exports = {
    cadastrarEmpresa,
    getTodasEmpresa,
    getEmpresa,
    deleteEmpresa,
    getCorp
}