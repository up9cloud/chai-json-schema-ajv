const fs = require('fs')
const path = require('path')
const chai = require('chai')
const chaiJsonSchemaAjv = require('../index.js')
chai.use(chaiJsonSchemaAjv)
global.fs = fs
global.path = path
global.chai = chai
global.chaiJsonSchemaAjv = chaiJsonSchemaAjv
global.expect = chai.expect
global.assert = chai.assert
global.invalidSchema = require('./invalidSchema.js')
global.fruitSchema = require('./fruitSchema.js')
global.apple = require('./apple.js')
global.car = require('./car.js')

switch (process.env.AJV_VERSION) {
  // v4: ._refs['http://json-schema.org/schema']: http://json-schema.org/draft-04/schema
  // v5: ._refs['http://json-schema.org/schema']: http://json-schema.org/draft-06/schema
  // v6: ._refs['http://json-schema.org/schema']: http://json-schema.org/draft-07/schema
  case 'v4':
  case 'v5':
  case 'v6': {
    global.Ajv = require('ajv')
    global.defaultAjv = global.Ajv
    global.rootPath = path.join(__dirname, 'unit', 'ajv-v6')
    break
  }
  // v7: .refs['http://json-schema.org/schema']: http://json-schema.org/draft-07/schema
  case 'v7': {
    global.Ajv = require('ajv').default
    global.defaultAjv = global.Ajv
    global.rootPath = path.join(__dirname, 'unit', 'ajv-v7')
    break
  }
  // v8: .refs['http://json-schema.org/schema']: http://json-schema.org/draft-07/schema
  case 'v8': {
    global.Ajv = require('ajv').default
    global.defaultAjv = global.Ajv
    global.rootPath = path.join(__dirname, 'unit', 'ajv-v8')
    break
  }
  // v8-2019: .refs['http://json-schema.org/schema']: http://json-schema.org/draft-07/schema
  case 'v8-2019': {
    global.Ajv = require('ajv/dist/2019')
    global.defaultAjv = require('ajv').default
    global.rootPath = path.join(__dirname, 'unit', 'ajv-v8')
    break
  }
  // v8-2020: .refs['http://json-schema.org/schema']:
  case 'v8-2020': {
    global.Ajv = require('ajv/dist/2020')
    global.defaultAjv = require('ajv').default
    global.rootPath = path.join(__dirname, 'unit', 'ajv-v8')
    break
  }
  // latest
  default:
    global.Ajv = require('ajv').default
    global.defaultAjv = global.Ajv
    global.rootPath = path.join(__dirname, 'unit', 'ajv-v8')
}
