const router = require("express").Router();
const ticketControllers = require("../controllers/ticketControllers");

router.post("/:id", ticketControllers.retirarTicket)
router.delete("/:id", ticketControllers.deleteTicket)

router.get("/local/:id", ticketControllers.findLastTicket)
router.put("/funcionario/:id/:numTicket", ticketControllers.getTicket);

router.get("/next/:id", ticketControllers.getNotVerifi)

router.get("/last/:id", ticketControllers.getVerifi)

module.exports = router;