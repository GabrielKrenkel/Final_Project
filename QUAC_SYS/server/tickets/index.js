const { Server } = require("socket.io")

const io = new Server({ cors: { origin: "http://localhost:3000" } });

let tickets = []

io.on("connection", socket => {
    console.log("Novo usuário conectado");

    socket.on("join queue", empresaId => {

        socket.join(`empresa:${empresaId}`);
        
        const lastTicket = tickets.find(ticket => ticket.empresa == empresaId)

        console.log(lastTicket);

        if (lastTicket) {
            socket.emit("current ticket", lastTicket)
        } 
        
    });

    socket.on("create queue", empresaId => {
        socket.join(`empresa:${empresaId}`)

        let fila = {empresa: empresaId, currentTicket: 0, userId:''}

        const verifica = tickets.find(ticket => ticket.empresa === empresaId)?.empresa

        if (!verifica) {
            tickets.push(fila)

            console.log("fila criada");
        }
    })

    socket.on("next ticket", currentTicket => {

        console.log(currentTicket, "index ticket")
        
        io.to(`empresa:${currentTicket.empresa_id}`).emit("next ticket", currentTicket);

        // Atualizar o ticket atual no vetor de tickets
        tickets = tickets.map(ticket => {
            if(ticket.empresa === currentTicket.empresa_id){
                ticket.currentTicket = currentTicket.ticket
                ticket.userId = currentTicket.user_id
            }

            return ticket
        })

    });
    
    socket.on("disconnect", () => {
        console.log("Usuário desconectou");   
    });

    
});

io.listen(8080);