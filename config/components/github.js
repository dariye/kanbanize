'use strict'
const joi = require('joi')
const schema = joi.object({
  TOKEN: joi.string().required(),
  WEBHOOK_SECRET: joi.string().required(),
  OWNER: joi.string().required(),
  REPOSITORY: joi.string().required(),
})
  .unknown()
  .required()

const { error, value: vars } = joi.validate(process.env, schema)

if (error) throw new Error(`Config validation error: ${error.message}`)

const config = {
  github: {
    token: vars.TOKEN,
    secret: vars.WEBHOOK_SECRET,
    owner: vars.OWNER,
    repo: vars.REPOSITORY
  }
}

module.exports = config
