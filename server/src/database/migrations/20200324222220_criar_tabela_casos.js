exports.up = function (knex) {
	return knex.schema.createTable('cso_caso', tabela => {
		tabela.increments('cso_id')
		tabela.string('cso_titulo').notNullable()
		tabela.string('cso_descricao').notNullable()
		tabela.decimal('cso_valor').notNullable()
		
		// relacionamento com a tabela ong_ong
		tabela.string('ong_id').notNullable()
		tabela.foreign('ong_id').references('ong_id').inTable('ong_ong')
	})
}

exports.down = function (knex) {
	// deleta a tabela cso_caso
	return knex.schema.dropTable('cso_caso')
}
