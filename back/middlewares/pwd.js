//import du schema de password
const pwdSchema = require('../models/pwd');
// mise en place de le logique de vérificationn de password
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