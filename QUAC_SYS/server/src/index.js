const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3001;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

// Middlewares de requisição
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/empresas", require("./routes/devsRoutes"));

// Middleware de tratamento de erros
app.use(require("./middleware/errorMiddleware"));

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => console.log("Servidor está rodando na porta: " + PORT));