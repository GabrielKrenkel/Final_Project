const router = require("express").Router();
const empresasControllers = require("../controllers/empresaControllers");


router.get("/", empresasControllers.getTodasEmpresa);
router.get("/:id", empresasControllers.getCorp);
router.get("/funcionario/:id", empresasControllers.getTicket);

module.exports = router;