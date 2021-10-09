const router = require("express").Router();
const authControllers = require("../controllers/authControllers");
const empresaControllers = require("../controllers/empresaControllers");
const usersControllers = require("../controllers/usersControllers");
const authentication = require("../middleware/authMiddleware");


router.post("/login", authControllers.login);

router.get("/", authentication(["user", "moderador", "dev"], usersControllers.getUser));

router.post("/refreshToken", authControllers.refresh);

module.exports = router;