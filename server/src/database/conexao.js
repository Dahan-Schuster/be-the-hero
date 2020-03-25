const knex = require('knex')
const config = require('../../knexfile')

const connexao = knex(config.development)

module.exports = connexao