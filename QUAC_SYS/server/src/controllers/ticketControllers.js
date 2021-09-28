const createHttpError = require("http-errors");
const { Ticket } = require("../db/models")
const ms = require("ms");

async function retirarTicket(req, res, next) {

    const empresa_id = req.params.id

    const expirationtime = Date.now() + ms(process.env.TICKET_EXPIRATION);

    const {ticket} = req.body

    try {
        const [senha, created] = await Ticket.findOrCreate( { 
            where: {
                empresa_id: empresa_id
            },
            defaults: { empresa_id, expirationtime, ticket  }
        
        })
   
        if (!created) {
            throw new createHttpError(404, "Empresa não encontrada!")
        }
        
        res.status(201).json(senha);

    } catch (err) {

        console.log(err);

        next(err);
    }

    
}

async function deleteTicket(req, res, next) {

    const ticketId = req.params.id

    

    try {
        
        const senha = await Ticket.findOne({ where: { id: ticketId } })

        if (!senha) {

            throw new createHttpError(404, "Empresa não encontrada!");

        }

        await senha.destroy();

        res.status(204).end();

    } catch (err) {

        console.log(err);

        next(err)
    }
}


async function verUltimaSenha(req, res, next) {
    
    const empresaId = req.params.id

    try {
        
        let lastTicket = await Ticket.max("ticket", { where: { empresa_id: empresaId }})


        res.status(202).json(lastTicket)

    } catch (err) {

        console.log(err);

        next(err)
    }
}

module.exports = {
    retirarTicket,
    deleteTicket,
    verUltimaSenha
}

