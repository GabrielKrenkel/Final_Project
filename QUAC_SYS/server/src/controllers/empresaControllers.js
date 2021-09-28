const createHttpError = require("http-errors");
const { Empresa } = require("../db/models")


async function getTodasEmpresa(req, res, next) {
    
    try {
        const empresa = await Empresa.findAll()

        res.json(empresa);

    } catch (err) {

        console.log(err);

        next(err);
    };
};



async function getCorp(req, res, next) {

    const empresaID = req.params.id;

    try {

        const empresa = await Empresa.findOne({ where: { id: empresaID } })

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
    getTodasEmpresa,
    getCorp
}