'use strict'

const fastify = require('../helper')()

test('status', async () => {
  const response = await fastify.inject({
    url: '/',
    method: 'GET'
  })
  expect(response.statusCode).toBe(200)
  expect(response.payload).toBe('{"status":"ok"}')
})
