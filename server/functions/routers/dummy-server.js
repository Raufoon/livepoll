const express = require('express')
const router = express.Router()
const db = require('../realtimeDb')

router.get('/', async function (request, response) {
  const points = await db.readAsList(`dummy/points`)
  console.log(points)
  response.end(JSON.stringify(points))
})

router.post('/', async function (request, response) {
  console.log(request.body)
  await db.write(`dummy/points`, request.body.points)
  response.end()
})

module.exports = router