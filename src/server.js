// const http = require('node:http');  CommonJs = importação com require;
import http from 'node:http'; // ESmodules = importação com import/export;

// padrão de importão CommonJs = usando o require.
// novo tipo de padrão = ESmodules => Import/Export

// OBS => nas últimas versões, o node pede a distinção de módulos de terceiros para módulos nativos. Para diferenciar, nos módulos nativos, colocar node:Módulo. Como no http, é um módulo nátivo, então utilizar na importação node:http.

// Cabeçalhos (Requisição/Response) = Metadados

// HTTP Status Code

const users = []

const server = http.createServer( async (req, res) => {
  const { method, url } = req

  const buffers = []

  for await(const chunk of req){
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())

  } catch(error){
    req.body = null
  }
  // console.log(body)

  console.log(method, url)
  if(method === "GET" && url === "/users") {
    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users))
  }

  if(method === "POST" && url === "/users") { 
    const { name, email } = req.body
    users.push({
      id: 1,
      name: name,
      email: email 
    })
     
    // status = 201 significa o retorno de uma criação que ocorreu com sucesso.
    return res.writeHead(201).end()
  }

  return res.writeHead(404).end('Não encontrei essa rota')
})

server.listen(3333);