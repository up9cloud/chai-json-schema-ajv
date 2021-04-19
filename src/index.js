const Ajv = require('ajv').default ? require('ajv').default : require('ajv')// ? `>= v7` : `<= v6`

function _createPlugin (chai, utils, options) {
  let ajv
  if (options && options.ajv) {
    ajv = options.ajv
  } else {
    ajv = new Ajv(options)
  }
  // export ajv
  chai.ajv = ajv

  let verbose = false
  if (options && Object.prototype.hasOwnProperty.call(options, 'verbose')) {
    verbose = options.verbose
  }

  /**
   * Test if {value} matches the {schema}
   */
  chai.Assertion.addMethod('jsonSchema', function (schema, message) {
    if (message) {
      utils.flag(this, 'message', message)
    }
    const value = utils.flag(this, 'object')
    const valid = ajv.validate(schema, value)

    let placeholder
    let detail
    if (
      verbose ||
      (ajv.opts && ajv.opts.verbose) || // >= v7
      (ajv._opts && ajv._opts.verbose) // <= v6
    ) {
      placeholder = '#{this}'
      detail = utils.inspect(ajv.errors, false, null)
    } else {
      placeholder = 'data' // same as ajv errors' placeholder
      detail = ajv.errorsText(valid.error)
    }

    this.assert(
      valid,
      `expected ${placeholder} to match json-schema\n${detail}`,
      `expected ${placeholder} to not match json-schema`
    )
  })

  /**
   * Test if {schema} is valid
   */
  chai.Assertion.addProperty('validJsonSchema', function () {
    const schema = utils.flag(this, 'object')
    const valid = ajv.validateSchema(schema)

    let placeholder
    let detail
    if (
      verbose ||
      (ajv.opts && ajv.opts.verbose) || // >= v7
      (ajv._opts && ajv._opts.verbose) // <= v6
    ) {
      placeholder = '#{this}'
      detail = utils.inspect(ajv.errors, false, null)
    } else {
      placeholder = 'data'
      detail = ajv.errorsText(valid.error)
    }

    this.assert(
      valid,
      `expected ${placeholder} to be a valid json-schema\n${detail}`,
      `expected ${placeholder} to not be a valid json-schema`
    )
  })

  chai.assert.jsonSchema = function (value, schema, message) {
    new chai.Assertion(value).to.be.jsonSchema(schema, message)
  }
  chai.assert.notJsonSchema = function (value, schema, message) {
    new chai.Assertion(value).to.not.be.jsonSchema(schema, message)
  }
  chai.assert.validJsonSchema = function (schema, message) {
    new chai.Assertion(schema, message).to.be.validJsonSchema
  }
  chai.assert.notValidJsonSchema = function (schema, message) {
    new chai.Assertion(schema, message).to.not.be.validJsonSchema
  }
}
function create (options) {
  return function (chai, utils) {
    return _createPlugin(chai, utils, options)
  }
}

module.exports = _createPlugin
module.exports.create = create
module.exports.withOptions = create // compatible with v4
