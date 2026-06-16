const request = require('supertest');
const {expect} = require('chai');
require('dotenv').config() //biblioteca que busca as variaveis configuradas no arquivo .env
const {obterToken} = require('../helpers/autenticacao')

describe('Transferencias',() =>{
    describe('POST/transferencias', ()=>{
        let token //para usar essa variavel em todo o código para não travar apenas dentro do beforeEach
        
        beforeEach(async() => {
            token = await obterToken('julio.lima', 123456);
        }) //dentro do before it só tem a função anonima,//Capturar o token do helpers

        it ('Deve retornar sucesso com 201 quando valor da transferencia for igual ou acima de R$ 10,00 ', async()=>{

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                //enviando o token junto com a requisição.
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 11,
                    token: ""                   
                    })

                    //Fazendo validações com o CHAI
                expect(resposta.status).to.equal(201);

        })

        it ('Deve retornar falha com 422 quando valor da transferencia for abaixo de R$ 10,00 ', async()=>{

            const resposta = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                //enviando o token junto com a requisição.
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 7,
                    token: ""                   
                    })

                    //Fazendo validações com o CHAI
                expect(resposta.status).to.equal(422);

        })
        

    })

})