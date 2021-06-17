require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { success, failure } = require('../../response')
const RiderModel = require('../models/riderModel')
const DriverModel = require('../models/driverModel')


mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err))

const authErrorBody = [
    {
        errorType: 'Authentication Error',
        message: 'Incorrect username or password'
    }
];


getAllusers = async (req, res) => {
    //return data only of authorized users
    const resp = await RiderModel.find({ email: req.userEmail }, { password: 0 })
    res.status(200).json(success('success', resp))
}

registerRider = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPassword;
        // console.log(requestBody)

        var user = new RiderModel(req.body)
        user.save().then(item => res.status(201).json(success('created')))
            .catch(err => res.status(400).json(failure(err)))

    } catch {
        res.status(500).json(failure())
    }
}

loginRider = async (req, res) => {
    const user = await RiderModel.findOne({ email: req.body.email })

    if (user == null) {
        return res.status(400).json(failure(authErrorBody))
    }
    try {
        if (await bcrypt.compare(req.body.password, user['password'])) {
            const token = jwt.sign(user['email'], process.env.JWT_TOKEN_SECRET)

            const responseBody = {
                auth_token: token
            }

            return res.status(200).json(success('success', responseBody))
        } else {
            return res.status(400).json(failure(authErrorBody))
        }
    } catch {
        return res.status(500).json(failure())
    }
}

registerDriver = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        req.body.password = hashedPassword

        var user = new DriverModel(req.body)
        user.save().then(item => res.status(201).json(success('created')))
            .catch(err => res.status(400).json(failure(err)))
    } catch {
        res.status(500).json(failure())
    }
}

loginDriver = async (req, res) => {
    const user = await DriverModel.findOne({ email: req.body.email })

    if (user == null) {
        return res.status(400).json(failure(authErrorBody))
    }

    try {
        if (await bcrypt.compare(req.body.password, user['password'])) {
            const token = jwt.sign(user['email'], process.env.JWT_TOKEN_SECRET)

            const responseBody = {
                auth_token: token
            }

            return res.status(200).json(success('success', responseBody))
        } else {
            return res.status(400).json(failure(authErrorBody))
        }
    } catch {
        return res.status(500).json(failure())
    }
}

module.exports = { getAllusers, registerRider, loginRider, registerDriver, loginDriver }