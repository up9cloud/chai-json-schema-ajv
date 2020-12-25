const Ajv = require('ajv').default ? require('ajv').default : require('ajv')
describe(__filename, function () {
  let chai
  let expect
  beforeEach(function () {
    require('clear-module')('chai')

    chai = require('chai')
    expect = chai.expect
  })
  describe('ajv options', function () {
    it('should pass options to ajv', function () {
      const options = {
        foo: 'bar'
      }
      chai.use(chaiJsonSchemaAjv.create(options))
      expect(chai.ajv).to.be.instanceof(Ajv)
      if (chai.ajv.opts) { // v7
        expect(chai.ajv.opts.foo).to.be.equal(options.foo)
      } else { // < v7
        expect(chai.ajv._opts.foo).to.be.equal(options.foo)
      }
    })
  })
  describe('create({ ajv })', function () {
    it('should pass ajv instance to plugin', function () {
      const ajv = new Ajv()
      chai.use(chaiJsonSchemaAjv.create({ ajv }))
      expect(chai.ajv).to.be.equal(ajv)
    })
  })
})
