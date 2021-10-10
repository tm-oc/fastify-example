'use strict'

const Fastify = require('fastify')
const fp = require('fastify-plugin')
const App = require('../src/app')

module.exports = function () {
  const server = Fastify({
    looger: {
      level: process.env.LOG_LEVEL || 'silent'
    },
    pluginTimeout: 2 * 60 * 1000
  })

  server.register(fp(App))

  beforeAll(async () => {
    await server.ready()
  })

  beforeEach(async () => {})

  afterEach(async () => {})

  afterAll(async () => {
    await server.close()
  })

  return server
}
