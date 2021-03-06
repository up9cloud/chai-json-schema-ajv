const clearModule = require('clear-module')
describe(__filename, function () {
  describe('create({ verbose: true })', function () {
    let chai
    let expect
    before(function () {
      clearModule('chai')
      chai = require('chai')
      chai.use(chaiJsonSchemaAjv.create({
        verbose: true
      }))
      expect = chai.expect
    })
    it('expect(car).to.be.jsonSchema(fruitSchema) should print full error message', function () {
      try {
        expect(car).to.be.jsonSchema(fruitSchema)
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        const filePath = path.join(rootPath, `${path.basename(__filename)}-be.jsonSchema.err`)
        expect(e.message).to.be.equal(fs.readFileSync(filePath, 'utf8'))
      }
    })
    it('expect(apple).to.not.be.jsonSchema(fruitSchema) should print full error message', function () {
      try {
        expect(apple).to.not.be.jsonSchema(fruitSchema)
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        const filePath = path.join(rootPath, `${path.basename(__filename)}-not.be.jsonSchema.err`)
        expect(e.message).to.be.equal(fs.readFileSync(filePath, 'utf8'))
      }
    })
    it('expect(invalidSchema).to.be.validJsonSchema should print full error message', function () {
      try {
        expect(invalidSchema).to.be.validJsonSchema
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        const filePath = path.join(rootPath, `${path.basename(__filename)}-be.validJsonSchema.err`)
        expect(e.message).to.be.equal(fs.readFileSync(filePath, 'utf8'))
      }
    })
    it('expect(fruitSchema).to.not.be.validJsonSchema should print full error message', function () {
      try {
        expect(fruitSchema).to.not.be.validJsonSchema
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        const filePath = path.join(rootPath, `${path.basename(__filename)}-not.be.validJsonSchema.err`)
        expect(e.message).to.be.equal(fs.readFileSync(filePath, 'utf8'))
      }
    })
  })
  describe('create({ ajv: new Ajv(), verbose: true })', function () {
    let chai
    let expect
    before(function () {
      clearModule('chai')
      chai = require('chai')
      chai.use(chaiJsonSchemaAjv.create({
        ajv: new Ajv(),
        verbose: true
      }))
      expect = chai.expect
    })
    it('should print full error message, but ajv not in verbose mode', function () {
      try {
        expect(car).to.be.jsonSchema(fruitSchema)
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        const filePath = path.join(rootPath, `${path.basename(__filename)}-be.jsonSchema.err2`)
        expect(e.message).to.be.equal(fs.readFileSync(filePath, 'utf8'))
      }
    })
  })
  describe('create({ ajv: new Ajv({ verbose: true }) })', function () {
    let chai
    let expect
    before(function () {
      clearModule('chai')
      chai = require('chai')
      chai.use(chaiJsonSchemaAjv.create({
        ajv: new Ajv({
          verbose: true
        })
      }))
      expect = chai.expect
    })
    it('should print full error message', function () {
      try {
        expect(car).to.be.jsonSchema(fruitSchema)
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError)
        const filePath = path.join(rootPath, `${path.basename(__filename)}-be.jsonSchema.err`)
        expect(e.message).to.be.equal(fs.readFileSync(filePath, 'utf8'))
      }
    })
  })
})
