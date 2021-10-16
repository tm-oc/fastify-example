'use strict'

const S = require('fluent-json-schema')

module.exports = async function (fastify, opts) {
  const { db, cache } = fastify

  const main = async function (req, reply) {
    const crows = await cache.get('cache_test')
    if (crows) {
      return JSON.parse(crows)
    }
    const sql = 'select id, title, body from notes'
    const [rows] = await db.query(sql, [])
    await cache.set('cache_test', JSON.stringify(rows), 'EX', 10)
    return rows
  }

  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Note'],
      description: '',
      response: {
        200: S.array().items(
          S.object()
            .prop('id', S.number())
            .prop('title', S.string())
            .prop('body', S.string())
        )
      }
    },
    handler: main
  })
}
