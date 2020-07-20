describe(__filename, function () {
  describe('should pass: apple is fruit', function () {
    it('expect(apple).to.be.jsonSchema(fruitSchema)', function () {
      expect(apple).to.be.jsonSchema(fruitSchema)
    })
    it('assert.jsonSchema(apple, fruitSchema)', function () {
      assert.jsonSchema(apple, fruitSchema)
    })
  })
  describe('should fail: car is fruit', function () {
    const message = fs.readFileSync(`${__filename}-be.err`, 'utf8')
    it('expect(car).to.be.jsonSchema(fruitSchema)', function () {
      try {
        expect(car).to.be.jsonSchema(fruitSchema)
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        expect(e.message).to.be.equal(message)
      }
    })
    it('assert.jsonSchema(car, fruitSchema)', function () {
      try {
        assert.jsonSchema(car, fruitSchema)
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        expect(e.message).to.be.equal(message)
      }
    })
    const flagMessage = 'flag message'
    it('expect(car).to.be.jsonSchema(fruitSchema, flagMessage)', function () {
      try {
        expect(car).to.be.jsonSchema(fruitSchema, flagMessage)
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        expect(e.message).to.be.equal(flagMessage + ': ' + message)
      }
    })
    it('assert.jsonSchema(car, fruitSchema, flagMessage)', function () {
      try {
        assert.jsonSchema(car, fruitSchema, flagMessage)
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        expect(e.message).to.be.equal(flagMessage + ': ' + message)
      }
    })
  })
  describe('should fail: apple is not fruit', function () {
    const message = fs.readFileSync(`${__filename}-notBe.err`, 'utf8')
    it('expect(apple).to.not.be.jsonSchema(fruitSchema)', function () {
      try {
        expect(apple).to.not.be.jsonSchema(fruitSchema)
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        expect(e.message).to.be.equal(message)
      }
    })
    it('assert.notJsonSchema(apple, fruitSchema)', function () {
      try {
        assert.notJsonSchema(apple, fruitSchema)
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        expect(e.message).to.be.equal(message)
      }
    })
    const flagMessage = 'flag message'
    it('expect(apple).to.not.be.jsonSchema(fruitSchema, flagMessage)', function () {
      try {
        expect(apple).to.not.be.jsonSchema(fruitSchema, flagMessage)
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        expect(e.message).to.be.equal(flagMessage + ': ' + message)
      }
    })
    it('assert.notJsonSchema(apple, fruitSchema, flagMessage)', function () {
      try {
        assert.notJsonSchema(apple, fruitSchema, flagMessage)
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        expect(e.message).to.be.equal(flagMessage + ': ' + message)
      }
    })
  })
})
