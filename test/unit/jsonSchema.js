describe(__filename, function () {
  it('expect(apple).to.be.jsonSchema(fruitSchema) shoule pass', function () {
    expect(apple).to.be.jsonSchema(fruitSchema)
  })
  it('expect(car).to.be.jsonSchema(fruitSchema) should fail', function () {
    try {
      expect(car).to.be.jsonSchema(fruitSchema)
    } catch (e) {
      expect(e).to.be.instanceof(chai.AssertionError)
      expect(e.message).to.be.equal(fs.readFileSync(`${__filename}-be.err`, 'utf8'))
    }
  })
  it('expect(apple).to.not.be.jsonSchema(fruitSchema) should fail', function () {
    try {
      expect(apple).to.not.be.jsonSchema(fruitSchema)
    } catch (e) {
      expect(e).to.be.instanceof(chai.AssertionError)
      expect(e.message).to.be.equal(fs.readFileSync(`${__filename}-notBe.err`, 'utf8'))
    }
  })
})
