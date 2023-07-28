import fs from 'node:fs/promises'

// informa o caminho até chegar no arquivo aberto
//  console.log(import.meta.url)

// 1) novo do arquivo
// 2) caminho relativo onde quero criar o arquivo
const databasePath = new URL('../db.json', import.meta.url)
// console.log(databasePath)
export class Database {
  #database = {}

  constructor(){
    fs.readFile(databasePath, 'utf8').then(data => {
      this.#database = JSON.parse(data)
    }).catch(() => {
      this.#persist()
    })
  }


  // criando na raiz do projeto
  #persist(){
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    // curiosidade: let vem de let it change

    if(search) {
      data = data.filter(row => {
        // transformando o objeto search em uma array, exemplo: { name: 'Pedro', email: 'pedro@gmail.com' } => isso ficará assim: [ ['name', 'Pedro'], ['email', 'pedro@gmail.com'] ]

        // como funciona o some: percorre o array e se pelo menos uma das vezes que ele percorre o array retornar true, quer dizer que o item do array deve ser incluido no filtro.
        return Object.entries(search).some(([key, value]) => {
          console.log(row[key].toLowerCase().includes(value.toLowerCase()))
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }
    console.log(data)
    return data
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }
    this.#persist()
    return data
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data}
      this.#persist()
    }
  }

}