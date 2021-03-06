const createHttpError = require("http-errors");
const { Ticket, sequelize } = require("../db/models");
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
            ticket = await Ticket.create({ verified: 0, empresa_id, user_id: userId, expirationTime, ticket: 1 });
        } else {
            ticket = await Ticket.create({ verified: 0, empresa_id, user_id: userId, expirationTime, ticket: lastTicket.ticket + 1 });
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

async function findLastTicket(req, res, next) {

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

async function getTicket(req, res, next) {

    const empresaId = req.params.id
    const numTicket = req.params.numTicket

    try {

        let allTickets = await Ticket.findOne({

            where: {
                empresa_id: empresaId,
                ticket: numTicket,
                verified: false
            }

        })

        if (!allTickets) {
            res.json(null)
        }
        allTickets.verified = true

        await allTickets.save()

        res.json(allTickets)

    } catch (err) {
        console.log(err);

        next(err)
    }

}

async function getNotVerifi(req, res, next) {

    const userId = req.params.id

    try {
        let lastTicket = await Ticket.min("ticket", { where: { verified: false, empresa_id: userId } })

        if (!lastTicket) {
            lastTicket = await Ticket.max("ticket", { where: { verified: true, empresa_id: userId } })
        }

        if (!lastTicket) {
            throw new createHttpError(404, "not found enterprise")
        }

        res.status(202).json(lastTicket)

    } catch (err) {
        console.log(err);

        next(err)
    }
}

async function getVerifi(req, res, next) {

    const userId = req.params.id

    try {
        const lastTicket = await Ticket.findOne({
            where: {
                verified: true,
                empresa_id: userId
            },
            order: [
                [sequelize.fn('max', sequelize.col('ticket')), 'DESC']
            ],
            group: "id"
        });


        if (!lastTicket) {
            throw new createHttpError(404, "not found enterprise")
        }

        console.log(lastTicket);

        res.status(202).json(lastTicket)

    } catch (err) {
        console.log(err);


        next(err)
    }
}

module.exports = {
    retirarTicket,
    deleteTicket,
    findLastTicket,
    getTicket,
    getNotVerifi,
    getVerifi
}

