describe(__filename, function () {
  it('chai.ajv should be instance of Ajv', function () {
    const Ajv = require('ajv').default ? require('ajv').default : require('ajv')
    expect(chai.ajv).to.be.instanceof(Ajv)
  })
})
