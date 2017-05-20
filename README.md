# chai-json-schema-ajv

[![Build Status](https://travis-ci.org/up9cloud/chai-json-schema-ajv.svg?branch=master)](https://travis-ci.org/up9cloud/chai-json-schema-ajv)

A chai plugin for validate json schema.

This is based on [ajv](https://github.com/epoberezkin/ajv), a JSON schema Validator fully support [JSON Schema draft 4](http://json-schema.org/)

## Usage

```sh
npm install chai-json-schema-ajv
```

### basic

```js
const chai = require('chai');
chai.use(require('chai-json-schema-ajv'));
const expect = chai.expect;

let apple = {
  name: 'foo',
  color: ['red', 'green', 'yellow'],
  value: 10
};
let schema = {
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

expect(apple).to.be.jsonSchema(schema);
```

### ajv with custom options

```js
const ajvOptions = { /** https://github.com/epoberezkin/ajv#options **/ };
chai.use(require('chai-json-schema-ajv').withOptions(ajvOptions));
```

### more error message

Original error message looks like `expected value not match the json-schema\ndata.value should be integer`. We can set it to verbose mode.

```js
chai.use(require('chai-json-schema-ajv').withOptions({
  verbose: true
}));
//expected value not match the json-schema
//[
//  {
//    "keyword": "type",
//    "dataPath": ".value",
//    "schemaPath": "#/properties/value/type",
//    "params": {
//      "type": "integer"
//    },
//    "message": "should be integer",
//    "schema": "integer",
//    "parentSchema": {
//      "type": "integer"
//    },
//    "data": 1.1
//  }
//]
```

## TODO

- support browser side
- ~~send option to ajv~~ (thanks @dimac)

## License

MIT
