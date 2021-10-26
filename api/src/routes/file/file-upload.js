'use strict'

const S = require('fluent-json-schema')
const Multipart = require('fastify-multipart')
const { PutObjectCommand } = require('@aws-sdk/client-s3')

module.exports = async function (fastify, opts) {
  fastify.register(Multipart, {
    attachFieldsToBody: true,
    sharedSchemaId: '#uploadFile'
  })

  const { storage } = fastify

  const main = async function (req, reply) {
    try {
      await storage.send(
        new PutObjectCommand({
          Bucket: 'test-bucket',
          Key: req.body.file.filename,
          Body: req.body.file._buf,
          ContentType: req.body.file.mimetype
        })
      )
    } catch (err) {
      throw new Error(err)
    }
    return { success: true }
  }

  fastify.route({
    method: 'POST',
    url: '/upload',
    schema: {
      tags: ['File'],
      description: '',
      body: S.object().prop('file', S.ref('#uploadFile')).required(),
      response: {
        200: S.object().prop('success', S.boolean())
      }
    },
    handler: main
  })
}
