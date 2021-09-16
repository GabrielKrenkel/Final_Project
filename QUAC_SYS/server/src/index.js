const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de requisição
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/usersRoutes"));
app.use("/admins", require("./routes/adminsRoutes"));
app.use("/devs", require("./routes/devsRoutes"));

// Middleware de tratamento de erros
app.use(require("./middlewares/errorMiddleware"));

app.listen(PORT, () => console.log("Servidor está rodando na porta: " + PORT));