const userTypes = require('./types/user')
const livepollTypes = require('./types/livepoll')
const itemTypes = require('./types/item')

module.exports = {
  ...userTypes,
  ...livepollTypes,
  ...itemTypes
}