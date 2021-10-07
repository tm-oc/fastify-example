'use strict'

const fp = require('fastify-plugin')
const Swagger = require('fastify-swagger')

async function plugin(fastify, opts) {
  fastify.register(Swagger, {
    routePrefix: '/swagger',
    swagger: {
      info: {
        title: 'API example',
        description: 'API example',
        version: '1.0.0',
      },
      externalDocs: {
        url: 'https://swagger.io/',
        description: 'Find more info here',
      },
      host: 'localhost:3010',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: fastify.config.NODE_ENV !== 'production',
  })
}

module.exports = fp(plugin, { name: 'swagger' })
