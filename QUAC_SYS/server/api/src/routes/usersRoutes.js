const router = require("express").Router();
const usersControllers = require("../controllers/usersControllers");
const ticketControllers = require("../controllers/ticketControllers");


router.post("/", usersControllers.createUser);
router.post("/:id", ticketControllers.retirarTicket)
router.delete("/:id", ticketControllers.deleteTicket)
router.get("/:id", usersControllers.findUser)
router.get("/local/:id", ticketControllers.findLastTicket)
module.exports = router;