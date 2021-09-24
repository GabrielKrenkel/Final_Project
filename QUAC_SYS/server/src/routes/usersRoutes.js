const router = require("express").Router();
const { createUser } = require("../controllers/usersControllers");

router.post("/", createUser);


module.exports = router;