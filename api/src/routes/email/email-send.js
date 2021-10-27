'use strict'

const S = require('fluent-json-schema')

module.exports = async function (fastify, opts) {
  const { mailer } = fastify

  const main = async function (req, reply) {
    const mailOpts = {
      from: 'test-from@example.com',
      to: 'test-to@example.com',
      subject: 'test subject',
      text: 'test plain text',
      html: '<strong>test html</strong>'
    }
    try {
      await mailer.sendMail(mailOpts)
    } catch (err) {
      throw new Error(err)
    }
    return { success: true }
  }

  fastify.route({
    method: 'GET',
    url: '/send',
    schema: {
      tags: ['Email'],
      description: '',
      response: {
        200: S.object().prop('success', S.boolean())
      }
    },
    handler: main
  })
}
