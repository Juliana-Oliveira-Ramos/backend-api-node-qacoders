//aqui fica configuraçoes de banco no projeto porque nosso banco est a instalado na maquina
const mongoose = require('mongoose')//const = variavel que recebe o objeto e nao muda.
const args = require('args-parser')(process.argv)
mongoose.Promise = require('bluebird')

if(args.production)//se passar algum comando no npm se for start vai apontar para o banco de produçao,
module.exports = mongoose.connect('mongodb://banco_qacoders:senha@servidor.com.br:27017/usuario' )//conexao com o banco
    
else  // e se  nao for conecta com o banco local    
    module.exports = mongoose.connect('mongodb://localhost:27017/banco_qacoders')
    
    //exibe a mensagem caso o usuario digite campos incorretos
    //as vantagens do mongoose é que vc passa as mensagens de erro se a regra de negocio
    mongoose.Error.messages.general.required =  "o campo '{PATH}' é obrigatorio. "
    mongoose.Error.messages.Number.min =  "o '{PATH}' informado é menor que limite minimo de '{MIN}'. "
    mongoose.Error.messages.Number.max =  "o '{PATH}' informado é maior que limite maximo de '{MAX} "
    mongoose.Error.messages.String.enum =  "o '{VALUE}' nao é valido para o campo '{PATH} "