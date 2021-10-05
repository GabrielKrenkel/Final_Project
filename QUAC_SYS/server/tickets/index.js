const { server } = require("socket.io")

const io = new Server({ cors: { origin: "http://localhost:3000" } });

