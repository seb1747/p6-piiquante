//import du package mongoose pour acces a la base données 

const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId : {type: 'string', required: true},
    name : {type: 'string', required: true},
    manufacturer : {type: 'string', required: true},
    description : {type: 'string', required: true},
    mainPepper : {type: 'string', required: true},
    imageUrl : {type: 'string', required: true},
    heat : {type : 'Number', required: true},
    likes: {type: 'Number', required: true},
    dislikes : {type: 'Number', required: true},
    usersLiked : {type : 'Array'},
    usersDisliked : {type: 'Array'}
})

module.exports = mongoose.model("Sauce", sauceSchema)