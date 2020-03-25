// método responsável por executar a migration
exports.up = function (knex) {
	// cria a tabela ong_ong
	return knex.schema.createTable('ong_ong', tabela => {
		tabela.string('ong_id').primary()
		tabela.string('ong_nome').notNullable()
		tabela.string('ong_email').notNullable()
		tabela.string('ong_whatsapp').notNullable()
		tabela.string('ong_cidade').notNullable()
		tabela.string('ong_uf', 2).notNullable()
	})
}

// método responsável por lidar com erros na execução da migration
exports.down = function (knex) {
	// deleta a tabela ong_ong
	return knex.schema.dropTable('ong_ong')
}
