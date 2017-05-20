'use strict';

const Ajv = require('ajv');

function _createPlugin(chai, util, options) {
    const assert = chai.assert;

    let ajv = new Ajv(options);

    // export ajv to chai
    chai.ajv = ajv;

    /**
     * Test if {value} matches the {schema}
     */
    chai.Assertion.addMethod('jsonSchema', function (schema) {
        const value = this._obj;

        assert.ok(schema, 'missing schema');

        const valid = ajv.validate(schema, value);

        let detail = '';
        if (options && options.verbose) {
            detail = JSON.stringify(ajv.errors, null, '  ');
        } else {
            detail = ajv.errorsText(valid.error);
        }

        this.assert(
            valid,
            `expected value not match the json-schema\n${detail}`
        );
    });

    /**
     * Test if {schema} is valid
     */
    chai.Assertion.addProperty('validJsonSchema', function () {
        const schema = this._obj;
        const valid = ajv.validateSchema(schema);

        this.assert(
            valid,
            "value is not a valid JSON Schema:\n" + util.inspect(ajv.errors, null, null)
        );
    });
}

module.exports = _createPlugin;

module.exports.withOptions = function(options) {
    return function(chai, utils) {
        return _createPlugin(chai, utils, options);
    }
};
