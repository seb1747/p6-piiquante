//import du package de token chiffrer
const jwt = require('jsonwebtoken');
const VERIFY = process.env.TOKEN
console.log(VERIFY);



module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, VERIFY);
        const userId = decodedToken.userId;
        require.auth = {
            userId : userId,
        };
        next();
    }catch (error) {
        res.status(401).json({ message: "erreur d'authentification !" });
    }
};