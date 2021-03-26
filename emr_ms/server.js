import express from 'express'
import routes from './src/routes/routes.js'
// import cors from 'cors'
const app = express()
// const cors = require('cors')

// app.use(cors())

const PORT = process.env.PORT || 4000
// allows us to parse json 
app.use(express.json())

app.use((req, res, next) => {
    // global before middleware
    console.log(`Requested URI: ${req.originalUrl}`)
    next()
})

app.use((req, res, next) => {
    // global after midleware
    next()
    console.log(`Finished request: ${req.originalUrl}`)
})

app.use('/', routes)

export default app.listen(PORT, () => console.log(`API server ready on http://localhost:${PORT}`))
