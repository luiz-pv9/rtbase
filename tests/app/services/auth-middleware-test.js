'use strict';

let assert = require('chai').assert;
let authMiddleware = require('../../../app/services/auth-middleware');

describe('auth middleware tests', function() {
  it('é uma função', function() {
    assert.isFunction(authMiddleware);
  });
});
