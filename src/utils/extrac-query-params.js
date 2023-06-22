// ?search=Ṕedro

export function extractQueryParameters(query){
  // para retirar o "?"
  // fazendo o split ficará assim: 
  // ?search=Ṕedro&page=2
  // ['search=Pedro', 'page=2']
  return query.substr(1).split('&').reduce((queryParams, param) => {
    // percorre o array e transforma em um outro tipo de dado 
    // queryParams = é o objeto vazio do segundo parâmetro
    // param = cada um dos meus itens

    
    const [key, value] = param.split('=')
    // ficará assim: ['search', 'Pedro'], ['page', '2']
    queryParams[key] = value

    return queryParams;
  }, {})
}