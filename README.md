<h4 align="center">
  <img width="180px" alt="trybe wallet logo" src="https://user-images.githubusercontent.com/100851855/229933675-b153eeaf-7e46-4cb9-a738-29e153a9fe08.png" />
  <br /><br />
</h4>

<hr />


# Projeto StoreManager API

Projeto realizado durante módulo de Back-end do curso de desenvolvimento web da Trybe.

<details>
  <summary><strong>O que foi feito</strong></summary></br>

  Neste projeto desenvolvi uma API utilizando a arquitetura MSC (model-service-controller).
  
  A API construída é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas.

</details>
<details>
  <summary><strong>Como rodar o projeto</strong></summary></br>

  **Com Docker:**

  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**

- [ ] `docker-compose up -d`
- [ ] `docker exec -it store_manager bash`
- [ ] `npm install`
- [ ] `npm run migration && npm run seed`
- [ ] `npm run debug`

**Localmente:**

**Necessita ter um banco de dados(MySql) instalado localmente**

- [ ] `npm install`
- [ ] `npm run migration && npm run seed`
- [ ] `npm run debug`

</details>

<details>
  <summary><strong>:memo: Tecnologias utilizadas</strong></summary><br />
  
  - `Docker`;
  - `docker-compose`;
  - `Mysql`;
  - `Mocha`;
  - `Nyc`;
  - `Express`;

</details>
<details>
  <summary><strong>:memo: Habilidades</strong></summary><br />
  
  - Aplicar a arquitetura baseada em camadas em um código de exemplo;
  - Criar testes de unidade para componentes de software da camada `Model, Service, Controller`;
  - Identificar os componentes de software pertencentes as camada `Model, Service, Controller`.
  - Desenvolver middlewares responsáveis pela validação dos dados de entrada; 

</details>

</details>
