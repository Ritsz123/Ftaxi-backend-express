const express = require('express')
const app = express()
const authRoutes = require('./auth/routes/authRoutes')
const { success, failure } = require('./response')

app.use(express.json())
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    const responseBody = [
        {
            data: 'Hello world'
        },
        {
            data: 'No world'
        },
    ]

    res.status(200).json(success('ok', responseBody, res.statusCode))
})

app.get('/error', (req, res) => {
    const errorBody = [{ authentication: 'Unauthorised request' }]

    res.status(400).json(failure(errorBody, res.statusCode))
})


app.listen(5001, () => console.log('Started server on http://localhost:5001'))