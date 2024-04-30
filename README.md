Sistema de Adoção de Pets - API RESTful
Este projeto consiste no desenvolvimento de uma API RESTful completa para um sistema de adoção de pets. A API é construída utilizando MongoDB, Node.js, Express, bcrypt, jsonwebtoken, mongoose e dotenv.

Modelos de Dados
Modelo de Usuário
name (string)
email (string)
password (string)
phone (string)
createdAt (habilitar a opção timestamps do mongoose)
updatedAt (habilitar a opção timestamps do mongoose)
Modelo de Pet
name (string)
age (number)
weight (number)
color (string)
available (boolean)
user (object)
adopter (object)
createdAt (habilitar a opção timestamps do mongoose)
updatedAt (habilitar a opção timestamps do mongoose)
Rotas
Usuários
POST /api/users para cadastro de usuários
POST /api/users/login para login de usuários
GET /api/users/:id para obter um usuário por ID
PATCH /api/users/:id para atualizar um usuário por ID
DELETE /api/users/:id para excluir um usuário por ID
Pets
(Ressalte que apenas as rotas de usuários foram implementadas neste momento)
Como Executar
Clone este repositório.
Instale as dependências com npm install.
Configure as variáveis de ambiente no arquivo .env.
Inicie o servidor com npm start.
Contribuindo
Sinta-se à vontade para contribuir com este projeto. Basta fazer um fork e enviar um pull request com suas melhorias.
