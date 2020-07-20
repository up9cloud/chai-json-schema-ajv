module.exports = {
  title: 'fruit schema v0.1',
  type: 'object',
  required: ['name', 'color', 'value'],
  properties: {
    name: {
      type: 'string',
      minLength: 3
    },
    color: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string'
      }
    },
    value: {
      type: 'integer',
      minimum: 5
    }
  }
}
