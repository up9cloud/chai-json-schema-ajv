'use strict'

const chai = require('chai')
chai.use(require('../index.js'))
const expect = chai.expect

describe('validJsonSchema', function () {
  it('valid json schema should pass.', function () {
    let schema = {
      title: 'valid schema',
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          minLength: 3
        }
      }
    }
    expect(schema).to.be.validJsonSchema
  })
  it('invalid json schema should print error messages.', function () {
    let schema = {
      type: '__invalid__'
    }
    try {
      expect(schema).to.be.validJsonSchema
    } catch (e) {
      expect(e instanceof chai.AssertionError).to.be.true
      expect(e.message).to.be.equal(`value is not a valid JSON Schema:
[ { keyword: 'enum',
    dataPath: '.type',
    schemaPath: '#/definitions/simpleTypes/enum',
    params: 
     { allowedValues: 
        [ 'array',
          'boolean',
          'integer',
          'null',
          'number',
          'object',
          'string' ] },
    message: 'should be equal to one of the allowed values' },
  { keyword: 'type',
    dataPath: '.type',
    schemaPath: '#/properties/type/anyOf/1/type',
    params: { type: 'array' },
    message: 'should be array' },
  { keyword: 'anyOf',
    dataPath: '.type',
    schemaPath: '#/properties/type/anyOf',
    params: {},
    message: 'should match some schema in anyOf' } ]`)
    }
  })
})
