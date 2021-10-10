'use strict'

const S = require('fluent-json-schema')

module.exports = async function (fastify, opts) {
  const main = async function (req, reply) {
    return {
      status: 'ok'
    }
  }

  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Status'],
      description: 'Status',
      response: {
        200: S.object().prop('status', S.string())
      }
    },
    handler: main
  })
}
