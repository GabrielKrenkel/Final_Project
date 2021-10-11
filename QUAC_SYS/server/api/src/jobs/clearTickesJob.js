const { Ticket } = require("../db/models");

module.exports = async () => {
    try {
        await Ticket.destroy({ truncate: true });
        console.log("Tickets apagados");
    } catch (err) {
        console.log(err);
    }    
}