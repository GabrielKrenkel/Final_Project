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

async function editEmpresa(req, res, next) {
    
    const empresaAtualizada = req.body;
    
    const idEmpresa = req.params.id

    try {

        const empresa = await Empresa.findOne({ where: { id: idEmpresa } });

        if (!empresa) throw new createError(404, "Empresa não encontrado!");

        Object.assign(empresa, empresaAtualizada);

        await empresa.save();
        
        res.status(201).json(empresaAtualizada);

    } catch (err) {

        console.log(err);

        next(err)
    }
}

async function deleteEmpresa(req, res, next) {

    const empresaId = req.params.id;

    try {

        const empresa = await Empresa.findOne({ where: { id: empresaId } })

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

module.exports = {
    cadastrarEmpresa,
    deleteEmpresa,
    editEmpresa
}