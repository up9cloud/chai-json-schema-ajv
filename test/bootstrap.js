global.fs = require('fs')
global.path = require('path')
const chai = require('chai')
const chaiJsonSchemaAjv = require('../index.js')
chai.use(chaiJsonSchemaAjv)
global.chai = chai
global.chaiJsonSchemaAjv = chaiJsonSchemaAjv
global.expect = chai.expect
global.invalidSchema = {
  type: '__invalid__'
}
global.fruitSchema = {
  title: 'fruit schema v0.1',
  type: 'object',
  required: ['name', 'color', 'value'],
  properties: {
    name: {
      type: 'string',
      minLength: 3
    },
    color: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string'
      }
    },
    value: {
      type: 'integer',
      minimum: 5
    }
  }
}
global.apple = {
  name: 'foo',
  color: ['red', 'green', 'yellow'],
  value: 10
}
global.car = {
  name: 'bar',
  speed: 1.1
}
