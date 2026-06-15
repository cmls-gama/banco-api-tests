const request = require('supertest');
const {expect} = require('chai');

describe('Transferencias',() =>{
    describe('POST/transferencias', ()=>{
        it ('Deve retornar sucesso com 201 quando valor da transferencia for igual ou acima de R$ 10,00 ', async()=>{
            //Capturar o token
             const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json') //setando o cabeçalho para a requisição
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                    })

            const token = respostaLogin.body.token

            const resposta = await request('http://localhost:3000')
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
            //Capturar o token
             const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json') //setando o cabeçalho para a requisição
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                    })

            const token = respostaLogin.body.token

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