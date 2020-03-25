const express = require('express')
const OngController = require('./controller/OngController')
const CasoController = require('./controller/CasoController')
const PerfilController = require('./controller/PerfilController')
const SessaoController = require('./controller/SessaoController')

const routes = express.Router()

routes.post('/sessao', SessaoController.criar)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.cadastrar)

routes.get('/casos', CasoController.index)
routes.post('/casos', CasoController.cadastrar)
routes.delete('/casos/:id', CasoController.deletar)

routes.get('/perfil', PerfilController.index)

module.exports = routes
