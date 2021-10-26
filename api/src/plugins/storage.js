'use strict'

const fp = require('fastify-plugin')
const { S3Client } = require('@aws-sdk/client-s3')

const plugin = async function (fastify, opts) {
  const s3 = new S3Client({
    region: fastify.config.AWS_S3_REGION,
    endpoint: fastify.config.AWS_S3_ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: fastify.config.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: fastify.config.AWS_S3_SECRET_ACCESS_KEY
    }
  })

  fastify.decorate('storage', s3)
}

module.exports = fp(plugin, { name: 'storage' })
