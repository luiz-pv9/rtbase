'use strict';

let Redis = require('ioredis');

/**
 * Abre um pool de conexões com o Redis. Caso a conexão falhe,
 * a promessa retornada é rejeitada, de forma a não proceder
 * na inicialização do software.
 */
function bootRedis(config) {

  /**
   * Se o objeto de configuração não for especificado, a config
   * padrão é carregada.
   */
  if(!config) {
    config = require('../config/redis.json');
  }

  return new Promise(function(resolve, reject) {
    bootRedis.connection = new Redis(config);
    bootRedis.connection.on('ready', resolve.bind(this, bootRedis.connection));
    bootRedis.connection.on('error', reject.bind(this, bootRedis.connection));
  });
};

module.exports = bootRedis;
