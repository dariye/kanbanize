const joi = require('joi')

const schema = joi.object({
  PORT: joi.number().required(),
})
  .unknown()
  .required()

const { error, value: vars } = joi.validate(process.env, schema)

if (error) throw new Error(`Config validation error: ${error.message}`)

const config = {
  server: {
    port: vars.PORT
  }
}

module.exports = config
