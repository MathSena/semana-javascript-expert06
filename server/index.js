import server from './server.js'
import { logger } from './util.js'

// Criando o nosso servidor
server.listen(3000).on('listening', () => logger.info('Servidor rodando'))
