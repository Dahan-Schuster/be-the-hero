const generateUniqueId = require('../utils/generateUniqueId')
const conexao = require('./../database/conexao')

module.exports = {
    async index(request, response) {
        const ongs = await conexao('ong_ong').select('*')
        return response.json(ongs)
    },

    async cadastrar(request, response) {
        const { ong_nome, ong_email, ong_whatsapp, ong_cidade, ong_uf } = request.body
        const ong_id = generateUniqueId()

        await conexao('ong_ong').insert({
            ong_id,
            ong_nome,
            ong_email,
            ong_whatsapp,
            ong_cidade,
            ong_uf,
        })

        return response.json({ ong_id })
    },
}