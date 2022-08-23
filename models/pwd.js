const pwdValidator = require('password-validator');

//creation du modele de password 

const pwdSchema = new pwdValidator();

//propriétés du password
pwdSchema
.is()
.min(6)//minimum 6 caractères
.is()
.max(30)//maximum 30 caractères
.has()
.uppercase()//au moins une majuscules
.has()
.digits(1)//au moins 1 chiffre
.has()
.not()// pour dire qu'on ne peux pas mettre
.spaces()// pas d'espaces
.is()
.not()
.oneOf(['Passw0rd', 'Password1234']); // mot de passe blacklister

module.exports = pwdSchema;

