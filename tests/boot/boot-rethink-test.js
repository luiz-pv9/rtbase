'use strict';

let assert = require('chai').assert;
let bootRethink = require('../../boot/boot-rethink');

describe('rethink boot function', function() {
  it('é uma função', function() {
    assert.isFunction(bootRethink);
  });

  it('resolve a promessa com uma conexão bem sucedida', function(done) {
    bootRethink().then(function(pool) {
      assert.ok(pool);
      assert.equal(pool, bootRethink.pool);
      pool.acquire(function(err, r) {
        assert.isNull(err);
        assert.ok(r);
        pool.release(r);
        done();
      });
    })
    .catch(function(err) {
      console.error(err);
    });
  });
});
