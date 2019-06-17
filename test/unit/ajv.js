describe(__filename, function () {
  it('chai.ajv should be instance of Ajv', function () {
    expect(chai.ajv).to.be.instanceof(require('ajv'))
  })
})
