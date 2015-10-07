'use strict';

let assert    = require('chai').assert;
let bootRedis = require('../../boot/boot-redis');

describe('redis boot function', function() {
  it('é uma função', function() {
    assert.isFunction(bootRedis);
  });

  it('resolve a promessa com uma conexão bem sucedida', function(done) {
    bootRedis().then(function(redis) {
      assert.ok(redis);
      assert.equal(bootRedis.connection, redis);
      done();
    })
    .catch(function(err) {
      console.error(err);
    });
  });
});

