'use strict'

const S = require('fluent-json-schema')

module.exports = async function healthcheck(fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Status'],
      description: 'Status',
      response: {
        200: S.object().prop('status', S.string()),
      },
    },
    handler: main,
  })

  async function main(req, reply) {
    return {
      status: 'ok',
    }
  }
}
