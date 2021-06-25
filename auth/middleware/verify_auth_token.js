const jwt = require('jsonwebtoken');
const { invalidToken } = require('../../errors/errors');
const { failure } = require('../../response');

function verifyAuthenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) res.sendStatus(401);

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, userEmail) => {
        if (err) return res.status(403);

        if (req.params['email'] != null && req.params['email'] != userEmail) {
            return res.status(403).json(failure(invalidToken));
        }

        req.userEmail = userEmail;
        next();
    });

    return res.status(403).json(failure(invalidToken))
}

module.exports = verifyAuthenticationToken;