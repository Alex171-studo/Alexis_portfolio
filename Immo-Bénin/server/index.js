// server/index.js

const express = require('express')
const http = require("http")
const {Server} = require("socket.io")

const app = express();

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000", // Assure-toi que c'est bien l'origine de ton client Next.js
        methods:["GET","POST"]
    }
})

// Garde une trace des utilisateurs en train de taper
const typingUsers = new Set();

io.on('connection',(socket) =>{
    console.log('Utilisateur connecté: ',socket.id);

    // Lorsqu'un client envoie un message
    socket.on('sendMessage',(data) =>{
        console.log("Message reçu de :",data.senderId,": ",data.text);
        io.emit('receiveMessage',data); // Diffuse le message à tous les clients
        console.log("Message diffusé à tous ", data.text);

        // Si l'utilisateur tapait, assure-toi de le retirer de la liste des "typingUsers"
        // et d'informer les autres qu'il a arrêté de taper
        if (typingUsers.has(socket.id)) {
            typingUsers.delete(socket.id);
            io.emit('typingStatus', Array.from(typingUsers)); // Met à jour le statut de frappe pour tous
        }
    });

    // Lorsqu'un client commence à taper
    socket.on('typing',() =>{
        if (!typingUsers.has(socket.id)) {
            typingUsers.add(socket.id);
            io.emit('typingStatus', Array.from(typingUsers)); // Envoie la liste mise à jour des utilisateurs qui tapent
            console.log('Utilisateur en train de taper ajouté:', socket.id);
        }
    });

    // Lorsqu'un client arrête de taper
    socket.on('stopTyping',() =>{
        if (typingUsers.has(socket.id)) {
            typingUsers.delete(socket.id);
            io.emit('typingStatus', Array.from(typingUsers)); // Envoie la liste mise à jour des utilisateurs qui tapent
            console.log('Utilisateur en train de taper retiré:', socket.id);
        }
    });


    socket.on('disconnect',() =>{
        console.log("Un utilisateur s'est déconnecté",socket.id);
        // Assure-toi de retirer l'utilisateur déconnecté de la liste des "typingUsers"
        if (typingUsers.has(socket.id)) {
            typingUsers.delete(socket.id);
            io.emit('typingStatus', Array.from(typingUsers)); // Met à jour le statut de frappe pour tous
        }
    });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT,()=>{
console.log("Serveur de messagerie en écoute sur le port ",PORT);
});
