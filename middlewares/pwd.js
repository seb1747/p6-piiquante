const pwdSchema = require('../models/pwd');

module.exports = (req, res, next) => {
    if (! pwdSchema.validate(req.body.password)) {
        res.writeHead(400, 
            "le mot de passe doit comprendre entre 6 et 30 caracteres, une majuscule, un chiffre sans espaces",
            {
                "content-type": "application/json",
            });
            res.end(" mot de passe incorrect ! ");
    }else{
        next();
    }
};