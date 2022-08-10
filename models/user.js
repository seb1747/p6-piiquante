//import package mongoose
const mongoose = require('mongoose');
// import du package pour verifer que l'on ne peux créé qu'un seul compte avec le meme mail 
const uniqueValidator = require('mongoose-unique-validator');
// création du schema utilisateur 
const userSchema = mongoose.Schema({
    email: {type: 'string', required: true, unique: true},
    password: {type: 'string', required: true},
});
// rappel du plugin uniqueValidator
userSchema.plugin(uniqueValidator);
//export du model utilisateur 
module.exports = mongoose.model('User', userSchema);