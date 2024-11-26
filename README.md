# Authentication-JWT

# Em construçao

Creation of a full-stack project for user creation and authentication.

# API

### NestJS User Management API

Este projeto implementa uma API para gerenciamento de usuários com funcionalidades de criação, autenticação e gerenciamento de sessões de usuários. A API usa o NestJS como framework, TypeORM para interação com o banco de dados, class-validator para validações de entrada de dados, e JWT para autenticação.

## Funcionalidades

- **Criar um novo usuário**: Endpoint para criar um usuário com informações como nome, sobrenome, nome de usuário e senha.
- **Listar todos os usuários**: Endpoint para listar todos os usuários cadastrados.
- **Buscar um usuário por nome de usuário**: Endpoint para buscar um usuário específico pelo userName.
- **Remover um usuário**: Endpoint para remover um usuário com base no userName.
- **Autenticação via JWT**: Endpoint para realizar login, gerando um token JWT para o usuário.
- **Logout**: Implementação do logout para invalidar o token JWT.

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de APIs back-end.
- **TypeORM**: ORM para integração com bancos de dados relacionais.
- **class-validator**: Biblioteca para validação de dados de entrada.
- **bcryptjs**: Biblioteca para hashing de senhas.
- **jsonwebtoken (JWT)**: Biblioteca para geração e verificação de tokens JWT.
- **PostgreSQL**: Banco de dados relacional (pode ser substituído por outro banco).

## Pré-requisitos

### Antes de rodar o projeto, é necessário ter o seguinte instalado em sua máquina:

- **Node.js** (versão recomendada: `16.x` ou superior)
- **Yarn** (gerenciador de pacotes)
- **PostgreSQL** ou outro banco de dados configurado

## Configuração

### 1. **Clone o repositório**:

```bash
git clone https://github.com/garcezlucas/Authentication-JWT.git
cd api/
```

### 2. **Instale as dependências**:

`yarn`:

```bash
yarn install
```

### 3. **Configure o banco de dados**:

#### Certifique-se de que o banco de dados PostgreSQL esteja em execução e crie um banco de dados para este projeto.

#### - O arquivo de configuração do banco de dados (geralmente `ormconfig.json` ou `app.module.ts`) pode ser ajustado conforme necessário.

#### Exemplo de configuração no `app.module.ts`:

```typescript
TypeOrmModule.forRoot({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "sua-senha",
  database: "nome-do-banco",
  autoLoadEntities: true,
  synchronize: true,
});
```

## Rodando o Projeto

### 1. **Iniciar o servidor**:

#### Para rodar a aplicação em modo de desenvolvimento, use o seguinte comando:

`yarn`:

```bash
yarn start:dev
```

#### A aplicação estará disponível em `http://localhost:3000`.

### 2. **Executar migrações (se necessário)**:

#### Se o projeto usar migrações do TypeORM para criar tabelas e outras estruturas, você pode rodá-las com o seguinte comando:

`yarn`:

```bash
yarn migration:run
```

## Endpoints da API

### Documentação realizada com swagger

- #### Para verificar a documentação, acesse: `http://localhost:3003/api#/`


## Testes

### O projeto usa o Jest para testes. Para rodar os testes:

```bash
yarn test
```

## Contribuindo

### Contribuições são bem-vindas! Para contribuir:

- #### Faça um fork deste repositório.
- #### Crie uma branch para sua feature (git checkout -b feature/MinhaFeature).
- #### Faça suas alterações.
- #### Envie um pull request.
