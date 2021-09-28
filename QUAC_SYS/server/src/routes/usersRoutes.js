const router = require("express").Router();
const { createUser } = require("../controllers/usersControllers");
const ticketControllers = require("../controllers/ticketControllers");


router.post("/", createUser);
router.post("/:id", ticketControllers.retirarTicket)
router.delete("/:id", ticketControllers.deleteTicket)
router.get("/:id", ticketControllers.verUltimaSenha)

module.exports = router;