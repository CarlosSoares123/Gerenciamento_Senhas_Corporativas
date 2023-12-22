﻿# Soares Streaming Backend
## Visão Geral
Sistema de gerenciamento de usuários com funcionalidades como registro, autenticação, recuperação de senha, e administração de usuários. Ele foi desenvolvido utilizando Node.js, Express.js, Sequelize (ORM para interação com banco de dados MySQL), e outras tecnologias relacionadas.

## Tecnologias Utilizadas

- **body-parser**: Facilita o manuseio dos dados recebidos nas solicitações HTTP, simplificando a interação com o corpo das requisições.

- **cors**: Habilitado para assegurar a segurança no acesso a recursos do servidor de diferentes origens, fundamental para prevenir vulnerabilidades de segurança.

- **dotenv**: Utilizado para carregar variáveis de ambiente a partir de um arquivo .env, contribuindo para a configuração flexível e segura do ambiente de desenvolvimento.

- **express**: Framework principal para a construção do servidor web, escolhido pela sua simplicidade e robustez, fornecendo uma base sólida para o desenvolvimento do projeto.

- **joi**: Essencial para validar dados de entrada, garantindo que apenas informações válidas e seguras sejam processadas pelo sistema.

- **jsonwebtoken**: Implementado para fornecer autenticação e autorização seguras por meio de tokens, uma abordagem eficaz para proteger rotas e recursos sensíveis.

- **morgan**: Adicionado para gerar logs de requisições HTTP, facilitando o monitoramento e a depuração do sistema durante o desenvolvimento e em produção.

- **mysql2**: Driver MySQL para interação eficiente com o banco de dados, escolhido com base na necessidade específica de integração com o MySQL.

- **nodemailer**: Utilizado para envio de e-mails, uma funcionalidade comum em muitos sistemas para notificações e comunicações com os usuários.

- **nodemon**: Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento, melhorando a eficiência e a produtividade dos desenvolvedores.

- **sequelize**: Escolhido como ORM para interagir com o banco de dados MySQL, proporcionando uma abstração fácil de usar para operações de banco de dados e simplificando o desenvolvimento.

- **sequelize-cli**: Ferramenta de linha de comando para Sequelize, facilita a execução de tarefas relacionadas ao banco de dados durante o desenvolvimento.

- **swagger-ui-express**: Interface Swagger para visualizar e interagir com a documentação da API, facilitando a compreensão e o uso da API pelos desenvolvedores.

## Fluxo do Sistema

### Registro de Admin

- **Endpoint:** `POST /auth/register-admin`
- **Fluxo:** Usuários com privilégios de administrador podem registrar outras contas de administrador.

### Gerenciar Usuários (Somente Administradores)

- **Endpoint:** `GET /api/admin/users`
- **Descrição:** Obtém a lista de todos os usuários registrados no sistema.
- **Autenticação:** Somente administradores têm acesso a essa rota.
- **Resposta de Sucesso:** Retorna uma lista de usuários com seus detalhes, como nome, e-mail e data de registro.

### Bloquear Usuário (Somente Administradores)

- **Endpoint:** `PUT /api/admin/users/:id/block`
- **Descrição:** Permite que os administradores bloqueiem um usuário, impedindo seu acesso ao sistema.
- **Parâmetros:** `id`: ID do usuário a ser bloqueado.
- **Autenticação:** Somente administradores têm acesso a essa rota.
- **Resposta de Sucesso:** Retorna uma confirmação de que o usuário foi bloqueado com sucesso.

### Desbloquear Usuário (Somente Administradores)

- **Endpoint:** `PUT /api/admin/users/:id/unblock`
- **Descrição:** Permite que os administradores removam o bloqueio de um usuário, restaurando seu acesso ao sistema.
- **Parâmetros:** `id`: ID do usuário a ser desbloqueado.
- **Autenticação:** Somente administradores têm acesso a essa rota.
- **Resposta de Sucesso:** Retorna uma confirmação de que o usuário foi desbloqueado com sucesso.

### Alterar Senha do Usuário

- **Endpoint:** `PUT /api/user/change-password`
- **Descrição:** Permite que os usuários autenticados alterem sua senha.
- **Parâmetros:** `senhaAtual`: Senha atual do usuário. `novaSenha`: Nova senha desejada.
- **Autenticação:** Somente usuários autenticados têm acesso a essa rota.
- **Resposta de Sucesso:** Retorna uma confirmação de que a senha foi alterada com sucesso.

### Logout

- **Endpoint:** `POST /auth/logout`
- **Descrição:** Invalida o token de autenticação do usuário, desconectando-o.
- **Autenticação:** Somente usuários autenticados têm acesso a essa rota.
- **Resposta de Sucesso:** Retorna uma confirmação de logout bem-sucedido.

### Excluir Conta do Usuário

- **Endpoint:** `DELETE /api/user/delete-account`
- **Descrição:** Permite que os usuários autenticados excluam permanentemente suas contas.
- **Parâmetros:** `senha`: Senha para confirmar a exclusão da conta.
- **Autenticação:** Somente usuários autenticados têm acesso a essa rota.
- **Resposta de Sucesso:** Retorna uma confirmação de exclusão de conta bem-sucedida.


## Como Iniciar

Siga as etapas abaixo para iniciar o projeto em sua máquina local:

1. Clonar o repositório:

`
  https://github.com/CarlosSoares123/Gerenciamento_Senhas_Corporativas.git
`

2. Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias, como chaves de API, configurações de banco de dados . Certifique-se de incluir as seguintes variáveis para configurar a conexão com o banco de dados:

```bash
DB_USERNAME=seu-host

DB_PASSWORD=sua-senha

DB_DATABASE=banco-de-dados

DB_HOST=127.0.0.1

```

3. Acessar o diretório do banco de dados:

  `
  cd database
  `

4. Executar as migrações do banco de dados:

`
  npx sequelize-cli db:migrate
`

`
  cd ..
`

5. Instalar as dependências:

`
  npm install
`

6. Inicie o servidor:

`
npm run dev
`

## Uso da API

Acesse a documentação Swagger em http://localhost:5000/api-docs para explorar e interagir com os endpoints da API.


![Swagger](./img-swagger.png)
