const router = require("express").Router();
const usersControllers = require("../controllers/usersControllers");
const ticketControllers = require("../controllers/ticketControllers");


router.post("/", usersControllers.createUser);
router.get("/", usersControllers.findOneUser);

router.get("/:id", usersControllers.findUser);


module.exports = router;