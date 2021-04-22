import express from 'express'
import routes from './src/routes/routes.js'

const app = express()

const PORT = 4000;
// allows us to parse json 
app.use(express.json())

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use((req, res, next) => {
    // global before middleware
    console.log(`Requested URI: ${req.originalUrl}`)
    next()
})

app.use('/', routes)

app.use((req, res, next) => {
    // global after midleware
    next()
    console.log(`Finished request: ${req.originalUrl}`)
})





export default app.listen(PORT, () => console.log(`API server ready on http://localhost:${PORT}`))
