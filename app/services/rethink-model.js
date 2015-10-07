'use strict';

let r = require('rethinkdb');
let rethink = require('../../boot/boot-rethink');

/**
 * RethinkModel é um serviço que oferece funcionalidades em
 * comum entre todas as tabelas do RethinkDB. Essas funcionalidades
 * são:
 * - Validação de atributos
 * - Emissão de eventos no criação, atualização e remoção.
 * - Métodos como: 'all', 'insert', 'update', 'delete', 'query' e 'find'.
 */

module.exports = function RethinkModel(config) {
  let model = {};

  rethink.pool.acquire(function(err, conn) {
    if(err) return console.error(err);
    r.tableCreate(config.table).run(conn)
    .then(function() {})
    .catch(function() {})
    .finally(rethink.pool.release.bind(null, conn));
  });

  /**
   * Retorna uma promessa que resolve com todos os registros da coleção.
   * Esse método não permite nenhum filtro. Para especificar um filtro
   * arbitrário, use o método 'query'.
   */
  model.all = function all() {
    return new Promise(function(resolve, reject) {
      rethink.pool.acquire(function(err, conn) {
        if(err) return reject(err);
        r.table(config.table).run(conn, function(err, result) {
          rethink.pool.release(conn);
          if(err) reject(err);
          else    resolve(result);
        });
      });
    });
  };

  return model;
};
