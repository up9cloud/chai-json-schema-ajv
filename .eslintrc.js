module.exports = {
  root: true,
  env: {
    node: true,
    mocha: true
  },
  extends: "standard",
  rules: {
    'no-unused-expressions': 0 // for chai testing
  }
}
