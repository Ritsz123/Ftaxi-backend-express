require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { success, failure } = require('../../response')


mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
mongoose.connection
    .once('open', () => console.log('Connected MongoDB'))


const users = []

getAllusers = (req, res) => {
    //return data only of authorized users
    const responseBody = users.filter(user => user.name === req.user.name)
    res.status(200).json(success('success', responseBody))
}

registerUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).json(success('created'))
    } catch {
        res.status(500).json(failure())
    }
}

loginUser = async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    const authErrorBody = [
        {
            errorType: 'Authentication Error',
            message: 'Incorrect username or password'
        }
    ];

    if (user == null) {
        return res.status(400).json(failure(authErrorBody))
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign(user, process.env.JWT_TOKEN_SECRET)
            const responseBody = { auth_token: token }
            return res.status(200).json(success('success', responseBody))
        } else {
            return res.status(400).json(failure(authErrorBody))
        }
    } catch {
        return res.status(500).json(failure())
    }
}

module.exports = { getAllusers, registerUser, loginUser }