'use strict'
const joi = require('joi')
const schema = joi.object({
  NGROK_SUBDOMAIN: joi.string()
}).unknown()
  .required()

const { error, value: vars } = joi.validate(process.env, schema)

if (error) throw new Error(`Config validation error: ${error.message}`)

const config = {
  subdomain: {
    name: vars.NGROK_SUBDOMAIN
  }
}

module.exports = config
