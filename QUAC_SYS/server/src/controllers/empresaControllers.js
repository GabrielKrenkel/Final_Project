const createHttpError = require("http-errors");
const { Empresa, Ticket } = require("../db/models")


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

async function getTicket(req, res, next) {
    
    const empresaId = req.params.id
    const numTicket = req.params.numTicket

    try {
        
        const allTickets = await Ticket.findOne( 
            {
                where: {
                    empresa_id: empresaId,
                    ticket: numTicket 

                }
            })

        res.status(200).json(allTickets)
        
    } catch (err) {
        console.log(err);

        next(err)
    }

}



module.exports = {
    getTodasEmpresa,
    getCorp,
    getTicket
}

