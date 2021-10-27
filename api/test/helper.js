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
  process.env.REDIS_HOST = 'redis'
  process.env.REDIS_PORT = 6379
  process.env.AWS_S3_ACCESS_KEY_ID = 'minio'
  process.env.AWS_S3_SECRET_ACCESS_KEY = 'minio123'
  process.env.AWS_S3_REGION = 'ap-northeast-1'
  process.env.AWS_S3_ENDPOINT = 'http://minio:9000'
  process.env.MAILER_HOST = 'mailhog'
  process.env.MAILER_PORT = '1025'

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
