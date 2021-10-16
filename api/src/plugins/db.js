'use strict'

const fp = require('fastify-plugin')
const mysql = require('mysql2/promise')

const plugin = async function (fastify, opts) {
  const pool = await mysql.createPool({
    host: fastify.config.DB_HOST,
    user: fastify.config.DB_USER,
    password: fastify.config.DB_PASSWORD,
    database: fastify.config.DB_DATABASE
  })

  fastify.decorate('db', pool)

  fastify.addHook('onClose', async (instance, done) => {
    await instance.db.end()
    done()
  })
}

module.exports = fp(plugin, { name: 'db' })
