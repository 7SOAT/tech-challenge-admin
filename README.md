<p align="center">
  <img src="https://i.ibb.co/nM93Y6b/Novo-Projeto.png" alt="Pos-tech logo">
</p>
<h1 align="center">🍔🥤🍨 Sistema de autoatendimento de Fast Food 🍨🥤🍔</h1>

<h2 id="sobre-o-projeto"> :pencil: Sobre o projeto</h2>

<p align="justify">
  Esse projeto consiste na criação de um sistema back-end para controle de pedidos de fast food, visando resolver possíveis gargalos entre os atendentes e a cozinha de um restaurante. A solução contempla o processo de escolha do pedido pelo cliente, o pagamento, o acompanhamento das etapas de preparação e entrega.
</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
<h2>🎥 Vídeo de apresentação da estrutura e funcionamento</h2>

[<img src="https://cdn-icons-png.flaticon.com/512/4404/4404094.png" width=70>](https://drive.google.com/file/d/1dqtiporn2JohNH0ULhKmseoZUKHcd2DY/view?usp=drive_link)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2>🎥 Vídeo sobre infraestrutura em cloud (AWS)</h2>

[<img src="https://cdn-icons-png.flaticon.com/512/4404/4404094.png" width=70>](https://drive.google.com/drive/u/0/folders/13cednbUegCMEEQxIiqef6je6HTAj3qna)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2>📄 Documentação do projeto</h2>

[<img src="https://i.pinimg.com/originals/36/98/41/369841848d679cef173ae2b0f5ed6e39.png" width=115 >](https://miro.com/welcomeonboard/ZXM3dDZEMWNYazBaZEcxMDQ4UGFSOHRUVUZhcjJsTHZDVEJuMUhkeUl3d2ZnTndZUmhncUxRbEJlYVVxREN4b3wzNDU4NzY0NTg2NjE5MjYzNTE1fDI=?share_link_id=439093219851)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="requisitos"> 📃 Dependências</h2>

<p align="justify">
  Para rodar o projeto localmente, primeiro você precisa se certificas que possui essas ferramentas insaladas:
</p>

* [NodeJS e NPM](https://nodejs.org/en)
* [Docker](https://www.docker.com/products/docker-desktop/)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
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
|   ├── providers
├── package
|   ├── interfaces
|   ├── models
├── app.module.ts
├── bootstrap.ts
└── main.ts
```
![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
<h2 id="requisitos"> ⚙️ Rodando o projeto</h2>

<ol start="1">
  <li>
    <h3>Clonando o repositório</h3>

    git clone https://github.com/7SOAT/tech-challenge-monolith.git
    cd tech-challenge-monolith
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


  Disponível em <link>http://localhost:3000</link>

  </li>
  <li>Subindo a imagem, o projeto já estará pronto para receber requisições através do Postman ou Insomnia</li>
</ol>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="requisitos"> 👤 Integrantes</h2>

[<img src="https://avatars.githubusercontent.com/u/76217994?v=4" width=115 > <br> <sub> Aureo Alexandre </sub>](https://github.com/Aureo-Bueno) | [<img src="https://avatars.githubusercontent.com/u/97612275?v=4" width=115 > <br> <sub> Fauze Cavalari </sub>](https://github.com/devfauze) | [<img src="https://avatars.githubusercontent.com/u/53823656?v=4" width=115 > <br> <sub> Gabriella Andrade </sub>](https://github.com/GabiAndradeD) | [<img src="https://avatars.githubusercontent.com/u/61785785?v=4" width=115 > <br> <sub> Luiz H. L. Paino </sub>](https://github.com/luizhlpaino) |
| :---: | :---: | :---: | :---: |

