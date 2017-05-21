'use strict';

const clearModule = require('clear-module')
const chaiJsonSchemaAjv = require('../index.js').withOptions({
    verbose: true
});

describe('verbose mode test', function () {
    let chai;
    let expect;
    before(function () {
        clearModule('chai');

        chai = require('chai');
        chai.use(chaiJsonSchemaAjv);
        expect = chai.expect;
    });
    it('should print error message when not match schema.', function () {
        let apple = {
            value: 1.1,
        };
        let schema = {
            type: 'object',
            required: ['value'],
            properties: {
                value: {
                    type: 'integer',
                },
            }
        }
        try {
            expect(apple).to.be.jsonSchema(schema);
        } catch (err) {
            expect(err instanceof chai.AssertionError).to.be.true;
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
]`);
        }
    });
});