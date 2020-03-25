const crypto = require('crypto')
const conexao = require('./../database/conexao')

module.exports = {
	async index(request, response) {
		const ongs = await conexao('ong_ong').select('*')
		return response.json(ongs)
	},
	
	async cadastrar(request, response) {
		const {ong_nome, ong_email, ong_whatsapp, ong_cidade, ong_uf} = request.body
		const ong_id = crypto.randomBytes(4).toString('HEX')
		
		await conexao('ong_ong').insert({
			ong_id, ong_nome, ong_email, ong_whatsapp, ong_cidade, ong_uf,
		})
		
		return response.json({ong_id})
	},
}