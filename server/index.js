import server from './server.js'

// Criando o nosso servidor
server.listen(3000).on('listening', () => console.log('Servidor rodando'))
