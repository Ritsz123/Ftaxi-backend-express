require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
mongoose.connection
    .once('open', () => console.log('Connected MongoDB'))

const users = [
    {
        'name': 'Ritesh',
        'password': 'ritesh@'
    },
    {
        'name': 'Ayush',
        'password': 'Ayush123'
    }
];

getAllusers = (req, res) => {
    //return data only of authorized users
    res.json(users.filter(user => user.name === req.user.name));
}

registerUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { name: req.body.name, password: hashedPassword };
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
}

loginUser = async (req, res) => {
    const user = users.find(user => user.name === req.body.name);
    if (user == null) {
        return res.status(400).send({ message: 'Incorrect username or password' });
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign(user, process.env.JWT_TOKEN_SECRET);
            return res.status(200).send({ auth_token: token });
        } else {
            return res.status(400).send({ message: 'Incorrect username or password' });
        }
    } catch {
        return res.status(500).send();
    }
}

module.exports = { getAllusers, registerUser, loginUser }