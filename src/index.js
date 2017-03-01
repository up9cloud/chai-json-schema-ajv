'use strict';

const Ajv = require('ajv');

module.exports = (chai, util) => {
    const assert = chai.assert;

    let options = null;
    let ajv = new Ajv(options);

    // export ajv to chai
    chai.ajv = ajv;

    // add the method to chai
    chai.Assertion.addMethod('jsonSchema', function (schema, msg) {
        let data = this._obj;

        assert.ok(schema, 'schema');

        let validate = ajv.compile(schema);
        let valid = validate(data);
        let detail = '';
        if (!valid) {
            let errors = validate.errors;
            detail =  `${JSON.stringify(errors, true, 2)}`;
        }

        // pass formatted string to mocha.
        this.assert(
            valid,
            `expected value not match the json-schema\n${detail}`
        );
    });
};
