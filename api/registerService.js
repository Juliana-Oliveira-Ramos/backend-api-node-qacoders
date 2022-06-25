const _ = require('lodash')
const Register = require('./register')
const fullNameRegex = /([A-Z])\w+/
const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const phoneRegex  = /^\ [+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[ - \s\./0-9]*$/
const addressRegex  = /^[a-zA-Z0-9\s\,\''\-]*$/
const numberRegex = /^[+-]?\d*\.\d+$|^[+-]?\d+(\.\d*)?$/
const complementRegex = /^[a-zA-Z0-9\s\,\''\-]*$/


Register.methods(['get', 'post', 'put', 'delete'])//passo uma lista de methodos, a api vai realizar os metodos get,post,put,delete
Register.updateOptions({ new: true, runValidators: true })//entender e mostrar os dados cadastrados atual

Register.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)//vai enviar os erros ou seguir em frente
Register.before('post', register).before('put', register)

function sendErrorsOrNext(req, res, next) {//verifica se a requisicao deu ok, se nao mensagem de erro e se sim next
  const bundle = res.locals.bundle //bundle faz p tratamento das mensagens dentro do express 
  
  if (bundle.errors) {//faz a requisicao e der erro o bundle que verifica e erro  e retorna o status 500  
    var errors = parseErrors(bundle.errors)
    res.status(500).json({ errors })
  } else {
     next()    
  }
}

function parseErrors(nodeRestfulErrors) {//funcao que  pega todas as mensagens de erro, e faz um push das mensagens, recebe uma lista de erros e coloca dentro do array
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

const sendErrorsFromDB = (res, dbErrors) => {//vamos criar um metodo para nao imprimir na tela  proteçao ao usuario
  const errors = []
  _.forIn(dbErrors.errors, error => errors.push(error.message))
  return res.status(400).json({ errors })
}

function register(req, res, next) {
  const fullName = req.body.fullName || ''  //campos do body 
  const mail = req.body.mail || ''
  const phone = req.body.phone || ''
  const address = req.body.address || ''
  const number = req.body.number || ''
  const complement = req.body.complement || ''


  if(fullName == null || fullName == "" ){
    return res.status(400).send({alert:["O campo Nome Completo é obrigatorio"]})
}

if(!fullName.match(fullNameRegex)){
    return res.status(400).send({alert:["Informe o nome e sobrenome"]})
}

if(mail == null || mail == "" ){
    return res.status(400).send({alert:["O campo Mail é obrigatorio"]})
}

if(!mail.match(mailRegex)){
    return res.status(400).send({alert:["Informe o Mail"]})

}

if(phone == null || phone == "" ){
    return res.status(400).send({alert:["O campo phone é obrigatorio"]})
}

if(!phone.match(phoneRegex)){
    return res.status(400).send({alert:["Informe o phone"]})
}

if(address == null || address == "" ){
    return res.status(400).send({alert:["O campo address é obrigatorio"]})
}

if(!address.match(addressRegex)){
    return res.status(400).send({alert:["Informe o address"]})
}


if(number == null || number == "" ){
    return res.status(400).send({alert:["O campo number é obrigatorio"]})
}

if(!number.match(numberRegex)){
    return res.status(400).send({alert:["Informe o number"]})
}


if(complement == null || complement == "" ){
    return res.status(400).send({alert:["O campo complement é obrigatorio"]})
}

if(!complement.match(complementRegex)){
    return res.status(400).send({alert:["Informe o complement"]})
}






  const newBody = new Register({
      fullName,
      mail,
      phone,
      address,
      number,
      complement
  })

  newBody.save(err => {
      if (err) {
          return sendErrorsFromDB(res, err)
      } else {
          res.status(201).json(newBody)
      }
  })
}

module.exports = Register