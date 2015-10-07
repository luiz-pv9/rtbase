'use strict';

let bootRedis = require('../../boot/boot-redis');

/**
 * O serviço 'redis' expõe a conexão aberta no boot-redis públicamente
 * para usar no resto do software. Apenas isso.
 */
exports.redis = bootRedis.connection;
