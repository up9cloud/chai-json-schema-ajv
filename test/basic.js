'use strict'

const chai = require('chai')
chai.use(require('../index.js'))
const expect = chai.expect

describe('basic test', function () {
  it('chai.ajv should be instance of Ajv', function () {
    expect(chai.ajv).to.be.instanceof(require('ajv'))
  })
})
