describe(__filename, function () {
  describe('should pass: fruit schema is valid', function () {
    it('expect(fruitSchema).to.be.validJsonSchema', function () {
      expect(fruitSchema).to.be.validJsonSchema
    })
    it('assert.validJsonSchema(fruitSchema)', function () {
      assert.validJsonSchema(fruitSchema)
    })
  })
  describe('should fail: invalid schema is valid', function () {
    const message = fs.readFileSync(`${rootPath}/${require('path').basename(__filename)}-be.err`, 'utf8')
    it('expect(invalidSchema).to.be.validJsonSchema', function () {
      try {
        expect(invalidSchema).to.be.validJsonSchema
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        expect(e.message).to.be.equal(message)
      }
    })
    it('assert.validJsonSchema(invalidSchema)', function () {
      try {
        assert.validJsonSchema(invalidSchema)
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        expect(e.message).to.be.equal(message)
      }
    })
    const flagMessage = 'flag message'
    it('expect(invalidSchema, flagMessage).to.be.validJsonSchema', function () {
      try {
        expect(invalidSchema, flagMessage).to.be.validJsonSchema
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        expect(e.message).to.be.equal(flagMessage + ': ' + message)
      }
    })
    it('assert.validJsonSchema(invalidSchema)', function () {
      try {
        assert.validJsonSchema(invalidSchema, flagMessage)
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        expect(e.message).to.be.equal(flagMessage + ': ' + message)
      }
    })
  })
  describe('should fail: fruit schema is not valid', function () {
    const message = fs.readFileSync(`${rootPath}/${require('path').basename(__filename)}-notBe.err`, 'utf8')
    it('expect(fruitSchema).to.not.be.validJsonSchema', function () {
      try {
        expect(fruitSchema).to.not.be.validJsonSchema
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        expect(e.message).to.be.equal(message)
      }
    })
    it('assert.notValidJsonSchema(fruitSchema)', function () {
      try {
        assert.notValidJsonSchema(fruitSchema)
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        expect(e.message).to.be.equal(message)
      }
    })
    const flagMessage = 'flag message'
    it('expect(fruitSchema, flagMessage).to.not.be.validJsonSchema', function () {
      try {
        expect(fruitSchema, flagMessage).to.not.be.validJsonSchema
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        expect(e.message).to.be.equal(flagMessage + ': ' + message)
      }
    })
    it('assert.notValidJsonSchema(fruitSchema, flagMessage)', function () {
      try {
        assert.notValidJsonSchema(fruitSchema, flagMessage)
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        expect(e.message).to.be.equal(flagMessage + ': ' + message)
      }
    })
  })
})
