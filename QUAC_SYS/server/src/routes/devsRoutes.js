const router = require("express").Router();
const empresasControllers = require("../controllers/devsControllers");

router.post("/", empresasControllers.cadastrarEmpresa);
router.put("/:id", empresasControllers.editEmpresa)
router.delete("/:id", empresasControllers.deleteEmpresa);

module.exports = router;