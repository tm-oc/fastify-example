'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const Sensible = require('fastify-sensible')
const Env = require('fastify-env')
const S = require('fluent-json-schema')

const app = async function (fastify, opts) {
  fastify.register(Env, {
    schema: S.object()
      .prop('NODE_ENV', S.string().required())
      .prop('DB_HOST', S.string().required())
      .prop('DB_PORT', S.number().required())
      .prop('DB_DATABASE', S.string().required())
      .prop('DB_USER', S.string().required())
      .prop('DB_PASSWORD', S.string().required())
      .prop('REDIS_HOST', S.string().required())
      .prop('REDIS_PORT', S.number().required())
      .prop('AWS_S3_ACCESS_KEY_ID', S.string().required())
      .prop('AWS_S3_SECRET_ACCESS_KEY', S.string().required())
      .prop('AWS_S3_REGION', S.string().required())
      .prop('AWS_S3_ENDPOINT', S.string().required())
      .valueOf()
  })

  fastify.register(Sensible)

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}

module.exports = app
