import fs from 'fs'
import fsPromises from 'fs/promises'
import { randomUUID } from 'crypto'
import config from './config.js'
import { PassThrough } from 'stream'
import { join, extname } from 'path'
const {
  dir: { publicDirectory }
} = config
export class Service {
  constructor() {
    this.clientStreams = new Map()
  }

  createClientStream() {
    const id = randomUUID()
    const clientStream = new PassThrough()
    this.clientStreams.set(id, clientStream)

    return {
      id,
      clientStream
    }
  }
  removeClientStream(id) {
    this.clientStreams.delete(id)
  }
  createFileStream(filename) {
    return fs.createReadStream(filename)
  }

  async getFileInfo(file) {
    // file = home/index.html
    const fullFilePath = join(publicDirectory, file)
    //Validação
    await fsPromises.access(fullFilePath)
    const fileType = extname(fullFilePath)
    return {
      type: fileType,
      name: fullFilePath
    }
  }

  async getFileStream(file) {
    const { name, type } = await this.getFileInfo(file)
    return {
      stream: this.createFileStream(name),
      type
    }
  }
}
