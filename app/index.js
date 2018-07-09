const { json, send, text } = require('micro')
const micro = require('micro')
const config = require('../config')
const actions = require('../actions')
const { signRequestBody } = require('../lib/crypto')

const app = async (req, res) => {
  if (req.headers['content-type'] !== 'application/json') {
    return send(res, 500, { body: `Update webhook to send 'application/json' format`})
  }

  try {
    const [payload, body] = await Promise.all([json(req), text(req)])
    const headers = req.headers
    const sig = headers['x-hub-signature']
    const githubEvent = headers['x-github-event']
    const id = headers['x-github-delivery']
    const calculatedSig = signRequestBody(config.github.secret, body)
    const action = payload.action
    let errMessage

    if (!sig) {
      errMessage = 'No X-Hub-Signature found on request'
      return send(res, 401, {
        headers: { 'Content-Type': 'text/plain' },
        body: errMessage })
    }

    if (!githubEvent) {
      errMessage = 'No Github Event found on request'
      return send(res, 422, {
        headers: { 'Content-Type': 'text/plain' },
        body: errMessage })
    }

    if (githubEvent !== 'issues') {
      errMessage = 'No Github Issues event found on request'
      return send(res, 200, {
        headers: { 'Content-Type': 'text/plain' },
        body: errMessage })
    }

    if(!id) {
      errMessage = 'No X-Github-Delivery found on request'
      return send(res, 401, {
        headers: { 'Content-Type': 'text/plain' },
        body: errMessage })
    }

    if (sig !== calculatedSig) {
      errMessage = 'No X-Hub-Signature doesn\'t match Github webhook secret'
      return send(res, 401, {
        headers: { 'Content-Type': 'text/plain' },
        body: errMessage })
    }

    if (!Object.keys(actions).includes(action)) {
      errMessage = `No handlers for action: '${action}'. Skipping ...`
      return send(res, 200, {
        headers: { 'Content-Type': 'text/plain' },
        body: errMessage })
    }

    // Invoke action
    actions[action](payload)

    return send(res, 200, {
      body: `Processed '${action}' for issue: '${payload.issue.number}'`
    })
  } catch(err) {
    console.log(err)
    send(res, 500, { body: `Error occurred: ${err}` })
  }
}
const server = micro(app)
server.listen(3000)
