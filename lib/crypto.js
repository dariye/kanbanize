const crypto = require('crypto')

function signRequestBody (key, body) {
  return `sha1=${crypto.createHmac('sha1', key).update(body, 'utf-8').digest('hex')}`
}

module.exports = { signRequestBody }
