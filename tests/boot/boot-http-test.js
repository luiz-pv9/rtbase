'use strict';

let assert = require('chai').assert;
let bootHttp = require('../../boot/boot-http');
let httpConfig = require('../../config/http.json');
let request = require('supertest');

describe('boot-http tests', function() {
  it('é uma função', function() {
    assert.isFunction(bootHttp);
  });

  describe('servidor', function() {
    let app;

    before(function(done) {
      bootHttp(httpConfig).then(function(_app) {
        app = _app;
        done();
      }).catch(function(err) {
        console.log("err", err);
      });
    });

    after(function(done) { app.server.close(done); });

    it('escuta conexões na porta especificada no config', function() {
      assert.equal(httpConfig.port, app.server.address().port);
    });

    it('retorna um objeto com status ok na rota /status', function(done) {
      request(app)
        .get('/status')
        .expect(200)
        .end(function(err, res) {
          assert.isNull(err);
          assert.deepEqual({status: 'OK'}, res.body);
          done();
        });
    });
  });

  describe('conflito de porta', function() {
    it('rejeita a promessa caso o servidor não seja inicializado', function(done) {
      // O nginx está rodando na porta 80, então um conflito deve ser gerado.
      // O promessa executa a função do 'catch' e um erro deve existir.
      bootHttp({port: 80})
        .then(function() {
          bootHttp({port: 80})
            .catch(function(err) {
              assert.ok(err);
              done();
            });
        })
        .catch(function(err) {
          console.error(err);
        });
    });
  });
});
