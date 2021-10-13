const router = require("express").Router();
const empresasControllers = require("../controllers/empresaControllers");


router.get("/", empresasControllers.getTodasEmpresa);
router.get("/:id", empresasControllers.getCorp);


module.exports = router;