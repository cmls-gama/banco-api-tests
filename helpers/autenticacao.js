const request = require('supertest');
const postLogin = require('../fixtures/postLogin.json')

const obterToken = async(usuario, senha) => {
     const bodyLogin = {...postLogin}
     const respostaLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json') //setando o cabeçalho para a requisição
        .send(bodyLogin)

    return respostaLogin.body.token
}

module.exports = {
    obterToken
}