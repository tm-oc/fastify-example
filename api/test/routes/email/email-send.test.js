'use strict'

const fastify = require('../../helper')()

test('email-send', async () => {
  const response = await fastify.inject({
    url: '/email/send',
    method: 'GET'
  })

  expect(response.statusCode).toBe(200)
  expect(response.json().success).toBe(true)
})
