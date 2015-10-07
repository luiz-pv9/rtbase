'use strict';

let r = require('rethinkdb');
let pool = require('generic-pool');

/**
 * Tenta abrir um pool de conexões com o RethinkDB e retorna uma
 * promessa que resolve com o pool ou rejeita com o erro da conexão.
 */
function bootRethink(config) {

  /**
   * Se o objeto de configuração não for especificado, a config
   * padrão é carregada.
   */
  if(!config) {
    config = require('../config/rethink.json');
  }

  return new Promise(function(resolve, reject) {

    /**
     * Abre o pool de conexões com o RethinkDB. Esse pool é compartilhado 
     * pelas requisições HTTP de todos os usuários. Cada usuário também
     * irá possuir uma conexão através do socket.
     */
    bootRethink.pool = pool.Pool({
      name: 'rethink',
      create: function createRethinkConnection(callback) {
        r.connect(config, callback);
      },
      destroy: function destroyRethinkConnection(conn) {
        conn.close(console.error);
      },
      max: config.maxPoolSize,
      min: config.minPoolSize,
      idleTimeoutMillis: 30000,
      log: config.log
    });

    /**
     * Garante que o banco de dados existe na aplicação
     */
    bootRethink.pool.acquire(function(err, conn) {
      if(err) return console.error(err);
      r.dbCreate(config.db).run(conn, function(err, result) {
        bootRethink.pool.release(conn);
        resolve(bootRethink.pool);
      });
    });
  });
};

module.exports = bootRethink;
