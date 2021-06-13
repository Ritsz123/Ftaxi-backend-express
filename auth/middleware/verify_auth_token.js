const jwt = require('jsonwebtoken')

function verifyAuthenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) res.sendStatus(401);

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, userEmail) => {
        if (err) return res.status(403);
        req.userEmail = userEmail;
        next();
    });
}

module.exports = verifyAuthenticationToken;