import { Database } from './database.js'
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: (req, res) => {
      const users = database.select('users')

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: '/users',
    handler: (req, res) => {
      const { name, email } = req.body
      const user = {
        id: randomUUID(),
        name: name,
        email: email 
      }

      database.insert('users', user)
     
      // status = 201 significa o retorno de uma criação que ocorreu com sucesso.
      return res.writeHead(201).end()
    }
  },
  {
    method: 'DELETE',
    path: '/users',
    handler: (req, res) => {}
  },
  {
    method: 'PUT',
    path: '/users/:id',
    handler: (req, res) => {}
  }
]