# ignite-nodejs-challenge-01 
Primeiro desafio da rocketseat em sua trilha de nodeJS 2023
# Instalação  
Para instalar as dependências do projeto, execute o seguinte comando:

```npm install```

# Executando o projeto  
Para iniciar o servidor em modo de desenvolvimento, execute o seguinte comando:

```npm run dev```

# Rotas da API
Todos os modelos estão disponíveis na coleção do postman.  
Aqui estão as rotas disponíveis na API:

- `POST /tasks`: Cria uma task nova na API. 
- `GET /tasks`: Lista as tasks salvas no banco de dados. É possível filtrar usando o query param `search`
- `PUT /tasks/:id`: Atualiza a task por completo
- `DELETE /tasks/:id`: Deleta a task informada
- `PATCH /tasks/:id/complete`: Marca a task como completa
- `POST /tasks/import`: experimental: Importa um arquivo .csv e salva os dados no banco de dados.


# Licença
Só a prefeitura pode dar. 