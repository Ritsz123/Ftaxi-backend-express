require('dotenv').config()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { success, failure } = require('../../response')
const RiderModel = require('../models/riderModel')
const DriverModel = require('../models/driverModel')
const generateAuthenticationToken = require('../middleware/generate_auth_token')
const { authErrorBody, emailExistsError } = require('../../errors/errors')

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err))

getUserDetails = async (req, res) => {
    //return data only of authorized users

    const id = req.params.id
    if (id != null) {
        const rider = await RiderModel.findById(id, { password: 0 });
        if (rider == null) {
            return res.status(400).json(failure(`no user found wth id ${id}`))
        }
        return res.status(200).json(success('ok', rider))
    }

    var resp = await RiderModel.findOne({ email: req.userEmail }, { password: 0 })
    if (resp == null) {
        resp = await DriverModel.findOne({ email: req.userEmail }, { password: 0 })
    }
    res.status(200).json(success('success', resp))
}

registerRider = async (req, res) => {
    var exist = await emailExists(req.body.email)
    if (exist) {
        return res.status(400).json(failure([emailExistsError]))
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPassword;
        // console.log(requestBody)

        var user = new RiderModel(req.body)
        const createdUser = await user.save()
        const token = generateAuthenticationToken(user['email'])
        res.status(201).json(success('user registered', { token: token }))

    } catch (err) {
        res.status(500).json(failure(err))
    }
}

loginRider = async (req, res) => {
    const user = await RiderModel.findOne({ email: req.body.email })

    if (user == null) {
        return res.status(400).json(failure([authErrorBody]))
    }
    try {
        if (await bcrypt.compare(req.body.password, user['password'])) {
            const token = generateAuthenticationToken(user['email'])

            return res.status(200).json(success('success', { token: token }))
        } else {
            return res.status(400).json(failure([authErrorBody]))
        }
    } catch {
        return res.status(500).json(failure())
    }
}

registerDriver = async (req, res) => {
    var exist = await emailExists(req.body.email)
    if (exist) {
        return res.status(400).json(failure([emailExistsError]))
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        req.body.password = hashedPassword

        var user = new DriverModel(req.body)
        const createdUser = await user.save()
        const token = generateAuthenticationToken(user['email'])
        res.status(201).json(success('created', { token: token }))
    } catch {
        res.status(500).json(failure())
    }
}

loginDriver = async (req, res) => {
    const user = await DriverModel.findOne({ email: req.body.email })

    if (user == null) {
        return res.status(400).json(failure([authErrorBody]))
    }

    try {
        if (await bcrypt.compare(req.body.password, user['password'])) {
            const token = generateAuthenticationToken(user['email'])

            return res.status(200).json(success('success', { token: token }))
        } else {
            return res.status(400).json(failure([authErrorBody]))
        }
    } catch {
        return res.status(500).json(failure())
    }
}

async function emailExists(email) {
    //check in rider
    var inRider = await RiderModel.findOne({ email: email })
    var inDriver = await DriverModel.findOne({ email: email })

    if (inRider == null && inDriver == null) return false

    return true
}

getFcmToken = async (req, res) => {

    const driverid = req.query.driverid;

    console.log('get fcm ', driverid)

    if (driverid == null) return res.status(400).json(failure('no driver id provided'))

    try {
        const fcmToken = await DriverModel.findOne({ _id: driverid }, { fcmToken: 1 })
        if (fcmToken == null) return res.status(400).json(failure('invalid driver id'))

        return res.status(200).json(success('ok', fcmToken))

    } catch (e) {
        return res.json(failure(e))
    }
}

module.exports = { getUserDetails, registerRider, loginRider, registerDriver, loginDriver, getFcmToken }