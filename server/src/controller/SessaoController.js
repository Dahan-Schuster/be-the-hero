const conexao = require('./../database/conexao')

module.exports = {
	async criar(request, response) {
		const {ong_id} = request.body
		const ong = await conexao('ong_ong')
			.where('ong_id', ong_id)
			.select('ong_nome')
			.first()
		
		if (!ong) {
			return response.status(404).json({
				error: 'Nenhuma ONG encontrada com o ID enviado'
			})
		}
		
		return response.json(ong)
	}
}