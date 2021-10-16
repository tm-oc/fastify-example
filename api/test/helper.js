'use strict'

const Fastify = require('fastify')
const fp = require('fastify-plugin')
const App = require('../src/app')

module.exports = function () {
  process.env.NODE_ENV = 'development'
  process.env.DB_HOST = 'db'
  process.env.DB_PORT = 3306
  process.env.DB_DATABASE = 'test_db'
  process.env.DB_USER = 'test_user'
  process.env.DB_PASSWORD = 'test_pass'

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
