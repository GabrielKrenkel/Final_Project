const router = require("express").Router();
const { createUser } = require("../controllers/usersControllers");
const usersControllers = require("../controllers/usersControllers");
const authentication = require("../middleware/authMiddleware");

router.post("/", createUser);

router.get("/", authentication(["user", "moderador", "dev"], usersControllers.getUser));

module.exports = router;