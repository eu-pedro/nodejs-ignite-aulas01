// const http = require('node:http');  CommonJs = importação com require;
import http from 'http'; // ESmodules = importação com import/export;

// padrão de importão CommonJs = usando o require.
// novo tipo de padrão = ESmodules => Import/Export

// OBS => nas últimas versões, o node pede a distinção de módulos de terceiros para módulos nativos. Para diferenciar, nos módulos nativos, colocar node:Módulo. Como no http, é um módulo nátivo, então utilizar na importação node:http.

const server = http.createServer((require, response) => {
  return response.end('Hello World')
})

server.listen(3333);