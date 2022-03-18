import { Service } from './service.js'

Service
export class Controller {
  constructor() {
    this.service = new Service()
  }

  async getFileStream(filename) {
    return this.service.getFileStream(filename)
  }

  createFileStream() {
    this.service.createClientStream()
  }
}
