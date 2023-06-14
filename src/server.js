// const http = require('node:http');  CommonJs = importação com require;
import http from 'node:http'; // ESmodules = importação com import/export;
import { Json } from './middlewares/json.js';
import { Database } from './database.js';

// padrão de importão CommonJs = usando o require.
// novo tipo de padrão = ESmodules => Import/Export

// OBS => nas últimas versões, o node pede a distinção de módulos de terceiros para módulos nativos. Para diferenciar, nos módulos nativos, colocar node:Módulo. Como no http, é um módulo nátivo, então utilizar na importação node:http.

// Cabeçalhos (Requisição/Response) = Metadados

// HTTP Status Code

const database = new Database()

const server = http.createServer( async (req, res) => {
  const { method, url } = req

  await Json(req, res)
  // console.log(body)

  // console.log(method, url)
  if(method === "GET" && url === "/users") {
    const users = database.select('users')
    return res.end(JSON.stringify(users))
  }

  if(method === "POST" && url === "/users") { 
    const { name, email } = req.body
    const user = {
      id: 1,
      name: name,
      email: email 
    }

    database.insert('users', user)
     
    // status = 201 significa o retorno de uma criação que ocorreu com sucesso.
    return res.writeHead(201).end()
  }

  return res.writeHead(404).end('Não encontrei essa rota')
})

server.listen(3333);