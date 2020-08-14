const fs = require('fs')

const serviceWorkerTemplate = fs.readFileSync('./src/service-worker/template.js')
const generatedServiceWorker = fs.readFileSync('./build/service-worker.js')

fs.writeFileSync('./build/service-worker.js', generatedServiceWorker + serviceWorkerTemplate)
