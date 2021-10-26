'use strict'

const fastify = require('../../helper')()
const FormData = require('form-data')
const fs = require('fs')
const path = require('path')

test('file-upload', async () => {
  const filePath = path.join(__dirname, 'test.png')
  const form = new FormData()
  form.append('file', fs.createReadStream(filePath))

  const response = await fastify.inject({
    url: '/file/upload',
    method: 'POST',
    payload: form,
    headers: form.getHeaders()
  })

  expect(response.statusCode).toBe(200)
  expect(response.json().success).toBe(true)
})
