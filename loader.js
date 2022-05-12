//é aqui onde fica o inicio do projeto que vai ler quando for executado 
const server = require('./config/server') 
require('./config/routes')(server)