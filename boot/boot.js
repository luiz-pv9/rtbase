'use strict';

/**
 * A função exporta do boot.js é responsável por inicializar todos os
 * serviços necessários para o aloweb funcionar corretamente.
 * Os serviços atualmente são o servidor HTTP, o servidor WebSocket e
 * conexão com os banco de dados Redis, RethinkDB e MySQL.
 */

module.exports = function boot() {

  /**
   * Carrega as configurações do diretório 'config'.
   * Existe um arquivo de boot para cada configuração.
   */
  let httpConfig          = require('../config/http.json');
  let redisConfig         = require('../config/redis.json');
  let rethinkConfig       = require('../config/rethink.json');
  let mysqlConfig         = require('../config/mysql.json');
  let socketConfig        = require('../config/socket.json');
  let elasticSearchConfig = require('../config/elastic-search.json');

  /**
   * Carrega as funções de boot de cada um dos serviços.
   */
  let bootHttp           = require('./boot-http');
  let bootRedis          = require('./boot-redis');
  let bootRethink        = require('./boot-rethink');
  let bootMysql          = require('./boot-mysql');
  let bootSocket         = require('./boot-socket');
  let bootElasticSearch  = require('./boot-elastic-search');

  /**
   * Inicializa cada serviço em sequência. Um serviço só inicia
   * se o anterior for bem sucedido. As conexões com os serviços
   * externos são inicializadas antes do servidor.
   */
  bootRedis(redisConfig)
    .then(function() {
      return bootRehink(rethinkConfig);
    })
    .then(function() {
      return bootMysql(mysqlConfig);
    })
    .then(function() {
      return bootElasticSearch(elasticSearchConfig);
    })
    .then(function() {
      return bootHttp(httpConfig);
    })
    .then(function() {
      return bootSocket(socketConfig);
    })
    .catch(function(err) {
      console.error(err);
    });
};
