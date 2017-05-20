'use strict';

const chai = require('chai');
const chaiJsonSchemaAjv = require('../index.js').withOptions({
    verbose: true
});
chai.use(chaiJsonSchemaAjv);
const expect = chai.expect;

describe('verbose mode test', function () {
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
