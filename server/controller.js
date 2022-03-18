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
    const { id, clientStream } = this.service.createClientStream()

    const onClose = () => {
      logger.info(`closing connection pf ${id}`)
      this.service.removeClientStream(id)
    }

    return {
      stream: clientStream,
      onClose
    }
  }
}
