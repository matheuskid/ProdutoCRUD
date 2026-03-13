# Sistema de Gerenciamento de Estoque

Este projeto é uma aplicação Full Stack desenvolvida como parte do meu plano de estudos e atividades de estágio. O objetivo principal é aplicar padrões de desenvolvimento modernos Full-Stack (Spring Boot + Vue.js)

## 🛠️ Stack Tecnológica

* **Backend:** Java 21 com Spring Boot 3, Spring Data JPA e Hibernate.
* **Frontend:** Vue.js 3 (Composition API) com Vuetify 3 e Pinia para gerenciamento de estado.
* **Banco de Dados:** PostgreSQL.
* **Ferramentas:** Axios, TypeScript.

## 📌 Principais Implementações

* **Arquitetura REST:** API estruturada com endpoints para operações CRUD completas.
* **Frontend Reativo:** Interface construída com componentes reutilizáveis e validações em tempo real.
* **Integração de Dados:** Consumo de API assíncrono utilizando Axios com tratamento de estados de carregamento e erro.

## 🚀 Como Rodar o Projeto


1. **Iniciar o Backend (Spring Boot):**
```bash
cd backend
./mvnw spring-boot:run

```


2. **Iniciar o Frontend (Vue 3):**
```bash
cd frontend
npm install
npm run dev

```


## 📐 Estrutura do Projeto

* `/backend`: Contém a lógica de negócio, entidades e repositórios.
* `/frontend`: Contém as views, stores do Pinia e componentes Vuetify.
