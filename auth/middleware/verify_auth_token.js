const jwt = require('jsonwebtoken')

function verifyAuthenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) res.sendStatus(401);

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403);
        req.user = user;
        next();
    });
}

module.exports = verifyAuthenticationToken;