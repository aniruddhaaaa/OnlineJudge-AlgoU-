const jwt = require('jsonwebtoken')
function authenticateToken(req, res, next){
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try{
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode.user;
        next();
    } catch(err){
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authenticateToken;