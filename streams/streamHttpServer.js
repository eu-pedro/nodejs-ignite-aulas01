import http from 'node:http'
import { Transform } from 'node:stream'

class Inverse extends Transform {
  _transform(chunk, encoding, callback){
    const transformed = Number(chunk.toString()) * -1
    console.log(transformed)
    callback(null, Buffer.from(transformed.toString()))
  }
}

// Tudo no node é Stream: 
// req => readablestream, é possível ler dado
// res => writeablestream , é possível escrever dados

const server = http.createServer(async (req, res) => {
  const buffers = []

  //async/await
  for await(const chunk of req){
    buffers.push(chunk)
  }

  const fullContent = Buffer.concat(buffers).toString()
  console.log(fullContent)
  return res.end(fullContent)
  // return req.pipe(new Inverse()).pipe(res)
}) 

server.listen(3334)