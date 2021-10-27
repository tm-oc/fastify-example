'use strict'

const fp = require('fastify-plugin')
const Nodemailer = require('nodemailer')

const plugin = async function (fastify, opts) {
  const transporter = Nodemailer.createTransport({
    host: fastify.config.MAILER_HOST,
    port: fastify.config.MAILER_PORT
  })

  fastify.decorate('mailer', transporter)
}

module.exports = fp(plugin, { name: 'mailer' })
