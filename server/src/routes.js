const express = require('express')
const OngController = require('./controller/OngController')
const CasoController = require('./controller/CasoController')
const PerfilController = require('./controller/PerfilController')
const SessaoController = require('./controller/SessaoController')
const { celebrate, Segments, Joi } = require('celebrate')

const routes = express.Router()

// Login
routes.post('/sessao', celebrate({
    [Segments.BODY]: Joi.object().keys({
        ong_id: Joi.string().required()
    })
}), SessaoController.criar)


// Perfil
routes.get('/perfil', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), PerfilController.index)


// Ongs
routes.get('/ongs', OngController.index)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        ong_nome: Joi.string().required(),
        ong_email: Joi.string().required().email(),
        ong_whatsapp: Joi.string().required().min(10).max(11),
        ong_cidade: Joi.string().required(),
        ong_uf: Joi.string().required().length(2)
    })
}), OngController.cadastrar)


// Casos
routes.get('/casos', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), CasoController.index)

routes.post('/casos', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        cso_titulo: Joi.string().required(),
        cso_descricao: Joi.string().required(),
        cso_valor: Joi.number().required(),
    })
}), CasoController.cadastrar)

routes.delete('/casos/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        cso_id: Joi.number().required()
    })
}), CasoController.deletar)

module.exports = routes