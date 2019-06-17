const Ajv = require('ajv')

function _createPlugin (chai, utils, options) {
  let ajv
  if (options && options.ajv instanceof Ajv) {
    ajv = options.ajv
  } else {
    ajv = new Ajv(options)
  }
  // export ajv
  chai.ajv = ajv

  let verbose = false
  if (options && options.hasOwnProperty('verbose')) {
    verbose = options.verbose
  }

  /**
   * Test if {value} matches the {schema}
   */
  chai.Assertion.addMethod('jsonSchema', function (schema) {
    const value = utils.flag(this, 'object')
    const valid = ajv.validate(schema, value)

    let placeholder
    let detail
    if (verbose || ajv._opts.verbose) {
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
    if (verbose || ajv._opts.verbose) {
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
}
function create (options) {
  return function (chai, utils) {
    return _createPlugin(chai, utils, options)
  }
}

module.exports = _createPlugin
module.exports.create = create
module.exports.withOptions = create // compatible with v4
