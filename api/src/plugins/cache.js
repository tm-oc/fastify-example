'use strict'

const fp = require('fastify-plugin')
const Redis = require('ioredis')

const plugin = async function (fastify, opts) {
  const client = new Redis(fastify.config.REDIS_PORT, fastify.config.REDIS_HOST)

  fastify.decorate('cache', client)

  fastify.addHook('onClose', async (instance, done) => {
    await instance.cache.quit()
    done()
  })
}

module.exports = fp(plugin, { name: 'cache' })
