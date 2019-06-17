describe(__filename, function () {
  it('expect(fruitSchema).to.be.validJsonSchema should pass.', function () {
    expect(fruitSchema).to.be.validJsonSchema
  })
  it('expect(invalidSchema).to.be.validJsonSchema should fail', function () {
    try {
      expect(invalidSchema).to.be.validJsonSchema
    } catch (e) {
      expect(e).to.be.instanceof(chai.AssertionError)
      expect(e.message).to.be.equal(fs.readFileSync(`${__filename}-be.err`, 'utf8'))
    }
  })
  it('expect(fruitSchema).to.not.be.validJsonSchema should fail', function () {
    try {
      expect(fruitSchema).to.not.be.validJsonSchema
    } catch (e) {
      expect(e).to.be.instanceof(chai.AssertionError)
      expect(e.message).to.be.equal(fs.readFileSync(`${__filename}-notBe.err`, 'utf8'))
    }
  })
})
