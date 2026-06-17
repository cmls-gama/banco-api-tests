[README.md](https://github.com/user-attachments/files/29059010/README.md)
# 🏦 Banco API Tests

> Projeto de automação de testes de API REST desenvolvido em JavaScript para validar os comportamentos da API Banco.

## Objetivo
Contribuindo para a qualidade dos endpoints da API por meio de testes automatizados, cobrindo cenários positivos e negativos, facilitando a detecção precoce de defeitos.

### Repositórios relacionados
- API: https://github.com/juliodelimas/banco-api
- Automação: https://github.com/cmls-gama/banco-api-tests

## Tecnologias
| Categoria | Ferramenta |
|---|---|
| Linguagem | JavaScript |
| Runtime | Node.js |
| Test Runner | Mocha |
| Requisições | SuperTest |
| Asserções | Chai |
| Configuração | Dotenv |
| Relatórios | Mochawesome |

## Pré-requisitos
- Node.js
- npm
- API Banco disponível localmente ou em ambiente acessível

## Instalação
```bash
git clone https://github.com/cmls-gama/banco-api-tests.git
cd banco-api-tests
npm install
```

## Configuração (.env)
Crie um arquivo `.env` na raiz:

```env
BASE_URL=http://localhost:3000
```

Exemplo:
- Local: `http://localhost:3000`
- Homologação: `https://minha-api.com`

## Executando os testes
```bash
npm test
```

Caso existam scripts adicionais:

```bash
npm run <nome-do-script>
```

## Relatórios
Após a execução, o Mochawesome gera relatórios HTML na pasta:

```text
mochawesome/
```

Abra o arquivo `.html` no navegador para consultar:
- Quantidade de testes
- Sucessos e falhas
- Tempo de execução
- Detalhes dos cenários

## Estrutura sugerida
```text
banco-api-tests/
├── tests/
├── fixtures/
├── helpers/
├── mochawesome/
├── package.json
├── package-lock.json
├── .env
└── README.md
```

## Documentação oficial
- Node.js: https://nodejs.org/docs/latest/api/
- Mocha: https://mochajs.org/
- SuperTest: https://github.com/forwardemail/supertest
- Chai: https://www.chaijs.com/
- Dotenv: https://github.com/motdotla/dotenv
- Mochawesome: https://github.com/adamgruber/mochawesome

## Benefícios
- Execução rápida e repetível
- Maior confiabilidade das APIs
- Evidências visuais através dos relatórios
- Facilidade para integração em pipelines CI/CD
