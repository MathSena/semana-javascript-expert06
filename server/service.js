import fs from 'fs'
import fsPromises from 'fs/promises'
import { randomUUID } from 'crypto'
import config from './config.js'
import { PassThrough } from 'stream'
import throttle from 'throttle'
import childProcess from 'child_process'
import { logger } from './util.js'
import { join, extname } from 'path'
const {
  dir: { publicDirectory },
  constants: { fallbackBitRate }
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

  _executeSoxCommand(args) {
    return childProcess.spawn('sox', args)
  }

  createFileStream(filename) {
    return fs.createReadStream(filename)
  }

  async getBitRage(song) {
    try {
      const aregs = [
        '--i', // information
        '-B', // bitrate
        song
      ]

      const {
        stderr,
        stdout
        // stdin
      } = this._executeSoxCommand(args)

      const [sucess, error] = [stdout, stderr].map(stream => stream.read())
      if (error) return await Promise.reject(error)

      return sucess.toString().trim().replace(/k/, '000')
    } catch (error) {
      logger.error(`Deu ruim no bitrate: ${error}`)
      return fallbackBitRate
    }
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
