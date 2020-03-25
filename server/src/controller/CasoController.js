const conexao = require('./../database/conexao')
const LIMITE_POR_PAGINA = 5


module.exports = {
	async index(request, response) {
		const {page = 1} = request.query
		const pontoInicial = (page - 1) * LIMITE_POR_PAGINA
		
		const casos = await conexao('cso_caso')
			.select('*')
			.join('ong_ong', 'ong_ong.ong_id', '=', 'cso_caso.ong_id')
			.limit(LIMITE_POR_PAGINA)
			.offset(pontoInicial)
		
		const [totalDeRegistros] = await conexao('cso_caso').count()
		response.header('X-Total-Count', totalDeRegistros['count(*)'])
		
		return response.json(casos)
	},
	
	async cadastrar(request, response) {
		const { cso_titulo, cso_descricao, cso_valor } = request.body
		const ong_id = request.headers.authorization
		
		const [cso_id] = await conexao('cso_caso').insert({cso_titulo, cso_descricao, cso_valor, ong_id})
		
		return response.json({cso_id})
	},
	
	async deletar(request, response) {
		const { id } = request.params
		const ong_id = request.headers.authorization
		
		const caso = await conexao('cso_caso')
			.where('cso_id', id)
			.select('ong_id')
			.first()
		
		if (caso) {
			if (caso.ong_id !== ong_id) {
				return response.status(401).json('Operação não permitida')
			}
		} else {
			return response.status(404).json('Caso não encontrado')
		}
		
		await conexao('cso_caso').where('cso_id', id).delete()
		
		return response.status(204).send()
	}
}