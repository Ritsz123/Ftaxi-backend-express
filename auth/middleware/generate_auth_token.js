const jwt = require('jsonwebtoken');
require('dotenv').config()

function generateAuthenticationToken(email) {
    const token = jwt.sign(email, process.env.JWT_TOKEN_SECRET)
    return token;
}

module.exports = generateAuthenticationToken