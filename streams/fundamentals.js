// process.stdin.pipe(process.stdout)
import { Readable, Writable, Transform } from 'node:stream'


class OneToHundredStream extends Readable {

  index = 1
  _read(){
    const i = this.index++

    setTimeout(() => {
      if(i > 100){
        this.push(null)
      }
      else {
        const buffer = Buffer.from(i.toString())
        this.push(buffer)
      }
    }, 1000)
  }
}

class Multiply extends Writable {
  _write(chunk, incoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

class Inverse extends Transform {
  _transform(chunk, encoding, callback){
    const transformed = Number(chunk.toString()) * -1
    callback(null, Buffer.from(transformed.toString()))
  }
}

new OneToHundredStream()
  .pipe(new Inverse())
  .pipe(new Multiply())