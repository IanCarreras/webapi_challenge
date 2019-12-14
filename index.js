const express = require('express')
const helmet = require('helmet')
const logger = require('./middleware/logger')
const notFound = require('./middleware/notFound')
const error = require('./middleware/error')
const app = express()

const projectRouter = require('./routes/projectRouter')
const actionRouter = require('./routes/actionsRouter')

const host = process.env.HOST || '0.0.0.0'
const port  = process.env.PORT || 4000

app.use(helmet())
app.use(logger())
app.use(express.json())

app.use('/api/projects', projectRouter)
app.use('/api/actions', actionRouter)

app.use(notFound())
app.use(error())

app.listen(port, host, () => {
    console.log(`Running at http://${host}:${port}`)
})