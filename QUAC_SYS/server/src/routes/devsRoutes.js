const router = require("express").Router();
const { CadastrarEmpresa } = require("../controllers/empresaControllers");
const empresaControllers = require("../controllers/empresaControllers");
const authentication = require("../middleware/authMiddleware");

router.post("/", CadastrarEmpresa);

router.get("/", authentication(["user", "moderador", "dev"], empresaControllers.getEmpresa));

module.exports = router;