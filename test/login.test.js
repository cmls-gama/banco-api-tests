const request = require('supertest');
const {expect} = require('chai');
require('dotenv').config()

//describe Metodo do Mocha para descrever um agrupamento de testes.
//utilizando arrow function ()=>{}
describe ('Login',() => {
    describe ('POST /login', () => {
        it ('Deve retornar 200 com token em string quando usar credenciais válidas', async()=>{
            //Vai usar o SUPERTEST, para realizar uma requisição a API de login para retornar o TOKEN
            //Formas de fazer requisição com SUPERTEST
            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json') //setando o cabeçalho para a requisição
                .send({
                        'username': 'julio.lima',
                        'senha': '123456'
                    })

            //Fazendo validações com o CHAI
            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');

        })
    })
})