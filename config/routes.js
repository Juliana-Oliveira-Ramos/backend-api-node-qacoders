const express = require('express');
const port = require('./routes')

module.exports = function(server){
    const protectedApi = express.Router();//controla a rota e as requisicoes get,post....
    server.use("/api",protectedApi);

    server.use("/status",(req,res)=>//verifica s e manda a mensagem se o backend esta funcionando
    res.send('BACKEND is runner.')
    );

    const register = require('../api/registerService')
    register.register(protectedApi, 'register')//edpopint

    server.use(express.static(require("path").join(__dirname, "../public")))
}
