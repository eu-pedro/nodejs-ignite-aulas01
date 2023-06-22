// const http = require('node:http');  CommonJs = importação com require;
import http from 'node:http'; // ESmodules = importação com import/export;
import { Json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParameters } from './utils/extrac-query-params.js';

// padrão de importão CommonJs = usando o require.
// novo tipo de padrão = ESmodules => Import/Export

// OBS => nas últimas versões, o node pede a distinção de módulos de terceiros para módulos nativos. Para diferenciar, nos módulos nativos, colocar node:Módulo. Como no http, é um módulo nátivo, então utilizar na importação node:http.

// Cabeçalhos (Requisição/Response) = Metadados

// HTTP Status Code

// query parameters: 
// route parameters: identificação de recurso
// request body: envio de informações de um formulário


// 1) parametros nomeados: http://localhost:3333/users?userId=1&name=Pedro => usada quando precisamos ter uma url statefull, enviar informações que não são sensível e serve para modificar a resposta que o backend vai nos dar => filtros, paginação, busca


// 2) parametros não nomeados: http://localhost:3333/1 => GET, BUscar usuário com ID = 1




const server = http.createServer( async (req, res) => {
  const { method, url } = req

  await Json(req, res)

  
  const route = routes.find(route => {
    // console.log(route.path.test(url))

    // toda regex retorna um método chamado test() para verificar se o conteúdo verificado bate ou não com a regex.
    return route.method === method && route.path.test(url)
  })

  if(route) {
    const routeParams = req.url.match(route.path)
    console.log({...routeParams.groups})
    // console.log(routeParams.groups.id)
    // criando um objeto novo e pegando o valor de routeParams.groups
    // console.log(routeParams.groups)

    const { query, ...params } = routeParams.groups
    // enviando req.params pois ele está sendo passado para frente e qualquer método que receba req em seu parâmetro, terá acesso ao valor.

    req.params = params
    req.query = query ? extractQueryParameters(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end('Não encontrei essa rota')
})

server.listen(3333);