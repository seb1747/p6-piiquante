//import du package de token chiffrer
const jwt = require('jsonwebtoken');
const TOKEN = process.env.TOKEN



// mise en place de la logique pour la securité d'authentification
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, TOKEN);
        const userId = decodedToken.userId;
        require.auth = {
            userId : userId,
        };
        next();
    }catch (error) {
        res.status(401).json({ message: "erreur d'authentification !" });
    }
};