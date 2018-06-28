if (process.env.NODE_ENV === 'development') {
  require('dotenv-safe').config({ silent: true })
}
const server = require('./components/server')
const ngrok = require('./components/ngrok')
const github = require('./components/github')
module.exports = Object.assign({}, server, ngrok, github)
