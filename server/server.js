// Devolve a instância do servidor
import { createServer } from 'http'
import { handler } from './routes.js'

export default createServer(handler)
