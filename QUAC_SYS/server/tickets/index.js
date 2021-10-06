const { Server } = require("socket.io")

const io = new Server({ cors: { origin: "http://localhost:3000" } });

const tickets = [
    { empresaId: 1, currentTicket: 2 }
]

io.on("connection", socket => {
    console.log("Novo usuário conectado");

    socket.on("join queue", empresaId => {
        socket.join(`empresa:${empresaId}`);
        console.log(socket.rooms);

        const currentTicket = tickets.find(ticket => ticket.empresaId === empresaId)?.currentTicket;

        if (currentTicket) {
            socket.emit("current ticket", )
        }        
    });

    socket.on("next ticket", currentTicket => {
        console.log(currentTicket)
        io.to(`empresa:${currentTicket.empresa_id}`).emit("next ticket", currentTicket);

        // Atualizar o ticket atual no vetor de tickets
    });

    socket.on("disconnect", () => {
        console.log("Usuário desconectou");        
    });
});

io.listen(8080);