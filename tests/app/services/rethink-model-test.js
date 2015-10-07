'use strict';

let assert = require('chai').assert;
let bootRethink = require('../../../boot/boot-rethink');
let RethinkModel = require('../../../app/services/rethink-model');

describe('RethinkModel tests', function() {

  it('is a function', function() {
    assert.isFunction(RethinkModel);
  });

  let Event = null;

  before(function(done) {
    bootRethink().then(function() {
      Event = RethinkModel({
        table: 'events'
      });
      done();
    }).catch(console.error);
  });


  it('lists all records with the .all method', function(done) {
    Event.all().then(function(events) {
      assert.ok(events);
      done();
    })
    .catch(console.error);
  });

});
