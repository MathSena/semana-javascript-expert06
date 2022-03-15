import fs from 'fs'
import { join, extname } from 'path'
import config from './config.js'
import fsPromises from 'fs/promises'
const {
  dir: { publicDirectory }
} = config

export class Service {
  createFileStream(filename) {
    return fs.createReadStream(filename)
  }

  async getFileInfo(file) {
    // file = home/index.js
    const fullFilePath = join(publicDirectory, file)

    //Validação
    await fsPromises.access(fullFilePath)
    const fileType = extname(fullFilePath)
    return {
      type: fileType,
      name: fullFilePath
    }
  }

  async getFileStream() {
    const { name, type } = await this.getFileInfo(file)
    return {
      stream: this.createFileStream(name),
      type
    }
  }
}
