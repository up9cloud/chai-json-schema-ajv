global.fs = require('fs')
global.path = require('path')
const chai = require('chai')
const chaiJsonSchemaAjv = require('../index.js')
chai.use(chaiJsonSchemaAjv)
global.chai = chai
global.chaiJsonSchemaAjv = chaiJsonSchemaAjv
global.expect = chai.expect
global.assert = chai.assert
global.invalidSchema = require('./invalidSchema.js')
global.fruitSchema = require('./fruitSchema.js')
global.apple = require('./apple.js')
global.car = require('./car.js')
