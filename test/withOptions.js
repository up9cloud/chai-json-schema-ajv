'use strict'

const clearModule = require('clear-module')
const chaiJsonSchemaAjv = require('../index.js')

describe('withOptions()', function () {
  let chai
  let expect
  beforeEach(function () {
    clearModule('chai')

    chai = require('chai')
    expect = chai.expect
  })
  describe('basic', function () {
    it('should pass options to ajv.', function () {
      let options = {
        verbose: false
      }
      chai.use(chaiJsonSchemaAjv.withOptions(options))
      let ajvOptions = chai.ajv._opts
      expect(options.verbose).to.be.equal(ajvOptions.verbose)
    })
  })
  describe('{verbose: true}', function () {
    before(function () {
      chai.use(chaiJsonSchemaAjv.withOptions({
        verbose: true
      }))
    })
    it('should print verbose error message when not match schema.', function () {
      let apple = {
        value: 1.1
      }
      let schema = {
        type: 'object',
        required: ['value'],
        properties: {
          value: {
            type: 'integer'
          }
        }
      }
      try {
        expect(apple).to.be.jsonSchema(schema)
      } catch (err) {
        expect(err instanceof chai.AssertionError).to.be.true
        expect(err.message).to.be.equal(`expected value not match the json-schema
[
  {
    "keyword": "type",
    "dataPath": ".value",
    "schemaPath": "#/properties/value/type",
    "params": {
      "type": "integer"
    },
    "message": "should be integer",
    "schema": "integer",
    "parentSchema": {
      "type": "integer"
    },
    "data": 1.1
  }
]`)
      }
    })
  })
})
