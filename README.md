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


## 🚀 Diferenciais Técnicos (Full Stack)

### 💻 Frontend (Vue 3 + Vuetify + Pinia + Axios)
* **Componentes Reutilizáveis:** Desenvolimento de componentes base reutilizáveis (ex: `BaseTable`, `BaseDialog`), garantindo consistência e facilidade de manutenção.
* **Gerenciamento de Estado com Pinia:** Uso do Pinia para gerenciamento de estado, separando a lógica de negócio da interface.
* **Paginação Server-Side:** Implementação de tabelas inteligentes que consultam o banco de dados sob demanda.
* 

### ⚙️ Backend (Spring Boot)
* **Paginação:** Uso de `Pageable` para processamento eficiente de consultas ao banco de dados.
* **Arquitetura em Camadas:** Estrutura em camadas: Controller -> Service -> Repository.
* **Padronização REST:** API desenhada seguindo as melhores práticas, com códigos de status apropriados e estruturas de JSON consistentes.

### 🎨 Outros
* **Feedback Visual:** Uso de estados de `loading`, diálogos de confirmação e tratativas de erro.
* **Formulários Dinâmicos:** Sistema de validação de formulário que impede o envio de dados inconsistentes antes mesmo da chamada à API.
