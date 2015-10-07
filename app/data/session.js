'use strict';

/**
 * Cada usuário logado no sistema possui uma session associada. A
 * session armazena informações sobre o usuário atual de modo
 * que o registro completo não precise ser buscado no Mongo
 * para a maioria das requisições e autorizações.
 */

let redis = require('../../boot/boot-redis');

/**
 * Prefixo das keys armazenadas relacionadas a sessions de usuários. 
 * Apenas para manter organizado dentro do redis.
 */
let prefix = 'session_';

/**
 * Pesquisa pela session associada ao id especificado e retorna
 * uma promessa que resolve com o registro da session ou 
 * rejeita caso nenhuma seja encontrada.
 */
exports.find = function sessionFind(id) {
  return new Promise(function(resolve, reject) {
    redis.connection.get(prefix + id, function(err, val) {
      if(err) return reject(err);
      resolve(val);
    });
  });
};
