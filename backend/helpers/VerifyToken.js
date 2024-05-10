const jwt = require('jsonwebtoken');

const VerifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader&&authHeader.split(" ")[1]


    
    if (token == null) return res.status(401).json({
        message: 'Token Não Enviado!'
    });

    jwt.verify(token, "nossosecret", (err, decoded) => {
        if (err) return res.status(403).json({
            message: 'Token Inválido!'
        });
        req.id = decoded.id;
    });
    next();
}

module.exports = VerifyToken