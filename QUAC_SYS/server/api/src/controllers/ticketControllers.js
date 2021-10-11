const createHttpError = require("http-errors");
const { Ticket, sequelize } = require("../db/models");
const { QueryTypes } = require("sequelize");
const ms = require("ms");

async function retirarTicket(req, res, next) {

    const empresa_id = req.params.id
    const expirationTime = Date.now() + ms(process.env.TICKET_EXPIRATION);
    const { userId } = req.body

    console.log(empresa_id);
    try {
        // Obter o último ticket
        const lastTicket = await Ticket.findOne({
            where: { empresa_id },
            order: [              
              [sequelize.fn('max', sequelize.col('ticket')), 'DESC'],
            ],
            group: "id"
        });

        console.log(lastTicket);

        let ticket;
        if (!lastTicket) {
            ticket = await Ticket.create({ empresa_id, user_id: userId, expirationTime, ticket: 1});
        } else {
            ticket = await Ticket.create({ empresa_id, user_id: userId, expirationTime, ticket: lastTicket.ticket + 1});
        }

        res.status(201).json(ticket);

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

async function findLastTicket(req, res, next){

    const userId = req.params.id

    try {
        const lastTicket = await Ticket.findOne({
            where: { user_id: userId },
            order: [              
              [sequelize.fn('max', sequelize.col('ticket')), 'DESC'],
            ],
            group: "id"
        });

        res.status(202).json(lastTicket)
    } catch (err) {
        console.log(err);

        next(err)
    }
}
module.exports = {
    retirarTicket,
    deleteTicket,
    findLastTicket
}

