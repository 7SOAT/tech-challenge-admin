<h1 align="start"> Microsserviço de autenticação para acesso as rotas </h1>

### Coverage:
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=7SOAT_tech-challenge-admin&metric=coverage)](https://sonarcloud.io/summary/new_code?id=7SOAT_tech-challenge-admin)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=7SOAT_tech-challenge-admin&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=7SOAT_tech-challenge-admin)

<h2 id="sobre-o-projeto">Sobre o microsserviço de autenticação</h2>

<p align="justify">
  Este microsserviço foca na parte de autenticação de um token para as chamadas dentro das rotas de produtos.
</p>


<h2>🏗️ Estrutura do projeto</h2>

```
src
├── adapters
|   ├── controllers
|   ├── gateways
|   ├── presenters
├── api
|   ├── config
|   ├── dtos
|   ├── routes
|   ├── validators
├── core
|   ├── entities
|   ├── enums
|   ├── usecases
├── externals
|   ├── datasource
|     ├── typeorm
├── package
|   ├── interfaces
|   ├── models
├── app.module.ts
├── bootstrap.ts
└── main.ts
├── tests
|  ├── auth-interceptor
|  ├── controller
|  ├── features
|  ├── routes
└──├─── usecases
```

<h2 id="requisitos"> ⚙️ Rodando o projeto</h2>

<ol start="1">
  <li>
    <h3>Clonando o repositório</h3>

    git clone https://github.com/7SOAT/tech-challenge-admin.git
    cd tech-challenge-admin
  </li>
  <li>
    <h3>Instalar bibliotecas</h3>
    <p>Para instalar as bibliotecas, abra o terminal na raiz do projeto e execute o seguinte comando:</p>

    npm install
  </li>
  <li>
    <h3>Rodar instâncias no Docker</h3>
    <p>Para rodar as instâncias do banco e da aplicação no Docker, a maneira mais simples é utilizar a extensão do VSCode, explicada no gif abaixo:</p>
    <img src="https://code.visualstudio.com/assets/docs/containers/overview/select-subset.gif">
    <p>Ou se preferir pode ser feito pelo terminal com:</p>
    <p> - Para windows:</p>

      docker-compose up --build

   <p> - Para Linux/macOS</p>

     docker compose up --build


  <li>
    <h3>Testar aplicação</h3>
    <p>Execute o seguinte comando para fazer os testes com coverage do microsserviço:</p>

    jest --coverage
  </li>

  </li>
</ol>


<h2 id="requisitos"> 👤 Integrantes</h2>

[<img src="https://avatars.githubusercontent.com/u/76217994?v=4" width=115 > <br> <sub> Aureo Alexandre </sub>](https://github.com/Aureo-Bueno) | [<img src="https://avatars.githubusercontent.com/u/97612275?v=4" width=115 > <br> <sub> Fauze Cavalari </sub>](https://github.com/devfauze) | [<img src="https://avatars.githubusercontent.com/u/53823656?v=4" width=115 > <br> <sub> Gabriella Andrade </sub>](https://github.com/GabiAndradeD) | [<img src="https://avatars.githubusercontent.com/u/61785785?v=4" width=115 > <br> <sub> Luiz H. L. Paino </sub>](https://github.com/luizhlpaino) |
| :---: | :---: | :---: | :---: |

