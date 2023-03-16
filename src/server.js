// const http = require('node:http');  CommonJs = importação com require;
import http from 'node:http'; // ESmodules = importação com import/export;

// padrão de importão CommonJs = usando o require.
// novo tipo de padrão = ESmodules => Import/Export

// OBS => nas últimas versões, o node pede a distinção de módulos de terceiros para módulos nativos. Para diferenciar, nos módulos nativos, colocar node:Módulo. Como no http, é um módulo nátivo, então utilizar na importação node:http.

// Cabeçalhos (Requisição/Response) = Metadados

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req
  console.log(method, url)
  if(method === "GET" && url === "/users") {
    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users))

  }

  if(method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: 'Pedro Henrique',
      email: 'pedro@gmail.com'
    })

    return res.end('Criação de novo usuário')
  }

  return res.end('Hello Pedro')
})

server.listen(3333);