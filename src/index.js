'use strict'

const Ajv = require('ajv');

function _createPlugin (chai, util, options) {
  const ajv = new Ajv(options);

  // export ajv to chai
  chai.ajv = ajv;

  /**
   * Test if {value} matches the {schema}
   */
  chai.Assertion.addMethod('jsonSchema', function (schema) {
    const value = this._obj;

		chai.assert.ok(ajv.validateSchema(schema), 'Given value is not a valid JSON Schema.');

    const valid = ajv.validate(schema, value);
    const detail = (options && options.verbose) ? JSON.stringify(ajv.errors, null, '  ') : ajv.errorsText(valid.error);

		this.assert(valid, `Given value does not match the given JSON Schema: \n${detail}`);
  })

  /**
   * Test if {schema} is valid
   */
  chai.Assertion.addProperty('validJsonSchema', function () {
		const schema = this._obj;
		const valid = ajv.validateSchema(schema);
		this.assert(valid, 'Given value is not a valid JSON Schema: \n' + util.inspect(ajv.errors, null, null));
  })
}

module.exports = _createPlugin;

module.exports.withOptions = function (options) {
  return function (chai, utils) {
    return _createPlugin(chai, utils, options);
  }
}
