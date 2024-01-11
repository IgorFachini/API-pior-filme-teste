# API-pior-filme-teste

Desenvolva uma API RESTful para possibilitar a leitura da lista de indicados e vencedores
da categoria Pior Filme do Golden Raspberry Awards.

# Requisito do sistema:
Ler o arquivo CSV dos filmes e inserir os dados em uma base de dados ao iniciar a
aplicação.

# Requisitos da API:

Obter o produtor com maior intervalo entre dois prêmios consecutivos, e o que
obteve dois prêmios mais rápido

# Endpoints
Existe apenas uma rota chamada ```/awards``` com metodo ```GET```

Acessar no [navegador](http://localhost:3000/awards) ou chamar de onde preferir

URL

```http://localhost:3000/awards```

# Instruções para execução
Todo os comandos executar na raiz do projeto

## JSON esperado de retorno

```json
{
    "min": [
        {
            "producer": "Joel Silver",
            "interval": 1,
            "previousWin": 1990,
            "followingWin": 1991
        }
    ],
    "max": [
        {
            "producer": "Matthew Vaughn",
            "interval": 13,
            "previousWin": 2002,
            "followingWin": 2015
        }
    ]
}
```
## Instalação
```bash
npm install
```

## Execução

Rodar o commando na raiz do projeto
```bash
npm start
```

## Testes

Rodar o commando na raiz do projeto
```bash
npm test
```
