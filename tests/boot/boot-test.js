'use strict';

let assert = require('chai').assert;
let boot = require('../../boot/boot');

describe('boot script', function() {
  it('é uma função', function() {
    assert.isFunction(boot);
  });
});
