# Company Management Application

## Descrição
Aplicação full stack para gerenciamento de empresas com autenticação JWT, desenvolvida utilizando práticas de Clean Architecture e princípios SOLID.

## Tecnologias Utilizadas

### Backend
- NestJS
- TypeORM
- MySQL
- Redis
- JWT
- Swagger
- Docker

### Frontend
- Angular 19
- Angular Material
- TailwindCSS
- NgRx
- Angular JWT
- ngx-translate

## Funcionalidades
- Autenticação JWT
- Internacionalização (i18n)
- CRUD de Empresas
- Paginação
- Cache com Redis
- Documentação com Swagger

## Pré-requisitos
- Node.js v20.17.0
- Docker version 27.4.1
- docker-compose version 1.29.2

## Executando com Docker

1. Clone o repositório:
```bash
git clone <repository-url>
cd company-management
cp .env.example .env
```

1. Execute com Docker Compose:
```bash
docker-compose up --build
```

A aplicação estará disponível em:
- Frontend: http://localhost:4200
- Backend: http://localhost:3000
- Swagger: http://localhost:3000/api/docs
- Credenciais padrão: admin@admin.com / admin123

## Rotas da API

# Autenticação
- POST /auth/login - Login de usuário
- GET /auth/profile - Perfil do usuário autenticado

# Empresas
- GET /companies - Lista todas as empresas
- POST /companies - Cria uma nova empresa
- PUT /companies/:id - Atualiza uma empresa
- DELETE /companies/:id - Remove uma empresa
- GET /companies/:id - Busca uma empresa por ID

# Autor

Linkedin: https://www.linkedin.com/in/bruno-f-moraes/

email: brunofelipedk@gmail.com
