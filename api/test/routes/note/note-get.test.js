'use strict'

const fastify = require('../../helper')()

test('note-get db', async () => {
  const response = await fastify.inject({
    url: '/note',
    method: 'GET'
  })

  expect(response.statusCode).toBe(200)
  expect(response.json()[0].id).toBe(1)
  expect(response.json()[0].title).toBe('sample title 1')
  expect(response.json()[0].body).toBe('sample body 1')
})

test('note-get cache', async () => {
  const response = await fastify.inject({
    url: '/note',
    method: 'GET'
  })

  expect(response.statusCode).toBe(200)
  expect(response.json()[0].id).toBe(1)
  expect(response.json()[0].title).toBe('sample title 1')
  expect(response.json()[0].body).toBe('sample body 1')
})
