const request = require('supertest');
const app = require('../../src/app')
const connection = require('../../src/database/conexao')


describe('ONG', () => {
    beforeEach(async() => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async() => {
        await connection.destroy()
    })

    it('should be able to create a new ONG', () => {
        return request(app)
            .post('/ongs')
            .send({
                ong_nome: "ONG",
                ong_email: "contato@email.com",
                ong_whatsapp: "79988888888",
                ong_cidade: "Aracaju",
                ong_uf: "SE"
            })
            .then(response => {
                expect(response.body).toHaveProperty('ong_id')
                expect(response.body.ong_id).toHaveLength(8)
            })
    })
})