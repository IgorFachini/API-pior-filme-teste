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

Clonar o projeto

```bash
git clone https://github.com/IgorFachini/API-pior-filme-teste.git
```

Todo os comandos executar na raiz do projeto

## JSON esperado de retorno

```json
{
    "min": [
        {
            "producer": "Matthew Vaughn",
            "previousWin": 2002,
            "followingWin": 2003,
            "interval": 1
        },
        {
            "producer": "Joel Silver",
            "previousWin": 1990,
            "followingWin": 1991,
            "interval": 1
        }
    ],
    "max": [
        {
            "producer": "Matthew Vaughn",
            "previousWin": 1980,
            "followingWin": 2002,
            "interval": 22
        },
        {
            "producer": "Matthew Vaughn",
            "previousWin": 2015,
            "followingWin": 2037,
            "interval": 22
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


Ao adicionar as linhas abaixo ao arquivo de dados fornecido juntamente com o teste o sistema deve apresentar dois resultados min com intervalo igual a 1 e dois resultados max com intervalo igual a 22: