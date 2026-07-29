const request = require('supertest');
const {expect} = require('chai');
require('dotenv').config() //biblioteca que busca as variaveis configuradas no arquivo .env
const {obterToken} = require('../helpers/autenticacao')
const postTransferencias = require ('../fixtures/postTransferencias.json')

describe('Transferencias',() =>{
    let token //para usar essa variavel em todo o código para não travar apenas dentro do beforeEach
        
        beforeEach(async() => {
            token = await obterToken('julio.lima', 123456);
        }) //dentro do before it só tem a função anonima,//Capturar o token do helpers

    describe('POST/transferencias', ()=>{
        
        it ('Deve retornar sucesso com 201 quando valor da transferencia for igual ou acima de R$ 10,00 ', async()=>{
            const bodyTransferencias = { ...postTransferencias}

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                //enviando o token junto com a requisição.
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)

                    //Fazendo validações com o CHAI
                expect(resposta.status).to.equal(201);

        })

        it ('Deve retornar falha com 422 quando valor da transferencia for abaixo de R$ 10,00 ', async()=>{
            const bodyTransferencias = { ...postTransferencias}
            bodyTransferencias.valor = 7

            const resposta = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                //enviando o token junto com a requisição.
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)

                    //Fazendo validações com o CHAI
                expect(resposta.status).to.equal(422);

        })
        

    })

    describe('GET/transferencias/{id}', ()=>{ //esse describe é só um texto para aparecer em relatórios
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferencia contido no banco de dados, quando o ID for válido', async() => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/13')
                .set('Authorization', `Bearer ${token}`)
            
            
                expect(resposta.status).to.equal(200)//Expect vem da biblioteca chai assertion library, para fazer asserções
                expect(resposta.body.id).to.equal(13) // Esse expect valida a igualdade do valor
                expect(resposta.body.id).to.be.a('number') // Esse valida a tipagem do valor
                expect(resposta.body.conta_origem_id).to.equal(1)
                expect(resposta.body.conta_destino_id).to.equal(2)
                expect(resposta.body.valor).to.equal("11.00")

        })
    })
    describe ('GET/transferencias', ()=>{
        it('Deve retornar 5 elementos na páginação quando informar o limite de 5 registros',async()=>{
            const resposta = await request(process.env.BASE_URL) //request aqui é do SUPERTEST
                .get ('/transferencias?page=1&limit=5')
                .set ('Authorization', `Bearer ${token}`)

            expect (resposta.status).to.equal(200)
            expect (resposta.body.limit).to.equal(5)
            expect (resposta.body.transferencias).to.have.lengthOf(5)//quando tiver vetores [] utiliza o to.have segundo a biblioteca do CHAI
        } )
    })

    describe ('DELETE/transferencias/{id}', ()=>{
        it('Deve deletar a transferencia informada no id',async()=>{
            const respostaGet = await request(process.env.BASE_URL) //request aqui é do SUPERTEST
                .get('/transferencias?page=1&limit=1')
                .set('Authorization', `Bearer ${token}`)

            expect(respostaGet.status).to.equal(200)
            expect(respostaGet.body.transferencias).to.be.an('array').that.is.not.empty

            const idTransferencia = respostaGet.body.transferencias[0].id

            const respostaDelete = await request(process.env.BASE_URL) //request aqui é do SUPERTEST
                .delete(`/transferencias/${idTransferencia}`)
                .set('Authorization', `Bearer ${token}`)

            expect(respostaDelete.status).to.equal(204)
        } )
    })

})