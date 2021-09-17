const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de requisição
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log("Servidor está rodando na porta: " + PORT));