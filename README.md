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


Documentação:

Gets User:
/users/:id

Post User:
/users/register
body:
{
    "name" : "Guilherme Macedo",
    "email" : "gr@gmail.com",
    "password" : "teste123",
    "phone" : "1499778811",
    "confirmpassword" : "teste123"
}

/users/login
body:
{
    "email": "Marcelo14@teste.com",
    "password": "teste123"
}

Patch User:
/users/edit/:id
body:
{
    "name": "Tarumoto",
    "phone": "14997707941"
}

DEL User:
/users/:id

-------------------------------------------------------------------------------------------------------------------------------------------------------

Gets Pets:
/pets/
/pets/mypets
/pets/:id

Post Pets:
/pets/create
body:
{
    "name" : "Any",
    "age"   : 12,
    "weight" : 5,
    "color" : "Marrom Claro"
}

Patch Pets:
/pets/:id
body: 
{
    "name" : "pet att",
    "age" : 5,
    "weight" : 14,
    "color" : "branco"
}

/pets/schedule/:id

/pets/conclude/:id

