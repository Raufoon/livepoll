const express = require('express')
const router = express.Router()
const db = require('../realtimeDb')

router.get('/', async function (request, response) {
  response.end(JSON.stringify(await db.read(`/dummy/points`)))
})

router.get('/', async function (request, response) {
  await db.write(`/dummy/posts`, request.params.points)
  response.end(JSON.stringify())
})

module.exports = router