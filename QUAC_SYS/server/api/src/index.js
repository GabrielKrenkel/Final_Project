const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3001;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const cron = require("node-cron");

// Middlewares de requisição
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Rotas da API
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/ticket", require("./routes/ticketRoutes"))
app.use("/api/empresas", require("./routes/empresasRoutes"));
app.use("/api/developer", require("./routes/devsRoutes"))


// Middleware de tratamento de erros
app.use(require("./middleware/errorMiddleware"));

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

cron.schedule('0 0 0 * * *', require("./jobs/clearTickesJob"));

app.listen(PORT, () => console.log("Servidor está rodando na porta: " + PORT));