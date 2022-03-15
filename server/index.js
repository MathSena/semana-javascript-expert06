import config from './config.js'
import server from './server.js'
import { logger } from './util.js'

// Criando o nosso servidor
server
  .listen(config.port)
  .on('listening', () =>
    logger.info(`Servidor rodando na porta ${config.port}!!`)
  )
