const router = require("express").Router();
const empresasControllers = require("../controllers/empresaControllers");

router.post("/", empresasControllers.cadastrarEmpresa);
router.get("/", empresasControllers.getTodasEmpresa);
router.delete("/:id", empresasControllers.deleteEmpresa);
router.get("/:id", empresasControllers.getCorp);

module.exports = router;