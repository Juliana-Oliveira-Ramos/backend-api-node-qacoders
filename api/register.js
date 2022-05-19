//arquivo onde é a nossa model, model = é o contrato, contem dados que vao estar no front,recebe os dados do cadastro
const { model } = require('mongoose')//tratamento de mensagens 
const beautifulUnique = require('mongoose-beautiful-Unique-validation')//dependencia do mongo que valida as mensagens e tratamento das mensagens  
const restful = require('node-restful')//dependencia e tipos de requisicao que vamos fazer 
const mongoose = restful.mongoose//importando no moogosse a dependencia rest
    
//nossa model e sao os campos que teriam na tela e aqui tmbm desenvolve o front 
const registerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    mail: { type: String, required: true },
    phone: { type: String, required: false },
    address: { type: String, required: true },
    number: { type: Number, required: false },
    complement: { type: String, required: false }
 })
 
 registerSchema.plugin(beautifulUnique)
 
 module.exports = restful.model('Register', registerSchema )//exportando a model register que recebe os dados da model registerschema